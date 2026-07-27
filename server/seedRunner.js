const bcrypt = require('bcryptjs');
const User = require('./models/User');
const MenuItem = require('./models/MenuItem');
const InventoryItem = require('./models/InventoryItem');
const Order = require('./models/Order');
const Staff = require('./models/Staff');

const runSeed = async () => {
  const existingUsers = await User.countDocuments();
  if (existingUsers > 0) return;

  console.log('🌱 Seeding initial restaurant dataset...');

  // 1. Admin User
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  await User.create({
    name: 'Restaurant Admin',
    email: 'admin@bistro.com',
    password: hashedPassword,
    role: 'admin',
    restaurantName: 'La Maison Gourmet Bistro',
  });

  // 2. Inventory Items
  const inventoryData = [
    { name: 'Wagyu Beef Ribeye', category: 'Meat & Seafood', quantity: 24, unit: 'kg', minThreshold: 8, unitCost: 45, supplier: 'Prime Meat Co.' },
    { name: 'Fresh Salmon Fillet', category: 'Meat & Seafood', quantity: 6, unit: 'kg', minThreshold: 10, unitCost: 28, supplier: 'Ocean Fresh Seafood' },
    { name: 'Truffle Oil', category: 'Dry Goods', quantity: 3, unit: 'L', minThreshold: 2, unitCost: 60, supplier: 'Artisan Imports' },
    { name: 'Organic Baby Spinach', category: 'Produce', quantity: 12, unit: 'kg', minThreshold: 5, unitCost: 6, supplier: 'Green Farm Co-op' },
    { name: 'Parmesan Reggiano', category: 'Dairy', quantity: 8, unit: 'kg', minThreshold: 3, unitCost: 22, supplier: 'Italian Dairy Exporters' },
    { name: 'Craft Espresso Beans', category: 'Beverages', quantity: 18, unit: 'kg', minThreshold: 5, unitCost: 18, supplier: 'Roasters Select' },
  ];
  await InventoryItem.insertMany(inventoryData);

  // 3. Menu Items
  const menuData = [
    {
      name: 'Truffle Wagyu Steak',
      category: 'Main Course',
      basePrice: 42.0,
      currentPrice: 42.0,
      description: 'Pan-seared Wagyu ribeye infused with black truffle oil & rosemary reduction.',
      isAvailable: true,
      isSurgePricingActive: false,
      preparationTimeMinutes: 25,
    },
    {
      name: 'Pan-Seared Atlantic Salmon',
      category: 'Main Course',
      basePrice: 32.5,
      currentPrice: 37.38,
      description: 'Crispy skin salmon served over wild mushroom risotto and lemon herb oil.',
      isAvailable: true,
      isSurgePricingActive: true,
      surgeMultiplier: 1.15,
      preparationTimeMinutes: 20,
    },
    {
      name: 'Burrata & Heirloom Salad',
      category: 'Appetizer',
      basePrice: 16.0,
      currentPrice: 16.0,
      description: 'Creamy artisan burrata, ripe heirloom tomatoes, organic spinach, and balsamic drizzle.',
      isAvailable: true,
      isSurgePricingActive: false,
      preparationTimeMinutes: 10,
    },
    {
      name: 'Artisan Molten Lava Cake',
      category: 'Dessert',
      basePrice: 12.0,
      currentPrice: 12.0,
      description: 'Rich dark chocolate cake with a molten center served with vanilla gelato.',
      isAvailable: true,
      isSurgePricingActive: false,
      preparationTimeMinutes: 15,
    },
    {
      name: 'Signature Nitro Cold Brew',
      category: 'Beverage',
      basePrice: 7.5,
      currentPrice: 7.5,
      description: 'Velvety nitrogen-infused craft cold brew coffee.',
      isAvailable: true,
      isSurgePricingActive: false,
      preparationTimeMinutes: 5,
    },
  ];
  const createdMenu = await MenuItem.insertMany(menuData);

  // 4. Staff Members
  const staffData = [
    { name: 'Antoine Laurent', email: 'antoine@bistro.com', phone: '+1 555-0192', role: 'Head Chef', shift: 'Morning (08:00 - 16:00)', status: 'Active', hourlyRate: 35.0 },
    { name: 'Elena Rostova', email: 'elena@bistro.com', phone: '+1 555-0143', role: 'Sous Chef', shift: 'Evening (16:00 - 00:00)', status: 'Active', hourlyRate: 26.0 },
    { name: 'Marcus Vance', email: 'marcus@bistro.com', phone: '+1 555-0188', role: 'Head Waiter', shift: 'Evening (16:00 - 00:00)', status: 'Active', hourlyRate: 22.0 },
    { name: 'Sofia Rodriguez', email: 'sofia@bistro.com', phone: '+1 555-0177', role: 'Waiter', shift: 'Morning (08:00 - 16:00)', status: 'On Break', hourlyRate: 18.5 },
  ];
  await Staff.insertMany(staffData);

  // 5. Orders
  const ordersData = [
    {
      orderNumber: 'ORD-#1001',
      tableNumber: 4,
      customerName: 'Claire Bennet',
      items: [
        { menuItemId: createdMenu[0]._id, name: createdMenu[0].name, quantity: 2, price: 42.0 },
        { menuItemId: createdMenu[4]._id, name: createdMenu[4].name, quantity: 2, price: 7.5 },
      ],
      subtotal: 99.0,
      tax: 7.92,
      totalAmount: 106.92,
      status: 'preparing',
      paymentStatus: 'unpaid',
      notes: 'Steak medium-rare please.',
    },
    {
      orderNumber: 'ORD-#1002',
      tableNumber: 7,
      customerName: 'David Miller',
      items: [
        { menuItemId: createdMenu[1]._id, name: createdMenu[1].name, quantity: 1, price: 37.38 },
        { menuItemId: createdMenu[2]._id, name: createdMenu[2].name, quantity: 1, price: 16.0 },
        { menuItemId: createdMenu[3]._id, name: createdMenu[3].name, quantity: 1, price: 12.0 },
      ],
      subtotal: 65.38,
      tax: 5.23,
      totalAmount: 70.61,
      status: 'ready',
      paymentStatus: 'unpaid',
      notes: 'Dressing on the side.',
    },
    {
      orderNumber: 'ORD-#1003',
      tableNumber: 2,
      customerName: 'Samantha Wu',
      items: [{ menuItemId: createdMenu[0]._id, name: createdMenu[0].name, quantity: 1, price: 42.0 }],
      subtotal: 42.0,
      tax: 3.36,
      totalAmount: 45.36,
      status: 'pending',
      paymentStatus: 'unpaid',
    },
  ];
  await Order.insertMany(ordersData);

  console.log('✅ Seed data successfully injected!');
};

module.exports = runSeed;
