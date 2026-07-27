// types/notifications.types.js

export const notificationsTypes = {};

/**
 * @typedef {Object} Notification
 * @property {number|string} id - Notification ID
 * @property {string} userId - User ID
 * @property {string} type - Notification type
 * @property {string} title - Notification title
 * @property {string} message - Notification message
 * @property {string} image - Image URL (optional)
 * @property {string} link - Link to navigate (optional)
 * @property {boolean} isRead - Read status
 * @property {Object} data - Custom data payload
 * @property {string} priority - 'high' | 'medium' | 'low'
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 * @property {Date} expiresAt - Expiration timestamp (optional)
 */

/**
 * @typedef {Object} NotificationType
 * @property {string} type - Type key
 * @property {string} label - Display label
 * @property {string} icon - Icon
 * @property {string} color - Color
 */

/**
 * @typedef {Object} NotificationPreferences
 * @property {Object} channels - Channel preferences
 * @property {boolean} channels.email - Email notifications
 * @property {boolean} channels.push - Push notifications
 * @property {boolean} channels.sms - SMS notifications
 * @property {Object} categories - Category preferences
 * @property {boolean} categories.orderUpdates - Order updates
 * @property {boolean} categories.promotions - Promotions and offers
 * @property {boolean} categories.reviews - Review replies
 * @property {boolean} categories.reminders - Reminders
 * @property {Object} quietHours - Quiet hours settings
 * @property {string} quietHours.start - Start time (HH:MM)
 * @property {string} quietHours.end - End time (HH:MM)
 * @property {boolean} quietHours.enabled - Quiet hours enabled
 */

/**
 * @typedef {Object} NotificationState
 * @property {Array<Notification>} notifications - List of notifications
 * @property {number} unreadCount - Unread count
 * @property {boolean} loading - Loading state
 * @property {string|null} error - Error message
 * @property {NotificationPreferences} preferences - User preferences
 */

export const NotificationTypes = {
  ORDER_PLACED: 'order_placed',
  ORDER_CONFIRMED: 'order_confirmed',
  ORDER_PREPARING: 'order_preparing',
  ORDER_READY: 'order_ready',
  ORDER_OUT_FOR_DELIVERY: 'order_out_for_delivery',
  ORDER_DELIVERED: 'order_delivered',
  ORDER_CANCELLED: 'order_cancelled',
  PROMOTION: 'promotion',
  OFFER: 'offer',
  REVIEW_REPLY: 'review_reply',
  SYSTEM: 'system',
  REMINDER: 'reminder',
  FAVORITE_UPDATE: 'favorite_update',
};

export const NotificationTypeLabels = {
  [NotificationTypes.ORDER_PLACED]: 'Order Placed',
  [NotificationTypes.ORDER_CONFIRMED]: 'Order Confirmed',
  [NotificationTypes.ORDER_PREPARING]: 'Preparing Order',
  [NotificationTypes.ORDER_READY]: 'Order Ready',
  [NotificationTypes.ORDER_OUT_FOR_DELIVERY]: 'Out for Delivery',
  [NotificationTypes.ORDER_DELIVERED]: 'Order Delivered',
  [NotificationTypes.ORDER_CANCELLED]: 'Order Cancelled',
  [NotificationTypes.PROMOTION]: 'Promotion',
  [NotificationTypes.OFFER]: 'Special Offer',
  [NotificationTypes.REVIEW_REPLY]: 'Review Reply',
  [NotificationTypes.SYSTEM]: 'System Update',
  [NotificationTypes.REMINDER]: 'Reminder',
  [NotificationTypes.FAVORITE_UPDATE]: 'Favorite Update',
};

export const NotificationTypeIcons = {
  [NotificationTypes.ORDER_PLACED]: '📋',
  [NotificationTypes.ORDER_CONFIRMED]: '✅',
  [NotificationTypes.ORDER_PREPARING]: '👨‍🍳',
  [NotificationTypes.ORDER_READY]: '📦',
  [NotificationTypes.ORDER_OUT_FOR_DELIVERY]: '🚚',
  [NotificationTypes.ORDER_DELIVERED]: '🏠',
  [NotificationTypes.ORDER_CANCELLED]: '❌',
  [NotificationTypes.PROMOTION]: '🎉',
  [NotificationTypes.OFFER]: '💰',
  [NotificationTypes.REVIEW_REPLY]: '💬',
  [NotificationTypes.SYSTEM]: '⚙️',
  [NotificationTypes.REMINDER]: '⏰',
  [NotificationTypes.FAVORITE_UPDATE]: '❤️',
};

export const NotificationTypeColors = {
  [NotificationTypes.ORDER_PLACED]: '#3498db',
  [NotificationTypes.ORDER_CONFIRMED]: '#2ecc71',
  [NotificationTypes.ORDER_PREPARING]: '#9b59b6',
  [NotificationTypes.ORDER_READY]: '#2ecc71',
  [NotificationTypes.ORDER_OUT_FOR_DELIVERY]: '#e67e22',
  [NotificationTypes.ORDER_DELIVERED]: '#27ae60',
  [NotificationTypes.ORDER_CANCELLED]: '#e74c3c',
  [NotificationTypes.PROMOTION]: '#f1c40f',
  [NotificationTypes.OFFER]: '#f39c12',
  [NotificationTypes.REVIEW_REPLY]: '#3498db',
  [NotificationTypes.SYSTEM]: '#95a5a6',
  [NotificationTypes.REMINDER]: '#e67e22',
  [NotificationTypes.FAVORITE_UPDATE]: '#e74c3c',
};

export const NotificationPriorities = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
};

export class Notification {
  constructor(data) {
    this.id = data.id || '';
    this.userId = data.userId || '';
    this.type = data.type || NotificationTypes.SYSTEM;
    this.title = data.title || '';
    this.message = data.message || '';
    this.image = data.image || '';
    this.link = data.link || '';
    this.isRead = data.isRead || false;
    this.data = data.data || {};
    this.priority = data.priority || NotificationPriorities.MEDIUM;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
    this.expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;
  }

  getTypeLabel() {
    return NotificationTypeLabels[this.type] || this.type;
  }

  getTypeIcon() {
    return NotificationTypeIcons[this.type] || '📢';
  }

  getTypeColor() {
    return NotificationTypeColors[this.type] || '#95a5a6';
  }

  getTimeAgo() {
    const diff = Date.now() - this.createdAt.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }

  markAsRead() {
    this.isRead = true;
    this.updatedAt = new Date();
  }

  isUnread() {
    return !this.isRead;
  }

  isExpired() {
    if (!this.expiresAt) return false;
    return new Date() > this.expiresAt;
  }

  isHighPriority() {
    return this.priority === NotificationPriorities.HIGH;
  }
}

export class NotificationPreferences {
  constructor(data = {}) {
    this.channels = {
      email: data.channels?.email !== undefined ? data.channels.email : true,
      push: data.channels?.push !== undefined ? data.channels.push : true,
      sms: data.channels?.sms !== undefined ? data.channels.sms : false,
    };
    this.categories = {
      orderUpdates: data.categories?.orderUpdates !== undefined ? data.categories.orderUpdates : true,
      promotions: data.categories?.promotions !== undefined ? data.categories.promotions : true,
      reviews: data.categories?.reviews !== undefined ? data.categories.reviews : true,
      reminders: data.categories?.reminders !== undefined ? data.categories.reminders : true,
    };
    this.quietHours = {
      start: data.quietHours?.start || '22:00',
      end: data.quietHours?.end || '08:00',
      enabled: data.quietHours?.enabled || false,
    };
  }

  isChannelEnabled(channel) {
    return this.channels[channel] || false;
  }

  isCategoryEnabled(category) {
    return this.categories[category] || false;
  }

  isInQuietHours() {
    if (!this.quietHours.enabled) return false;
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const startTime = this.quietHours.start.split(':').map(Number);
    const endTime = this.quietHours.end.split(':').map(Number);
    const startMinutes = startTime[0] * 60 + startTime[1];
    const endMinutes = endTime[0] * 60 + endTime[1];

    if (startMinutes < endMinutes) {
      return currentTime >= startMinutes && currentTime < endMinutes;
    } else {
      return currentTime >= startMinutes || currentTime < endMinutes;
    }
  }
}

export class NotificationFilters {
  constructor(data = {}) {
    this.type = data.type || 'all';
    this.isRead = data.isRead !== undefined ? data.isRead : null;
    this.dateRange = data.dateRange || {
      start: '',
      end: '',
    };
    this.priority = data.priority || 'all';
  }

  hasActiveFilters() {
    return !!(
      this.type !== 'all' ||
      this.isRead !== null ||
      this.dateRange.start ||
      this.dateRange.end ||
      this.priority !== 'all'
    );
  }

  reset() {
    this.type = 'all';
    this.isRead = null;
    this.dateRange = { start: '', end: '' };
    this.priority = 'all';
  }
}