const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const menuRoutes = require('./routes/menuRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const staffRoutes = require('./routes/staffRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/staff', staffRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date(),
  });
});

// Database Connection
const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_restaurant';

  console.log('🔌 Connecting to MongoDB...');
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.warn('⚠️ Local MongoDB unreachable. Starting MongoMemoryServer in-memory DB fallback...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
      console.log('✅ In-Memory MongoDB connected successfully!');
    } catch (memErr) {
      console.error('❌ In-Memory MongoDB failed:', memErr.message);
      throw err;
    }
  }

  // Seed demo data if DB is empty
  const MenuItem = require('./models/MenuItem');
  const count = await MenuItem.countDocuments();
  if (count === 0) {
    console.log('🌱 Seeding demo data...');
    const seedFunc = require('./seedRunner');
    await seedFunc();
    console.log('✅ Demo data seeded!');
  }
};

const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error('\n❌ MongoDB Connection Failed:', err.message);
    console.error('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error('📋 SETUP REQUIRED: No MongoDB found.');
    console.error('');
    console.error('   Option 1 — Install MongoDB Community Server:');
    console.error('   https://www.mongodb.com/try/download/community');
    console.error('');
    console.error('   Option 2 — Use MongoDB Atlas (Free Cloud DB):');
    console.error('   1. Go to https://cloud.mongodb.com');
    console.error('   2. Create a free cluster');
    console.error('   3. Copy your connection string');
    console.error('   4. Paste it in server/.env as MONGO_URI=<your-string>');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 Smart Restaurant Backend running on http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📡 API Base: http://localhost:${PORT}/api\n`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Port ${PORT} is already in use.`);
      console.error(`   Change PORT in server/.env or kill the process on port ${PORT}\n`);
    } else {
      console.error('❌ Server error:', err.message);
    }
    process.exit(1);
  });
};

startServer();
