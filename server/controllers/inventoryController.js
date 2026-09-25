const Product = require('../models/Product');
const InventoryHistory = require('../models/InventoryHistory');

// @desc    Get inventory summary & alerts
// @route   GET /api/inventory/summary
// @access  Private/Admin
const getInventorySummary = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    const inStockCount = await Product.countDocuments({
      isActive: true,
      stockStatus: 'In Stock',
    });
    const lowStockCount = await Product.countDocuments({
      isActive: true,
      stockStatus: 'Low Stock',
    });
    const outOfStockCount = await Product.countDocuments({
      isActive: true,
      stockStatus: 'Out of Stock',
    });

    const lowStockAlerts = await Product.find({
      isActive: true,
      stockStatus: { $in: ['Low Stock', 'Out of Stock'] },
    })
      .select('name sku brand category stock lowStockThreshold stockStatus images')
      .sort({ stock: 1 })
      .limit(20);

    res.json({
      totalProducts,
      inStockCount,
      lowStockCount,
      outOfStockCount,
      lowStockAlerts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get inventory history audit trail
// @route   GET /api/inventory/history
// @access  Private/Admin
const getInventoryHistory = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 30;
    const page = Number(req.query.page) || 1;
    const query = {};

    if (req.query.sku) {
      query.sku = new RegExp(req.query.sku, 'i');
    }

    if (req.query.changeType) {
      query.changeType = req.query.changeType;
    }

    const count = await InventoryHistory.countDocuments(query);
    const history = await InventoryHistory.find(query)
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      history,
      page,
      pages: Math.ceil(count / pageSize),
      totalEntries: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Adjust inventory for a product
// @route   POST /api/inventory/adjust
// @access  Private/Admin
const adjustInventory = async (req, res) => {
  try {
    const { productId, adjustment, reason, newLowThreshold } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const previousStock = product.stock;
    const delta = Number(adjustment) || 0;
    const newStock = Math.max(0, previousStock + delta);
    product.stock = newStock;

    if (newLowThreshold !== undefined) {
      product.lowStockThreshold = Number(newLowThreshold);
    }

    await product.save();

    const logEntry = await InventoryHistory.create({
      product: product._id,
      sku: product.sku,
      productName: product.name,
      changeType: delta >= 0 ? 'restock' : 'adjustment',
      quantityChanged: delta,
      previousStock,
      newStock,
      reason: reason || 'Manual Admin Inventory Adjustment',
      updatedBy: req.user ? req.user.name : 'Admin',
    });

    res.json({
      message: 'Inventory updated successfully',
      product,
      logEntry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInventorySummary,
  getInventoryHistory,
  adjustInventory,
};
