const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Special'],
      default: 'Main Course',
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: '',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isSurgePricingActive: {
      type: Boolean,
      default: false,
    },
    surgeMultiplier: {
      type: Number,
      default: 1.15,
    },
    preparationTimeMinutes: {
      type: Number,
      default: 15,
    },
    salesCount: {
      type: Number,
      default: 0,
    },
    inventoryItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InventoryItem',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', MenuItemSchema);
