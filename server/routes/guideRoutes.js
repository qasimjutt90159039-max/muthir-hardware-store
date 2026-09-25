const express = require('express');
const router = express.Router();
const {
  getGuides,
  getGuideBySlug,
} = require('../controllers/guideController');

router.get('/', getGuides);
router.get('/:slug', getGuideBySlug);

module.exports = router;
