const express = require('express');
const router = express.Router();
const {
  getProducts,
  getSearchSuggestions,
  getProductBySlug,
  getProductsForComparison,
  getHomeCollections,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.get('/suggestions', getSearchSuggestions);
router.get('/home-collections', getHomeCollections);
router.get('/compare', getProductsForComparison);
router.get('/slug/:slug', getProductBySlug);

router.post('/', protect, adminOnly, createProduct);
router.route('/:id')
  .put(protect, adminOnly, updateProduct)
  .delete(protect, adminOnly, deleteProduct);
router.patch('/:id/stock', protect, adminOnly, adjustStock);

module.exports = router;
