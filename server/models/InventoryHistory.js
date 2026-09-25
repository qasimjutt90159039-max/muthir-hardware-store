const mongoose = require('mongoose');

const inventoryHistorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    sku: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    changeType: {
      type: String,
      enum: ['restock', 'adjustment', 'order_deduction', 'order_cancelled_return'],
      required: true,
    },
    quantityChanged: {
      type: Number,
      required: true, // positive or negative
    },
    previousStock: {
      type: Number,
      required: true,
    },
    newStock: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      default: '',
    },
    updatedBy: {
      type: String,
      default: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('InventoryHistory', inventoryHistorySchema);
