const MenuItem = require('../models/MenuItem');

// @desc Get all menu items
// @route GET /api/menu
exports.getMenuItems = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    const items = await MenuItem.find(query).sort({ category: 1, name: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
};

// @desc Create a menu item
// @route POST /api/menu
exports.createMenuItem = async (req, res) => {
  try {
    const { name, category, basePrice, description, preparationTimeMinutes } = req.body;
    const newItem = await MenuItem.create({
      name,
      category,
      basePrice: Number(basePrice),
      currentPrice: Number(basePrice),
      description,
      preparationTimeMinutes: Number(preparationTimeMinutes) || 15,
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create menu item', error: error.message });
  }
};

// @desc Update a menu item
// @route PUT /api/menu/:id
exports.updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const { name, category, basePrice, description, isAvailable, preparationTimeMinutes } = req.body;
    if (name !== undefined) item.name = name;
    if (category !== undefined) item.category = category;
    if (basePrice !== undefined) {
      item.basePrice = Number(basePrice);
      if (!item.isSurgePricingActive) {
        item.currentPrice = Number(basePrice);
      } else {
        item.currentPrice = Number((item.basePrice * item.surgeMultiplier).toFixed(2));
      }
    }
    if (description !== undefined) item.description = description;
    if (isAvailable !== undefined) item.isAvailable = isAvailable;
    if (preparationTimeMinutes !== undefined) item.preparationTimeMinutes = preparationTimeMinutes;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update menu item', error: error.message });
  }
};

// @desc Toggle Dynamic Surge Pricing
// @route PATCH /api/menu/:id/surge
exports.toggleSurgePricing = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    item.isSurgePricingActive = !item.isSurgePricingActive;
    if (item.isSurgePricingActive) {
      item.currentPrice = Number((item.basePrice * item.surgeMultiplier).toFixed(2));
    } else {
      item.currentPrice = item.basePrice;
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Failed to toggle surge pricing', error: error.message });
  }
};

// @desc Delete a menu item
// @route DELETE /api/menu/:id
exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete menu item', error: error.message });
  }
};
