const Order = require('../models/Order');
const InventoryItem = require('../models/InventoryItem');
const MenuItem = require('../models/MenuItem');

// @desc Get all orders
// @route GET /api/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItemId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc Create a new order
// @route POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { items, tableNumber, status, customerName, notes } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    const populatedItems = await Promise.all(
      items.map(async (item) => {
        const menuItem = await MenuItem.findById(item.menuItemId || item._id);
        if (!menuItem) {
          return {
            name: item.name || 'Menu Item',
            quantity: Number(item.quantity) || 1,
            price: Number(item.price) || 0,
          };
        }
        return {
          menuItemId: menuItem._id,
          name: menuItem.name,
          quantity: Number(item.quantity) || 1,
          price: menuItem.currentPrice || menuItem.basePrice,
        };
      })
    );

    const subtotal = populatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const totalAmount = Math.round((subtotal + tax) * 100) / 100;
    const orderNumber = `ORD-#${Math.floor(1000 + Math.random() * 9000)}`;

    const order = new Order({
      orderNumber,
      tableNumber: Number(tableNumber) || 1,
      customerName: customerName || 'Guest',
      items: populatedItems,
      subtotal,
      tax,
      totalAmount,
      status: status || 'pending',
      notes: notes || '',
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(400).json({ message: err.message });
  }
};

// @desc Update order status
// @route PATCH /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(400).json({ message: err.message });
  }
};

// @desc Delete an order
// @route DELETE /api/orders/:id
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ message: err.message });
  }
};

