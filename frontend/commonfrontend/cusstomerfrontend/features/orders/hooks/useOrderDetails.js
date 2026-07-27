// hooks/useOrderDetails.js

import { useState, useCallback, useEffect } from 'react';
import ordersService from '../services/ordersService';

export const useOrderDetails = (userId, orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tracking, setTracking] = useState(null);

  /**
   * Load order details
   */
  const loadOrder = useCallback(async () => {
    if (!userId || !orderId) return;

    setLoading(true);
    setError(null);

    try {
      const orderData = await ordersService.getOrderById(userId, orderId);
      setOrder(orderData);
      
      // Load tracking info
      const trackingData = await ordersService.trackOrder(userId, orderId);
      setTracking(trackingData);
    } catch (err) {
      setError(err.message || 'Failed to load order details');
      console.error('Failed to load order details:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, orderId]);

  /**
   * Cancel order
   */
  const cancelOrder = useCallback(async (reason = '') => {
    setLoading(true);
    setError(null);

    try {
      const updatedOrder = await ordersService.cancelOrder(userId, orderId, reason);
      setOrder(updatedOrder);
      return updatedOrder;
    } catch (err) {
      setError(err.message || 'Failed to cancel order');
      console.error('Failed to cancel order:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, orderId]);

  /**
   * Reorder
   */
  const reorder = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newOrder = await ordersService.reorder(userId, orderId);
      return newOrder;
    } catch (err) {
      setError(err.message || 'Failed to reorder');
      console.error('Failed to reorder:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, orderId]);

  /**
   * Track order (real-time)
   */
  const trackOrder = useCallback(async () => {
    if (!userId || !orderId) return;

    try {
      const trackingData = await ordersService.trackOrder(userId, orderId);
      setTracking(trackingData);
      return trackingData;
    } catch (err) {
      console.error('Failed to track order:', err);
      return null;
    }
  }, [userId, orderId]);

  /**
   * Get order status
   */
  const getStatus = useCallback(async () => {
    if (!userId || !orderId) return;

    try {
      const status = await ordersService.getOrderStatus(userId, orderId);
      return status;
    } catch (err) {
      console.error('Failed to get order status:', err);
      return null;
    }
  }, [userId, orderId]);

  /**
   * Refresh order
   */
  const refresh = useCallback(() => {
    loadOrder();
  }, [loadOrder]);

  // Load order on mount
  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  // Auto-track every 30 seconds for active orders
  useEffect(() => {
    if (!order || !order.isActive()) return;

    const interval = setInterval(() => {
      trackOrder();
    }, 30000);

    return () => clearInterval(interval);
  }, [order, trackOrder]);

  return {
    order,
    loading,
    error,
    tracking,
    loadOrder,
    cancelOrder,
    reorder,
    trackOrder,
    getStatus,
    refresh,
  };
};

export default useOrderDetails;