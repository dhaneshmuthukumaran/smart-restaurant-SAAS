const Staff = require('../models/Staff');

// @desc Get all staff members
// @route GET /api/staff
exports.getStaffMembers = async (req, res) => {
  try {
    const { role, status, search } = req.query;
    let query = {};
    if (role && role !== 'All') query.role = role;
    if (status && status !== 'All') query.status = status;
    if (search) query.name = { $regex: search, $options: 'i' };

    const staff = await Staff.find(query).sort({ name: 1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching staff', error: error.message });
  }
};

// @desc Add staff member
// @route POST /api/staff
exports.createStaffMember = async (req, res) => {
  try {
    const { name, email, phone, role, shift, status, hourlyRate } = req.body;
    const newStaff = await Staff.create({
      name,
      email,
      phone,
      role,
      shift,
      status: status || 'Active',
      hourlyRate: Number(hourlyRate) || 18.5,
    });
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create staff member', error: error.message });
  }
};

// @desc Update staff member
// @route PUT /api/staff/:id
exports.updateStaffMember = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    const { name, email, phone, role, shift, status, hourlyRate } = req.body;
    if (name !== undefined) staff.name = name;
    if (email !== undefined) staff.email = email;
    if (phone !== undefined) staff.phone = phone;
    if (role !== undefined) staff.role = role;
    if (shift !== undefined) staff.shift = shift;
    if (status !== undefined) staff.status = status;
    if (hourlyRate !== undefined) staff.hourlyRate = Number(hourlyRate);

    const updated = await staff.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update staff member', error: error.message });
  }
};

// @desc Delete staff member
// @route DELETE /api/staff/:id
exports.deleteStaffMember = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }
    res.json({ message: 'Staff member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete staff member', error: error.message });
  }
};
