const mongoose = require('mongoose');

let memoryServerInstance = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mutahir_hardware';
  
  try {
    mongoose.set('strictQuery', false);
    console.log(`Connecting to MongoDB at: ${uri}...`);
    
    // Attempt standard connection with 3s timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`Connected to MongoDB successfully: ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`Standard MongoDB connection failed (${err.message}). Initializing resilient in-memory database fallback...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      memoryServerInstance = await MongoMemoryServer.create();
      const fallbackUri = memoryServerInstance.getUri();
      console.log(`Fallback MongoMemoryServer initialized at: ${fallbackUri}`);
      await mongoose.connect(fallbackUri);
      console.log('Connected to In-Memory MongoDB successfully. Development database ready!');
    } catch (memErr) {
      console.error('Critical Database connection error:', memErr);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
