const Coupon = require('../models/Coupon');

// @desc    Validate coupon code
// @route   POST /api/coupons/validate
// @access  Public
const validateCoupon = async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Coupon code is required' });
    }

    const coupon = await Coupon.findOne({
      couponCode: code.toUpperCase().trim(),
    });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }

    const validity = coupon.isValid(Number(subtotal) || 0);
    if (!validity.valid) {
      return res.status(400).json({ message: validity.message });
    }

    const discountAmount = coupon.calculateDiscount(Number(subtotal) || 0);

    res.json({
      valid: true,
      couponCode: coupon.couponCode,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount,
      message: `Coupon applied: PKR ${discountAmount.toLocaleString()} discount`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN CONTROLLERS
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCoupon = async (req, res) => {
  try {
    const {
      couponCode,
      discountType,
      discountValue,
      minimumOrder,
      maximumDiscount,
      expiryDate,
      usageLimit,
      description,
    } = req.body;

    const existing = await Coupon.findOne({
      couponCode: couponCode.toUpperCase().trim(),
    });
    if (existing) {
      return res.status(400).json({ message: 'Coupon with this code already exists' });
    }

    const coupon = await Coupon.create({
      couponCode: couponCode.toUpperCase().trim(),
      discountType,
      discountValue: Number(discountValue),
      minimumOrder: Number(minimumOrder) || 0,
      maximumDiscount: maximumDiscount ? Number(maximumDiscount) : null,
      expiryDate: new Date(expiryDate),
      usageLimit: usageLimit ? Number(usageLimit) : null,
      description: description || '',
    });

    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

    Object.assign(coupon, req.body);
    if (req.body.couponCode) coupon.couponCode = req.body.couponCode.toUpperCase().trim();

    const updated = await coupon.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });

    await coupon.deleteOne();
    res.json({ message: 'Coupon deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  validateCoupon,
  getAllCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
