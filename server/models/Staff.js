const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Staff member name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['Head Chef', 'Sous Chef', 'Head Waiter', 'Waiter', 'Manager', 'Barista'],
      default: 'Waiter',
    },
    shift: {
      type: String,
      enum: ['Morning (08:00 - 16:00)', 'Evening (16:00 - 00:00)', 'Full Day'],
      default: 'Evening (16:00 - 00:00)',
    },
    status: {
      type: String,
      enum: ['Active', 'On Break', 'Off Duty'],
      default: 'Active',
    },
    hourlyRate: {
      type: Number,
      default: 18.5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Staff', StaffSchema);
