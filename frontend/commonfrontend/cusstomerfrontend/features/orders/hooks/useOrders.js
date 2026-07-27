// hooks/useOrders.js

import { useState, useEffect, useCallback } from 'react';
import ordersService from '../services/ordersService';
import { OrderFilters } from '../types/orders.types';

export const useOrders = (userId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(new OrderFilters());
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [stats, setStats] = useState(null);

  /**
   * Fetch orders with current filters
   */
  const fetchOrders = useCallback(async () => {
    if (!userId) {
      setOrders([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = {
        status: filters.status !== 'all' ? filters.status : undefined,
        dateRange: filters.dateRange,
        restaurantId: filters.restaurantId || undefined,
        sortBy: filters.sortBy,
        search: filters.search || undefined,
        page: pagination.page,
        limit: pagination.limit,
      };

      const response = await ordersService.getOrders(userId, params);
      
      setOrders(response.orders);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        pages: response.pages,
      });
    } catch (err) {
      setError(err.message || 'Failed to load orders');
      console.error('Failed to load orders:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, filters, pagination.page, pagination.limit]);

  /**
   * Get order statistics
   */
  const fetchStats = useCallback(async () => {
    if (!userId) return;

    try {
      const statsData = await ordersService.getOrderStats(userId);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load order stats:', err);
    }
  }, [userId]);

  /**
   * Get single order
   */
  const getOrder = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);

    try {
      const order = await ordersService.getOrderById(userId, orderId);
      return order;
    } catch (err) {
      setError(err.message || 'Failed to load order');
      console.error('Failed to load order:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Cancel order
   */
  const cancelOrder = useCallback(async (orderId, reason = '') => {
    setLoading(true);
    setError(null);

    try {
      const order = await ordersService.cancelOrder(userId, orderId, reason);
      
      // Update orders list
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? order : o))
      );
      
      // Refresh stats
      await fetchStats();
      
      return order;
    } catch (err) {
      setError(err.message || 'Failed to cancel order');
      console.error('Failed to cancel order:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, fetchStats]);

  /**
   * Reorder from past order
   */
  const reorder = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);

    try {
      const order = await ordersService.reorder(userId, orderId);
      
      // Refresh orders
      await fetchOrders();
      await fetchStats();
      
      return order;
    } catch (err) {
      setError(err.message || 'Failed to reorder');
      console.error('Failed to reorder:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, fetchOrders, fetchStats]);

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  /**
   * Reset filters
   */
  const resetFilters = useCallback(() => {
    setFilters(new OrderFilters());
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  /**
   * Change page
   */
  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  /**
   * Change limit
   */
  const changeLimit = useCallback((limit) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  /**
   * Refetch orders
   */
  const refetch = useCallback(() => {
    fetchOrders();
    fetchStats();
  }, [fetchOrders, fetchStats]);

  /**
   * Get active orders
   */
  const getActiveOrders = useCallback(() => {
    return orders.filter((order) => order.isActive());
  }, [orders]);

  /**
   * Get delivered orders
   */
  const getDeliveredOrders = useCallback(() => {
    return orders.filter((order) => order.isDelivered());
  }, [orders]);

  /**
   * Get cancelled orders
   */
  const getCancelledOrders = useCallback(() => {
    return orders.filter((order) => order.isCancelled());
  }, [orders]);

  // Load orders and stats on mount
  useEffect(() => {
    if (userId) {
      fetchOrders();
      fetchStats();
    }
  }, [userId, fetchOrders, fetchStats]);

  return {
    // State
    orders,
    loading,
    error,
    filters,
    pagination,
    stats,
    
    // Derived
    activeOrders: getActiveOrders(),
    deliveredOrders: getDeliveredOrders(),
    cancelledOrders: getCancelledOrders(),
    
    // Actions
    fetchOrders,
    fetchStats,
    getOrder,
    cancelOrder,
    reorder,
    updateFilters,
    resetFilters,
    changePage,
    changeLimit,
    refetch,
  };
};

export default useOrders;