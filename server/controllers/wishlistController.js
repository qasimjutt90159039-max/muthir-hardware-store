const Wishlist = require('../models/Wishlist');

// @desc    Get current user's wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
      path: 'products',
      match: { isActive: true },
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    res.json(wishlist.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle product in wishlist (add or remove)
// @route   POST /api/wishlist/toggle
// @access  Private
const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [productId] });
      await wishlist.save();
      return res.json({ action: 'added', products: wishlist.products });
    }

    const index = wishlist.products.findIndex((p) => p.toString() === productId);
    let action = '';

    if (index > -1) {
      wishlist.products.splice(index, 1);
      action = 'removed';
    } else {
      wishlist.products.push(productId);
      action = 'added';
    }

    await wishlist.save();
    const populated = await Wishlist.findById(wishlist._id).populate({
      path: 'products',
      match: { isActive: true },
    });

    res.json({ action, products: populated.products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Merge guest wishlist with user wishlist
// @route   POST /api/wishlist/merge
// @access  Private
const mergeWishlist = async (req, res) => {
  try {
    const { productIds } = req.body;
    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({ message: 'Invalid product IDs' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
    }

    productIds.forEach((id) => {
      if (!wishlist.products.some((p) => p.toString() === id)) {
        wishlist.products.push(id);
      }
    });

    await wishlist.save();
    const populated = await Wishlist.findById(wishlist._id).populate('products');
    res.json(populated.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWishlist,
  toggleWishlist,
  mergeWishlist,
};
