const express = require('express');
const router = express.Router();
const {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');

router.route('/').get(getOrders).post(createOrder);
router.route('/:id').delete(deleteOrder);
router.patch('/:id/status', updateOrderStatus);

module.exports = router;
