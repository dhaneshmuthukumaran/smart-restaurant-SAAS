const Order = require('../models/Order');
const InventoryItem = require('../models/InventoryItem');
const MenuItem = require('../models/MenuItem');
const Staff = require('../models/Staff');

// @desc    Get key dashboard statistics and metrics
// @route   GET /api/dashboard/stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const activeOrders = await Order.countDocuments({ status: { $in: ['pending', 'preparing', 'ready'] } });
    
    // Total revenue sum
    const revenueAgg = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    // Inventory status alerts
    const lowStockItems = await InventoryItem.find({ status: { $in: ['low-stock', 'out-of-stock'] } });
    const totalInventoryCount = await InventoryItem.countDocuments();

    // Menu count
    const totalMenuItems = await MenuItem.countDocuments();
    const activeSurgeItems = await MenuItem.countDocuments({ isSurgePricingActive: true });

    // Staff count
    const activeStaffCount = await Staff.countDocuments({ status: 'Active' });

    // Recent orders
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    // Table utilization estimate (e.g. 12 tables total)
    const totalTables = 15;
    const occupiedTables = Math.min(activeOrders, totalTables);
    const tableUtilization = Math.round((occupiedTables / totalTables) * 100);

    res.json({
      totalRevenue,
      totalOrders,
      activeOrders,
      lowStockCount: lowStockItems.length,
      totalInventoryCount,
      totalMenuItems,
      activeSurgeItems,
      activeStaffCount,
      tableUtilization,
      occupiedTables,
      totalTables,
      lowStockAlerts: lowStockItems,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};
