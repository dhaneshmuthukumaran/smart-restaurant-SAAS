const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  toggleSurgePricing,
  deleteMenuItem,
} = require('../controllers/menuController');

router.route('/').get(getMenuItems).post(createMenuItem);
router.route('/:id').put(updateMenuItem).delete(deleteMenuItem);
router.patch('/:id/surge', toggleSurgePricing);

module.exports = router;
