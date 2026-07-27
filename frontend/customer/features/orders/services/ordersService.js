const mockOrders = [
  {
    id: 1001,
    restaurantName: 'Downtown Bistro',
    status: 'Preparing',
    createdAt: '2026-07-24T18:30:00Z',
    deliveryAddress: '123 Main St, Downtown',
    subtotal: 28.5,
    deliveryFee: 4.99,
    total: 33.49,
    items: [{ name: 'Margherita Pizza', quantity: 1 }],
    timeline: [
      { label: 'Order placed', time: '6:30 PM' },
      { label: 'Kitchen confirmed', time: '6:35 PM' },
    ],
  },
  {
    id: 1002,
    restaurantName: 'Northside Grill',
    status: 'Delivered',
    createdAt: '2026-07-22T20:10:00Z',
    deliveryAddress: '45 Oak Ave, Uptown',
    subtotal: 41.2,
    deliveryFee: 3.99,
    total: 45.19,
    items: [{ name: 'Burger Combo', quantity: 2 }],
    timeline: [
      { label: 'Order placed', time: '8:10 PM' },
      { label: 'Delivered', time: '8:50 PM' },
    ],
  },
];

export const ordersService = {
  async getOrders(userId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockOrders.map((order) => ({ ...order }));
  },

  async getOrderById(userId, orderId) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return mockOrders.find((order) => order.id === Number(orderId)) || null;
  },
};

export default ordersService;
