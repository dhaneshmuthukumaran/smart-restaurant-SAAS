// hooks/useNotifications.js

import { useState, useEffect, useCallback } from 'react';
import notificationsService from '../services/notificationsService';
import useNotificationSocket from './useNotificationSocket';
import { Notification } from '../types/notifications.types';

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });
  const [filters, setFilters] = useState({
    type: 'all',
    isRead: null,
    priority: 'all',
    dateRange: { start: '', end: '' },
  });

  // WebSocket for real-time updates
  const { isConnected, lastMessage, connect, disconnect } = useNotificationSocket(userId);

  /**
   * Fetch notifications
   */
  const fetchNotifications = useCallback(async () => {
    if (!userId) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = {
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      };

      const response = await notificationsService.getNotifications(userId, params);
      setNotifications(response.notifications);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        pages: response.pages,
      });

      // Get unread count
      const count = await notificationsService.getUnreadCount(userId);
      setUnreadCount(count);
    } catch (err) {
      setError(err.message || 'Failed to load notifications');
      console.error('Failed to load notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, filters, pagination.page, pagination.limit]);

  /**
   * Mark notification as read
   */
  const markAsRead = useCallback(async (notificationId) => {
    try {
      await notificationsService.markAsRead(userId, notificationId);
      
      // Update local state
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      setError(err.message || 'Failed to mark as read');
      console.error('Failed to mark as read:', err);
    }
  }, [userId]);

  /**
   * Mark all as read
   */
  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsService.markAllAsRead(userId);
      
      // Update local state
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      setError(err.message || 'Failed to mark all as read');
      console.error('Failed to mark all as read:', err);
    }
  }, [userId]);

  /**
   * Delete notification
   */
  const deleteNotification = useCallback(async (notificationId) => {
    try {
      await notificationsService.deleteNotification(userId, notificationId);
      
      // Update local state
      const removed = notifications.find((n) => n.id === notificationId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      if (removed && !removed.isRead) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      setError(err.message || 'Failed to delete notification');
      console.error('Failed to delete notification:', err);
    }
  }, [userId, notifications]);

  /**
   * Delete all notifications
   */
  const deleteAllNotifications = useCallback(async () => {
    try {
      await notificationsService.deleteAllNotifications(userId);
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      setError(err.message || 'Failed to delete all notifications');
      console.error('Failed to delete all notifications:', err);
    }
  }, [userId]);

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  /**
   * Reset filters
   */
  const resetFilters = useCallback(() => {
    setFilters({
      type: 'all',
      isRead: null,
      priority: 'all',
      dateRange: { start: '', end: '' },
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  /**
   * Change page
   */
  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  /**
   * Refetch notifications
   */
  const refetch = useCallback(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  /**
   * Get unread notifications
   */
  const getUnreadNotifications = useCallback(() => {
    return notifications.filter((n) => !n.isRead);
  }, [notifications]);

  /**
   * Get notifications by type
   */
  const getByType = useCallback((type) => {
    return notifications.filter((n) => n.type === type);
  }, [notifications]);

  /**
   * Handle new notification from WebSocket
   */
  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage);
        if (data.type === 'new_notification') {
          // Add new notification to list
          const newNotification = new Notification(data.notification);
          setNotifications((prev) => [newNotification, ...prev]);
          setUnreadCount((prev) => prev + 1);
          
          // Show toast or alert for high priority
          if (newNotification.isHighPriority()) {
            // You can integrate with a toast system here
            console.log('🔔 High priority notification:', newNotification.title);
          }
        }
      } catch (err) {
        console.error('Failed to parse notification message:', err);
      }
    }
  }, [lastMessage]);

  // Connect to WebSocket on mount
  useEffect(() => {
    if (userId) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [userId, connect, disconnect]);

  // Load notifications on mount and when dependencies change
  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId, fetchNotifications]);

  return {
    // State
    notifications,
    unreadCount,
    loading,
    error,
    pagination,
    filters,
    isConnected,

    // Actions
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    updateFilters,
    resetFilters,
    changePage,
    refetch,

    // Utilities
    getUnreadNotifications,
    getByType,
  };
};

export default useNotifications;