const Brand = require('../models/Brand');
const Product = require('../models/Product');

// @desc    Get all active brands with live product counts
// @route   GET /api/brands
// @access  Public
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).sort({ name: 1 });

    // Compute live product count for each brand
    const brandsWithCounts = await Promise.all(
      brands.map(async (b) => {
        const count = await Product.countDocuments({
          brand: new RegExp(`^${b.name}$`, 'i'),
          isActive: true,
        });
        return {
          ...b.toObject(),
          productCount: count,
        };
      })
    );

    res.json(brandsWithCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN CONTROLLERS
const createBrand = async (req, res) => {
  try {
    const { name, logo, description } = req.body;
    const slug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const brand = await Brand.create({
      name,
      slug,
      logo,
      description,
    });
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });

    Object.assign(brand, req.body);
    const updated = await brand.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });

    brand.isActive = false;
    await brand.save();
    res.json({ message: 'Brand archived' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
};
