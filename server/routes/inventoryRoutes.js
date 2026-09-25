const express = require('express');
const router = express.Router();
const {
  getInventorySummary,
  getInventoryHistory,
  adjustInventory,
} = require('../controllers/inventoryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect, adminOnly);
router.get('/summary', getInventorySummary);
router.get('/history', getInventoryHistory);
router.post('/adjust', adjustInventory);

module.exports = router;
