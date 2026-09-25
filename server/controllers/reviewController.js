const Review = require('../models/Review');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Recalculate product rating helper
const updateProductRatingStats = async (productId) => {
  const reviews = await Review.find({ product: productId, status: 'approved' });
  const reviewCount = reviews.length;
  const rating =
    reviewCount > 0
      ? Number((reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1))
      : 0;

  await Product.findByIdAndUpdate(productId, { rating, reviewCount });
};

// @desc    Get approved reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      status: 'approved',
    }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit a review (Verified purchase only)
// @route   POST /api/reviews
// @access  Private (Authenticated customers only)
const createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Verify purchase: Check if user has an order containing this product that is Delivered or Confirmed
    const verifiedOrder = await Order.findOne({
      user: req.user._id,
      'items.product': productId,
      orderStatus: { $in: ['Delivered', 'Shipped', 'Confirmed', 'Processing'] },
    });

    if (!verifiedOrder) {
      return res.status(403).json({
        message: 'Review verification failed: Only customers who have purchased this product can leave a verified review.',
      });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      title: title || '',
      comment,
      isVerifiedPurchase: true,
      order: verifiedOrder._id,
      status: 'pending', // Requires admin moderation
    });

    res.status(201).json({
      review,
      message: 'Thank you! Your verified review has been submitted for moderation.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN CONTROLLERS

// @desc    Get all reviews for moderation
// @route   GET /api/reviews/admin
// @access  Private/Admin
const getAllReviewsAdmin = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('product', 'name sku images')
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Moderate review status (approved, hidden)
// @route   PUT /api/reviews/:id/status
// @access  Private/Admin
const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.status = status;
    await review.save();

    await updateProductRatingStats(review.product);

    res.json({ message: `Review status updated to ${status}`, review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const productId = review.product;
    await review.deleteOne();
    await updateProductRatingStats(productId);

    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProductReviews,
  createReview,
  getAllReviewsAdmin,
  updateReviewStatus,
  deleteReview,
};
