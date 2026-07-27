const express = require('express');
const router = express.Router();
const {
  getInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  adjustStock,
  deleteInventoryItem,
} = require('../controllers/inventoryController');

router.route('/').get(getInventoryItems).post(createInventoryItem);
router.route('/:id').put(updateInventoryItem).delete(deleteInventoryItem);
router.patch('/:id/stock', adjustStock);

module.exports = router;
