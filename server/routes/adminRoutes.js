const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getCustomers,
  toggleCustomerStatus,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect, adminOnly);
router.get('/dashboard', getDashboardStats);
router.get('/customers', getCustomers);
router.patch('/customers/:id/status', toggleCustomerStatus);

module.exports = router;
