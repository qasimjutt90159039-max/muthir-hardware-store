const ContactMessage = require('../models/ContactMessage');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
const submitContactMessage = async (req, res) => {
  try {
    const { fullName, phone, email, subject, message } = req.body;

    if (!fullName || !phone || !subject || !message) {
      return res.status(400).json({ message: 'Name, phone, subject, and message are required' });
    }

    const newMessage = await ContactMessage.create({
      fullName,
      phone,
      email: email || '',
      subject,
      message,
    });

    res.status(201).json({
      message: 'Thank you! Your message has been received. Our team will contact you shortly.',
      contactId: newMessage._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN CONTROLLERS
const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMessageStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });

    if (status) msg.status = status;
    if (adminNotes !== undefined) msg.adminNotes = adminNotes;

    const updated = await msg.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContactMessage = async (req, res) => {
  try {
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });

    await msg.deleteOne();
    res.json({ message: 'Message removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage,
};
