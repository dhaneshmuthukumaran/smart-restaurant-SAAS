const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'kitchen', 'waiter', 'customer'],
      default: 'admin',
    },
    restaurantName: {
      type: String,
      default: 'Gourmet Bistro SaaS',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
