const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      default: 'Mutahir Hardware Store',
    },
    businessCategory: {
      type: String,
      default: 'Hardware Store / Tool Store / Building & Home Improvement Supplies',
    },
    phone: {
      type: String,
      default: '+92 308 6236092',
    },
    address: {
      type: String,
      default: 'Haqbaho Market, Vehari Chowk, Peoples Colony, Multan, Punjab, Pakistan',
    },
    announcementText: {
      type: String,
      default: 'Hardware • Tools • Workshop Essentials',
    },
    demoPriceNotice: {
      type: String,
      default: 'DEMO PRICE — VERIFY BEFORE LAUNCH',
    },
    baseDeliveryFee: {
      type: Number,
      default: 250, // in PKR
    },
    freeDeliveryThreshold: {
      type: Number,
      default: 5000, // PKR
    },
    isDemoModeActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
