const express = require('express');
const router = express.Router();
const {
  getSiteSettings,
  updateSiteSettings,
} = require('../controllers/settingsController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(getSiteSettings)
  .put(protect, adminOnly, updateSiteSettings);

module.exports = router;
