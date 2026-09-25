const Guide = require('../models/Guide');

// @desc    Get all hardware guides
// @route   GET /api/guides
// @access  Public
const getGuides = async (req, res) => {
  try {
    const guides = await Guide.find().sort({ createdAt: -1 });
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get guide by slug
// @route   GET /api/guides/:slug
// @access  Public
const getGuideBySlug = async (req, res) => {
  try {
    const guide = await Guide.findOne({ slug: req.params.slug.toLowerCase() });
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    const recentGuides = await Guide.find({ _id: { $ne: guide._id } })
      .limit(3)
      .lean();

    res.json({ guide, recentGuides });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGuides,
  getGuideBySlug,
};
