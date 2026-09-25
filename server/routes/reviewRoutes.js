const express = require('express');
const router = express.Router();
const {
  getProductReviews,
  createReview,
  getAllReviewsAdmin,
  updateReviewStatus,
  deleteReview,
} = require('../controllers/reviewController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/product/:productId', getProductReviews);
router.post('/', protect, createReview);

router.get('/admin', protect, adminOnly, getAllReviewsAdmin);
router.put('/:id/status', protect, adminOnly, updateReviewStatus);
router.delete('/:id', protect, adminOnly, deleteReview);

module.exports = router;
