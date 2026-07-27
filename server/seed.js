const mongoose = require('mongoose');
const dotenv = require('dotenv');
const runSeed = require('./seedRunner');

dotenv.config();

const seedDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_restaurant';

  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    console.log('Connected to MongoDB for seeding...');
    await runSeed();
    process.exit(0);
  } catch (error) {
    console.warn('Local MongoDB unreachable. Seeding in-memory server...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
      await runSeed();
      process.exit(0);
    } catch (err) {
      console.error('Seeding error:', err);
      process.exit(1);
    }
  }
};

seedDatabase();
