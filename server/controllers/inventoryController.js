const InventoryItem = require('../models/InventoryItem');

// @desc Get all inventory items
// @route GET /api/inventory
exports.getInventoryItems = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (status && status !== 'All') query.status = status;
    if (search) query.name = { $regex: search, $options: 'i' };

    const items = await InventoryItem.find(query).sort({ name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error: error.message });
  }
};

// @desc Add new inventory item
// @route POST /api/inventory
exports.createInventoryItem = async (req, res) => {
  try {
    const { name, category, quantity, unit, minThreshold, unitCost, supplier } = req.body;
    const newItem = new InventoryItem({
      name,
      category,
      quantity: Number(quantity),
      unit: unit || 'kg',
      minThreshold: Number(minThreshold) || 5,
      unitCost: Number(unitCost) || 0,
      supplier: supplier || 'General Supplier',
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create inventory item', error: error.message });
  }
};

// @desc Update inventory item quantity / details
// @route PUT /api/inventory/:id
exports.updateInventoryItem = async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    const { name, category, quantity, unit, minThreshold, unitCost, supplier } = req.body;
    if (name !== undefined) item.name = name;
    if (category !== undefined) item.category = category;
    if (quantity !== undefined) item.quantity = Number(quantity);
    if (unit !== undefined) item.unit = unit;
    if (minThreshold !== undefined) item.minThreshold = Number(minThreshold);
    if (unitCost !== undefined) item.unitCost = Number(unitCost);
    if (supplier !== undefined) item.supplier = supplier;

    const updated = await item.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update inventory item', error: error.message });
  }
};

// @desc Adjust Stock Quantity (+ or -)
// @route PATCH /api/inventory/:id/stock
exports.adjustStock = async (req, res) => {
  try {
    const { adjustment } = req.body; // e.g. +5 or -2
    const item = await InventoryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    item.quantity = Math.max(0, item.quantity + Number(adjustment));
    const updated = await item.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to adjust stock', error: error.message });
  }
};

// @desc Delete inventory item
// @route DELETE /api/inventory/:id
exports.deleteInventoryItem = async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json({ message: 'Inventory item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete inventory item', error: error.message });
  }
};
