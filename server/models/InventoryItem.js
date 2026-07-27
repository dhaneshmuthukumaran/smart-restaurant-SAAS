const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Inventory item name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Produce', 'Meat & Seafood', 'Dairy', 'Dry Goods', 'Beverages', 'Packaging'],
      default: 'Produce',
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: String,
      required: true,
      default: 'kg',
    },
    minThreshold: {
      type: Number,
      required: true,
      default: 5,
    },
    unitCost: {
      type: Number,
      required: true,
      default: 0,
    },
    supplier: {
      type: String,
      default: 'Prime Food Wholesale',
    },
    status: {
      type: String,
      enum: ['in-stock', 'low-stock', 'out-of-stock'],
      default: 'in-stock',
    },
    lastReorderedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to calculate status automatically
InventoryItemSchema.pre('save', function (next) {
  if (this.quantity <= 0) {
    this.status = 'out-of-stock';
  } else if (this.quantity <= this.minThreshold) {
    this.status = 'low-stock';
  } else {
    this.status = 'in-stock';
  }
  next();
});

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);
