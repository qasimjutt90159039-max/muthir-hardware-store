const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const User = require('../models/User');
const InventoryHistory = require('../models/InventoryHistory');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public / Authenticated
const createOrder = async (req, res) => {
  try {
    const { customerDetails, items, couponCode, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    if (!customerDetails || !customerDetails.fullName || !customerDetails.phone || !customerDetails.address) {
      return res.status(400).json({ message: 'Customer details (Full Name, Phone, Address) are required' });
    }

    // Verify stock and compute subtotal
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || !product.isActive) {
        return res.status(400).json({ message: `Product ${item.name || item.product} is not available` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Only ${product.stock} units remaining.`,
        });
      }

      const itemPrice = product.salePrice ? product.salePrice : product.price;
      const itemTotal = itemPrice * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        productId: product.productId,
        name: product.name,
        sku: product.sku,
        brand: product.brand,
        image: product.images[0] || '',
        price: itemPrice,
        quantity: item.quantity,
        total: itemTotal,
      });
    }

    // Coupon discount calculation
    let discount = 0;
    let appliedCoupon = null;
    if (couponCode) {
      appliedCoupon = await Coupon.findOne({
        couponCode: couponCode.toUpperCase(),
        isActive: true,
      });

      if (appliedCoupon) {
        const validity = appliedCoupon.isValid(subtotal);
        if (validity.valid) {
          discount = appliedCoupon.calculateDiscount(subtotal);
          appliedCoupon.usedCount += 1;
          await appliedCoupon.save();
        }
      }
    }

    // Delivery calculation: Free delivery over PKR 5,000, else PKR 250 base fee
    const deliveryFee = subtotal >= 5000 ? 0 : 250;
    const total = Math.max(0, subtotal - discount + deliveryFee);

    const orderNumber = `MHS-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const order = new Order({
      orderNumber,
      user: req.user ? req.user._id : null,
      customerDetails: {
        fullName: customerDetails.fullName,
        phone: customerDetails.phone,
        email: customerDetails.email || '',
        address: customerDetails.address,
        city: customerDetails.city || 'Multan',
        area: customerDetails.area || '',
        postalCode: customerDetails.postalCode || '',
        orderNotes: customerDetails.orderNotes || '',
      },
      items: orderItems,
      subtotal,
      discount,
      couponCode: discount > 0 ? couponCode.toUpperCase() : '',
      deliveryFee,
      total,
      currency: 'PKR',
      paymentMethod: paymentMethod || 'Cash on Delivery',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      statusHistory: [
        {
          status: 'Pending',
          note: 'Order placed by customer',
          updatedBy: req.user ? req.user.name : customerDetails.fullName,
        },
      ],
    });

    const createdOrder = await order.save();

    // Deduct stock & log inventory
    for (const item of orderItems) {
      const prod = await Product.findById(item.product);
      if (prod) {
        const prev = prod.stock;
        prod.stock = Math.max(0, prod.stock - item.quantity);
        await prod.save();

        await InventoryHistory.create({
          product: prod._id,
          sku: prod.sku,
          productName: prod.name,
          changeType: 'order_deduction',
          quantityChanged: -item.quantity,
          previousStock: prev,
          newStock: prod.stock,
          reason: `Deducted for Order #${orderNumber}`,
          updatedBy: 'Store System',
        });
      }
    }

    // Update user stats if logged in
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        $inc: { orderCount: 1, totalSpent: total },
      });
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID or orderNumber
// @route   GET /api/orders/:id
// @access  Public / Authenticated
const getOrderById = async (req, res) => {
  try {
    const identifier = req.params.id;
    let order;

    if (identifier.startsWith('MHS-')) {
      order = await Order.findOne({ orderNumber: identifier });
    } else {
      order = await Order.findById(identifier);
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Access check: allow admin, or order owner, or guest who just placed it
    if (req.user && req.user.role !== 'admin' && order.user && order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN CONTROLLERS

// @desc    Get all orders with filtering & search
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 20;
    const page = Number(req.query.page) || 1;
    const query = {};

    if (req.query.status && req.query.status !== 'all') {
      query.orderStatus = req.query.status;
    }

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { orderNumber: searchRegex },
        { 'customerDetails.fullName': searchRegex },
        { 'customerDetails.phone': searchRegex },
        { 'customerDetails.city': searchRegex },
      ];
    }

    const count = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      orders,
      page,
      pages: Math.ceil(count / pageSize),
      totalOrders: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status, note, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const previousStatus = order.orderStatus;
    if (status) {
      order.orderStatus = status;
      order.statusHistory.push({
        status,
        note: note || `Status changed from ${previousStatus} to ${status}`,
        timestamp: new Date(),
        updatedBy: req.user ? req.user.name : 'Admin',
      });

      // If status changed to Delivered, mark payment as Paid for COD
      if (status === 'Delivered') {
        order.paymentStatus = 'Paid';
      }

      // If status changed to Cancelled, return stock to products
      if (status === 'Cancelled' && previousStatus !== 'Cancelled') {
        for (const item of order.items) {
          const prod = await Product.findById(item.product);
          if (prod) {
            const prev = prod.stock;
            prod.stock += item.quantity;
            await prod.save();

            await InventoryHistory.create({
              product: prod._id,
              sku: prod.sku,
              productName: prod.name,
              changeType: 'order_cancelled_return',
              quantityChanged: item.quantity,
              previousStock: prev,
              newStock: prod.stock,
              reason: `Returned to stock upon cancellation of Order #${order.orderNumber}`,
              updatedBy: req.user ? req.user.name : 'Admin',
            });
          }
        }
      }
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
