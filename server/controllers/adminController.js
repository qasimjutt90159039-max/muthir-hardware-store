const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Review = require('../models/Review');
const ContactMessage = require('../models/ContactMessage');

// @desc    Get dashboard metrics & statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      pendingOrders,
      lowStockProducts,
      unreadMessages,
      pendingReviews,
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Order.countDocuments({ orderStatus: 'Pending' }),
      Product.countDocuments({
        isActive: true,
        stockStatus: { $in: ['Low Stock', 'Out of Stock'] },
      }),
      ContactMessage.countDocuments({ status: 'unread' }),
      Review.countDocuments({ status: 'pending' }),
    ]);

    // Aggregate total revenue from non-cancelled orders
    const revenueAgg = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'Cancelled' } } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } },
    ]);
    const totalRevenue = revenueAgg.length ? revenueAgg[0].totalRevenue : 0;

    // Recent 5 orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Low stock items
    const lowStockList = await Product.find({
      isActive: true,
      stockStatus: { $in: ['Low Stock', 'Out of Stock'] },
    })
      .select('name sku brand stock stockStatus lowStockThreshold')
      .limit(5)
      .lean();

    // Category breakdown
    const categoryBreakdown = await Product.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$orderStatus', count: { $sum: 1 } } },
    ]);

    res.json({
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCustomers,
      pendingOrders,
      lowStockCount: lowStockProducts,
      unreadMessages,
      pendingReviews,
      recentOrders,
      lowStockList,
      categoryBreakdown,
      ordersByStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all customers
// @route   GET /api/admin/customers
// @access  Private/Admin
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle customer account active status
// @route   PATCH /api/admin/customers/:id/status
// @access  Private/Admin
const toggleCustomerStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User account is now ${user.isActive ? 'Active' : 'Deactivated'}`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getCustomers,
  toggleCustomerStatus,
};
