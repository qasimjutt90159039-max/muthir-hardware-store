const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "Size 10mm" or "500W"
    sku: { type: String },
    price: { type: Number },
    stock: { type: Number, default: 0 },
  },
  { _id: true }
);

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    subcategory: {
      type: String,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    salePrice: {
      type: Number,
      min: 0,
      default: null,
    },
    currency: {
      type: String,
      default: 'PKR',
    },
    isDemoPrice: {
      type: Boolean,
      default: true,
    },
    demoPriceNotice: {
      type: String,
      default: 'DEMO PRICE — VERIFY BEFORE LAUNCH',
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      trim: true,
      index: true,
    },
    modelNumber: {
      type: String,
      trim: true,
      index: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 5,
    },
    stockStatus: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
      index: true,
    },
    weight: {
      type: String,
      trim: true,
    },
    dimensions: {
      type: String,
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
    variants: [variantSchema],
    specifications: [specificationSchema],
    features: [
      {
        type: String,
      },
    ],
    packageContents: [
      {
        type: String,
      },
    ],
    warranty: {
      type: String,
      default: '', // Only shown when verified
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isNew: {
      type: Boolean,
      default: false,
      index: true,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-update stockStatus before saving
productSchema.pre('save', function (next) {
  if (this.stock <= 0) {
    this.stockStatus = 'Out of Stock';
  } else if (this.stock <= this.lowStockThreshold) {
    this.stockStatus = 'Low Stock';
  } else {
    this.stockStatus = 'In Stock';
  }
  next();
});

// Text index for search
productSchema.index({
  name: 'text',
  brand: 'text',
  sku: 'text',
  modelNumber: 'text',
  description: 'text',
  tags: 'text',
});

module.exports = mongoose.model('Product', productSchema);
