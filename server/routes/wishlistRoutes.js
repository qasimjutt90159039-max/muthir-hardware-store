const express = require('express');
const router = express.Router();
const {
  getWishlist,
  toggleWishlist,
  mergeWishlist,
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getWishlist);
router.post('/toggle', toggleWishlist);
router.post('/merge', mergeWishlist);

module.exports = router;
