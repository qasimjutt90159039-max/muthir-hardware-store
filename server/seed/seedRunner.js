const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Guide = require('../models/Guide');
const Coupon = require('../models/Coupon');
const SiteSettings = require('../models/SiteSettings');
const InventoryHistory = require('../models/InventoryHistory');
const Order = require('../models/Order');

const {
  categoriesData,
  brandsData,
  productsData,
  guidesData,
  couponsData,
} = require('./seedData');

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing collections...');
    await Promise.all([
      User.deleteMany(),
      Product.deleteMany(),
      Category.deleteMany(),
      Brand.deleteMany(),
      Guide.deleteMany(),
      Coupon.deleteMany(),
      SiteSettings.deleteMany(),
      InventoryHistory.deleteMany(),
      Order.deleteMany(),
    ]);

    console.log('Creating Admin & Demo Customer accounts...');
    const adminUser = await User.create({
      name: 'Mutahir Hardware Admin',
      email: 'admin@mutahirhardware.local',
      phone: '+92 308 6236092',
      password: 'Admin@123456',
      role: 'admin',
      addresses: [
        {
          title: 'Store Headquarter',
          fullName: 'Mutahir Hardware Store',
          phone: '+92 308 6236092',
          address: 'Haqbaho Market, Vehari Chowk, Peoples Colony',
          city: 'Multan',
          area: 'Peoples Colony',
          postalCode: '60000',
          isDefault: true,
        },
      ],
    });

    const demoCustomer = await User.create({
      name: 'Muhammad Tariq (Contractor)',
      email: 'customer@mutahirhardware.local',
      phone: '+92 300 1234567',
      password: 'Customer@123456',
      role: 'customer',
      addresses: [
        {
          title: 'Workshop Multan',
          fullName: 'Muhammad Tariq',
          phone: '+92 300 1234567',
          address: 'Plot 42, Small Industrial Estate',
          city: 'Multan',
          area: 'Industrial Estate',
          postalCode: '60000',
          isDefault: true,
        },
      ],
    });

    console.log('Seeding Categories...');
    await Category.insertMany(categoriesData);

    console.log('Seeding Brands...');
    await Brand.insertMany(brandsData);

    console.log('Seeding Products...');
    const createdProducts = await Product.insertMany(productsData);

    console.log('Seeding Inventory History audit trails...');
    const inventoryLogs = createdProducts.map((p) => ({
      product: p._id,
      sku: p.sku,
      productName: p.name,
      changeType: 'restock',
      quantityChanged: p.stock,
      previousStock: 0,
      newStock: p.stock,
      reason: 'Initial Catalog Deployment',
      updatedBy: 'System Seeder',
    }));
    await InventoryHistory.insertMany(inventoryLogs);

    console.log('Seeding Hardware Guides...');
    await Guide.insertMany(guidesData);

    console.log('Seeding Coupons...');
    await Coupon.insertMany(couponsData);

    console.log('Seeding Site Settings...');
    await SiteSettings.create({
      storeName: 'Mutahir Hardware Store',
      businessCategory: 'Hardware Store / Tool Store / Building & Home Improvement Supplies',
      phone: '+92 308 6236092',
      address: 'Haqbaho Market, Vehari Chowk, Peoples Colony, Multan, Punjab, Pakistan',
      announcementText: 'Hardware • Tools • Workshop Essentials',
      demoPriceNotice: 'DEMO PRICE — VERIFY BEFORE LAUNCH',
      baseDeliveryFee: 250,
      freeDeliveryThreshold: 5000,
      isDemoModeActive: true,
    });

    console.log('Seeding Initial Completed Order for Demo Customer (Enables Review Testing)...');
    const firstProduct = createdProducts[0];
    const initialOrder = await Order.create({
      orderNumber: 'MHS-DEMO-00101',
      user: demoCustomer._id,
      customerDetails: {
        fullName: demoCustomer.name,
        phone: demoCustomer.phone,
        email: demoCustomer.email,
        address: 'Plot 42, Small Industrial Estate',
        city: 'Multan',
        area: 'Industrial Estate',
        postalCode: '60000',
        orderNotes: 'Demo order placed for system verification',
      },
      items: [
        {
          product: firstProduct._id,
          productId: firstProduct.productId,
          name: firstProduct.name,
          sku: firstProduct.sku,
          brand: firstProduct.brand,
          image: firstProduct.images[0],
          price: firstProduct.salePrice || firstProduct.price,
          quantity: 1,
          total: firstProduct.salePrice || firstProduct.price,
        },
      ],
      subtotal: firstProduct.salePrice || firstProduct.price,
      discount: 0,
      deliveryFee: 0,
      total: firstProduct.salePrice || firstProduct.price,
      currency: 'PKR',
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'Paid',
      orderStatus: 'Delivered',
      statusHistory: [
        { status: 'Pending', note: 'Order placed' },
        { status: 'Delivered', note: 'Package delivered at Multan Workshop' },
      ],
    });

    await User.findByIdAndUpdate(demoCustomer._id, {
      totalSpent: initialOrder.total,
      orderCount: 1,
    });

    console.log('======================================================');
    console.log(' DATABASE SEEDED SUCCESSFULLY!');
    console.log(' Admin credentials:');
    console.log('   Email:    admin@mutahirhardware.local');
    console.log('   Password: Admin@123456');
    console.log(' Customer credentials:');
    console.log('   Email:    customer@mutahirhardware.local');
    console.log('   Password: Customer@123456');
    console.log(' Products Count: ' + createdProducts.length);
    console.log('======================================================');

    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
