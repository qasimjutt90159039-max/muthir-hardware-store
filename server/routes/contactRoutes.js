const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage,
} = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', submitContactMessage);
router.get('/', protect, adminOnly, getContactMessages);
router.route('/:id')
  .put(protect, adminOnly, updateMessageStatus)
  .delete(protect, adminOnly, deleteContactMessage);

module.exports = router;
