// services/notificationsService.js

import { Notification, NotificationPreferences } from '../types/notifications.types';

// Mock data - sample notifications
const mockNotifications = [
  {
    id: 1,
    userId: 'user1',
    type: 'order_delivered',
    title: 'Order Delivered! 🎉',
    message: 'Your order #ORD-1001 has been delivered. Enjoy your meal!',
    image: '',
    link: '/orders/1',
    isRead: false,
    priority: 'high',
    data: { orderId: 1, orderNumber: '#ORD-1001' },
    createdAt: '2026-07-25T14:30:00Z',
    updatedAt: '2026-07-25T14:30:00Z',
    expiresAt: null,
  },
  {
    id: 2,
    userId: 'user1',
    type: 'order_confirmed',
    title: 'Order Confirmed ✅',
    message: 'Your order #ORD-1002 has been confirmed by the restaurant.',
    image: '',
    link: '/orders/2',
    isRead: false,
    priority: 'medium',
    data: { orderId: 2, orderNumber: '#ORD-1002' },
    createdAt: '2026-07-24T18:15:00Z',
    updatedAt: '2026-07-24T18:15:00Z',
    expiresAt: null,
  },
  {
    id: 3,
    userId: 'user1',
    type: 'promotion',
    title: '🎉 Weekend Special!',
    message: 'Get 20% off on all pizzas this weekend. Use code: PIZZA20',
    image: 'https://via.placeholder.com/400x200?text=Promotion',
    link: '/offers',
    isRead: true,
    priority: 'medium',
    data: { code: 'PIZZA20', discount: 20 },
    createdAt: '2026-07-24T10:00:00Z',
    updatedAt: '2026-07-24T10:00:00Z',
    expiresAt: '2026-07-27T23:59:59Z',
  },
  {
    id: 4,
    userId: 'user1',
    type: 'review_reply',
    title: 'Restaurant Replied 💬',
    message: 'Downtown Flagship replied to your review: "Thank you for your wonderful review!"',
    image: '',
    link: '/reviews/1',
    isRead: true,
    priority: 'low',
    data: { reviewId: 1, restaurantName: 'Downtown Flagship' },
    createdAt: '2026-07-23T09:30:00Z',
    updatedAt: '2026-07-23T09:30:00Z',
    expiresAt: null,
  },
  {
    id: 5,
    userId: 'user1',
    type: 'order_preparing',
    title: 'Your order is being prepared 👨‍🍳',
    message: 'The restaurant is preparing your order #ORD-1002.',
    image: '',
    link: '/orders/2',
    isRead: false,
    priority: 'medium',
    data: { orderId: 2, orderNumber: '#ORD-1002' },
    createdAt: '2026-07-24T18:20:00Z',
    updatedAt: '2026-07-24T18:20:00Z',
    expiresAt: null,
  },
  {
    id: 6,
    userId: 'user1',
    type: 'offer',
    title: '💰 Free Delivery!',
    message: 'Enjoy free delivery on orders above $30. Valid for today only!',
    image: '',
    link: '/restaurants',
    isRead: false,
    priority: 'high',
    data: { minOrder: 30 },
    createdAt: '2026-07-25T08:00:00Z',
    updatedAt: '2026-07-25T08:00:00Z',
    expiresAt: '2026-07-25T23:59:59Z',
  },
  {
    id: 7,
    userId: 'user1',
    type: 'system',
    title: '⚙️ App Update Available',
    message: 'Version 2.0.0 is now available. Update for new features!',
    image: '',
    link: '',
    isRead: true,
    priority: 'medium',
    data: { version: '2.0.0' },
    createdAt: '2026-07-22T16:00:00Z',
    updatedAt: '2026-07-22T16:00:00Z',
    expiresAt: null,
  },
  {
    id: 8,
    userId: 'user1',
    type: 'reminder',
    title: '⏰ Your Booking Reminder',
    message: 'You have a table booking at Downtown Flagship tomorrow at 7:00 PM.',
    image: '',
    link: '/bookings/1',
    isRead: false,
    priority: 'medium',
    data: { bookingId: 1, restaurantName: 'Downtown Flagship', time: '7:00 PM' },
    createdAt: '2026-07-25T12:00:00Z',
    updatedAt: '2026-07-25T12:00:00Z',
    expiresAt: null,
  },
];

// Store notifications in memory
let notifications = [...mockNotifications];

export const notificationsService = {
  /**
   * Get user's notifications
   */
  async getNotifications(userId, filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filtered = notifications.filter((n) => n.userId === userId);

    // Filter by type
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter((n) => n.type === filters.type);
    }

    // Filter by read status
    if (filters.isRead !== null && filters.isRead !== undefined) {
      filtered = filtered.filter((n) => n.isRead === filters.isRead);
    }

    // Filter by priority
    if (filters.priority && filters.priority !== 'all') {
      filtered = filtered.filter((n) => n.priority === filters.priority);
    }

    // Filter by date range
    if (filters.dateRange?.start) {
      const startDate = new Date(filters.dateRange.start);
      filtered = filtered.filter((n) => new Date(n.createdAt) >= startDate);
    }
    if (filters.dateRange?.end) {
      const endDate = new Date(filters.dateRange.end);
      endDate.setHours(23, 59, 59);
      filtered = filtered.filter((n) => new Date(n.createdAt) <= endDate);
    }

    // Sort by createdAt (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return {
      notifications: paginated.map((n) => new Notification(n)),
      total: filtered.length,
      page,
      limit,
      pages: Math.ceil(filtered.length / limit),
    };
  },

  /**
   * Get unread count
   */
  async getUnreadCount(userId) {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const unread = notifications.filter(
      (n) => n.userId === userId && !n.isRead
    );
    return unread.length;
  },

  /**
   * Mark notification as read
   */
  async markAsRead(userId, notificationId) {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const notification = notifications.find(
      (n) => n.id === Number(notificationId) && n.userId === userId
    );
    if (notification) {
      notification.isRead = true;
      notification.updatedAt = new Date().toISOString();
    }
    return new Notification(notification);
  },

  /**
   * Mark all as read
   */
  async markAllAsRead(userId) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    notifications.forEach((n) => {
      if (n.userId === userId && !n.isRead) {
        n.isRead = true;
        n.updatedAt = new Date().toISOString();
      }
    });
    return { success: true };
  },

  /**
   * Delete notification
   */
  async deleteNotification(userId, notificationId) {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const index = notifications.findIndex(
      (n) => n.id === Number(notificationId) && n.userId === userId
    );
    if (index !== -1) {
      notifications.splice(index, 1);
    }
    return { success: true };
  },

  /**
   * Delete all notifications
   */
  async deleteAllNotifications(userId) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    notifications = notifications.filter((n) => n.userId !== userId);
    return { success: true };
  },

  /**
   * Get user preferences
   */
  async getPreferences(userId) {
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Mock preferences
    const preferences = {
      channels: {
        email: true,
        push: true,
        sms: false,
      },
      categories: {
        orderUpdates: true,
        promotions: true,
        reviews: true,
        reminders: true,
      },
      quietHours: {
        start: '22:00',
        end: '08:00',
        enabled: false,
      },
    };

    return new NotificationPreferences(preferences);
  },

  /**
   * Update preferences
   */
  async updatePreferences(userId, preferences) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // In real app, would save to database
    return new NotificationPreferences(preferences);
  },

  /**
   * Register device for push notifications
   */
  async registerDevice(userId, deviceToken, deviceInfo = {}) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // In real app, would save device token
    return {
      success: true,
      deviceToken,
      registered: true,
    };
  },

  /**
   * Unregister device
   */
  async unregisterDevice(userId, deviceToken) {
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      success: true,
      deviceToken,
      unregistered: true,
    };
  },

  /**
   * Create notification (for system use)
   */
  async createNotification(data) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newNotification = {
      id: Date.now(),
      userId: data.userId || '',
      type: data.type || 'system',
      title: data.title || '',
      message: data.message || '',
      image: data.image || '',
      link: data.link || '',
      isRead: false,
      priority: data.priority || 'medium',
      data: data.data || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expiresAt: data.expiresAt || null,
    };

    notifications.unshift(newNotification);
    return new Notification(newNotification);
  },

  /**
   * Get notification types
   */
  async getNotificationTypes() {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return [
      { type: 'order_placed', label: 'Order Placed', icon: '📋' },
      { type: 'order_confirmed', label: 'Order Confirmed', icon: '✅' },
      { type: 'order_preparing', label: 'Preparing Order', icon: '👨‍🍳' },
      { type: 'order_ready', label: 'Order Ready', icon: '📦' },
      { type: 'order_out_for_delivery', label: 'Out for Delivery', icon: '🚚' },
      { type: 'order_delivered', label: 'Order Delivered', icon: '🏠' },
      { type: 'order_cancelled', label: 'Order Cancelled', icon: '❌' },
      { type: 'promotion', label: 'Promotion', icon: '🎉' },
      { type: 'offer', label: 'Special Offer', icon: '💰' },
      { type: 'review_reply', label: 'Review Reply', icon: '💬' },
      { type: 'system', label: 'System Update', icon: '⚙️' },
      { type: 'reminder', label: 'Reminder', icon: '⏰' },
    ];
  },
};

export default notificationsService;