const express = require('express');
const router = express.Router();
const {
  getStaffMembers,
  createStaffMember,
  updateStaffMember,
  deleteStaffMember,
} = require('../controllers/staffController');

router.route('/').get(getStaffMembers).post(createStaffMember);
router.route('/:id').put(updateStaffMember).delete(deleteStaffMember);

module.exports = router;
