const Product = require('../models/Product');
const InventoryHistory = require('../models/InventoryHistory');

// @desc    Fetch all products with advanced filtering & pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 12;
    const page = Number(req.query.page) || 1;

    const query = { isActive: true };

    // Search query
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex },
        { modelNumber: searchRegex },
        { sku: searchRegex },
        { category: searchRegex },
        { subcategory: searchRegex },
        { tags: searchRegex },
      ];
    }

    // Category filter
    if (req.query.category && req.query.category !== 'all') {
      query.category = new RegExp(`^${req.query.category}$`, 'i');
    }

    // Subcategory filter
    if (req.query.subcategory) {
      query.subcategory = new RegExp(`^${req.query.subcategory}$`, 'i');
    }

    // Brand filter (can be comma-separated or single)
    if (req.query.brand) {
      const brands = req.query.brand.split(',').map((b) => b.trim());
      query.brand = { $in: brands.map((b) => new RegExp(`^${b}$`, 'i')) };
    }

    // Availability filter
    if (req.query.availability) {
      const statuses = req.query.availability.split(',').map((s) => s.trim());
      query.stockStatus = { $in: statuses };
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Boolean flags
    if (req.query.isFeatured === 'true') query.isFeatured = true;
    if (req.query.isNew === 'true') query.isNew = true;
    if (req.query.isBestSeller === 'true') query.isBestSeller = true;

    // Sorting
    let sort = { createdAt: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-asc':
          sort = { price: 1 };
          break;
        case 'price-desc':
          sort = { price: -1 };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        case 'rating':
          sort = { rating: -1, reviewCount: -1 };
          break;
        case 'featured':
          sort = { isFeatured: -1, createdAt: -1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Live search suggestions
// @route   GET /api/products/suggestions
// @access  Public
const getSearchSuggestions = async (req, res) => {
  try {
    const q = req.query.q;
    if (!q || q.trim().length === 0) {
      return res.json([]);
    }

    const regex = new RegExp(q.trim(), 'i');
    const suggestions = await Product.find(
      {
        isActive: true,
        $or: [
          { name: regex },
          { brand: regex },
          { modelNumber: regex },
          { sku: regex },
          { category: regex },
        ],
      },
      'name slug brand category price images modelNumber sku stockStatus'
    )
      .limit(8)
      .lean();

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug.toLowerCase(),
      isActive: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Fetch related products from same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true,
    })
      .limit(4)
      .lean();

    res.json({
      product,
      relatedProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products by IDs (for comparison)
// @route   GET /api/products/compare
// @access  Public
const getProductsForComparison = async (req, res) => {
  try {
    const ids = req.query.ids ? req.query.ids.split(',') : [];
    if (!ids.length) {
      return res.json([]);
    }

    const products = await Product.find({
      _id: { $in: ids },
      isActive: true,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get homepage collections (featured, power tools, hand tools, new arrivals, best sellers)
// @route   GET /api/products/home-collections
// @access  Public
const getHomeCollections = async (req, res) => {
  try {
    const [featured, powerTools, handTools, newArrivals, bestSellers] = await Promise.all([
      Product.find({ isFeatured: true, isActive: true }).limit(8).lean(),
      Product.find({
        isActive: true,
        $or: [{ category: /power/i }, { subcategory: /power/i }],
      })
        .limit(8)
        .lean(),
      Product.find({
        isActive: true,
        $or: [{ category: /hand/i }, { subcategory: /hand/i }],
      })
        .limit(8)
        .lean(),
      Product.find({ isNew: true, isActive: true }).sort({ createdAt: -1 }).limit(8).lean(),
      Product.find({ isBestSeller: true, isActive: true }).limit(8).lean(),
    ]);

    res.json({
      featured,
      powerTools,
      handTools,
      newArrivals,
      bestSellers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN CONTROLLERS

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      category,
      subcategory,
      description,
      shortDescription,
      images,
      price,
      salePrice,
      sku,
      modelNumber,
      stock,
      lowStockThreshold,
      weight,
      dimensions,
      material,
      variants,
      specifications,
      features,
      packageContents,
      warranty,
      tags,
      isFeatured,
      isNew,
      isBestSeller,
    } = req.body;

    const baseSlug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const product = new Product({
      productId: `MHS-${Date.now().toString().slice(-6)}`,
      name,
      slug,
      brand,
      category,
      subcategory,
      description,
      shortDescription,
      images: images && images.length ? images : ['https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'],
      price,
      salePrice: salePrice || null,
      sku,
      modelNumber,
      stock: Number(stock) || 0,
      lowStockThreshold: Number(lowStockThreshold) || 5,
      weight,
      dimensions,
      material,
      variants: variants || [],
      specifications: specifications || [],
      features: features || [],
      packageContents: packageContents || [],
      warranty: warranty || '',
      tags: tags || [],
      isFeatured: !!isFeatured,
      isNew: !!isNew,
      isBestSeller: !!isBestSeller,
    });

    const createdProduct = await product.save();

    // Log initial inventory entry
    await InventoryHistory.create({
      product: createdProduct._id,
      sku: createdProduct.sku,
      productName: createdProduct.name,
      changeType: 'restock',
      quantityChanged: createdProduct.stock,
      previousStock: 0,
      newStock: createdProduct.stock,
      reason: 'Initial Product Creation',
      updatedBy: req.user ? req.user.name : 'Admin',
    });

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const previousStock = product.stock;

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    // If stock changed, record inventory history
    if (req.body.stock !== undefined && Number(req.body.stock) !== previousStock) {
      await InventoryHistory.create({
        product: updatedProduct._id,
        sku: updatedProduct.sku,
        productName: updatedProduct.name,
        changeType: 'adjustment',
        quantityChanged: Number(req.body.stock) - previousStock,
        previousStock,
        newStock: Number(req.body.stock),
        reason: req.body.adjustmentReason || 'Admin Manual Adjustment',
        updatedBy: req.user ? req.user.name : 'Admin',
      });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Soft delete to protect order history integrity
    product.isActive = false;
    await product.save();

    res.json({ message: 'Product archived successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin quick stock adjustment
// @route   PATCH /api/products/:id/stock
// @access  Private/Admin
const adjustStock = async (req, res) => {
  try {
    const { adjustment, reason } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const previousStock = product.stock;
    const newStock = Math.max(0, previousStock + Number(adjustment));
    product.stock = newStock;
    await product.save();

    await InventoryHistory.create({
      product: product._id,
      sku: product.sku,
      productName: product.name,
      changeType: Number(adjustment) > 0 ? 'restock' : 'adjustment',
      quantityChanged: Number(adjustment),
      previousStock,
      newStock,
      reason: reason || 'Quick Inventory Update',
      updatedBy: req.user ? req.user.name : 'Admin',
    });

    res.json({
      product,
      message: `Stock updated to ${newStock}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getSearchSuggestions,
  getProductBySlug,
  getProductsForComparison,
  getHomeCollections,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
};
