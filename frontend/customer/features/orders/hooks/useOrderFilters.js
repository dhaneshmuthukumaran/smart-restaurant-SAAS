// hooks/useOrderFilters.js

import { useState, useCallback, useMemo } from 'react';
import { OrderFilters, SortOptions } from '../types/orders.types';

export const useOrderFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState(new OrderFilters(initialFilters));

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  /**
   * Reset filters
   */
  const resetFilters = useCallback(() => {
    setFilters(new OrderFilters());
  }, []);

  /**
   * Set status filter
   */
  const setStatusFilter = useCallback((status) => {
    setFilters((prev) => ({ ...prev, status }));
  }, []);

  /**
   * Set date range filter
   */
  const setDateRange = useCallback((start, end) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { start, end },
    }));
  }, []);

  /**
   * Set restaurant filter
   */
  const setRestaurantFilter = useCallback((restaurantId) => {
    setFilters((prev) => ({ ...prev, restaurantId }));
  }, []);

  /**
   * Set sort option
   */
  const setSort = useCallback((sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  /**
   * Set search term
   */
  const setSearch = useCallback((search) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  /**
   * Clear date range
   */
  const clearDateRange = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { start: '', end: '' },
    }));
  }, []);

  /**
   * Clear search
   */
  const clearSearch = useCallback(() => {
    setFilters((prev) => ({ ...prev, search: '' }));
  }, []);

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = useMemo(() => {
    return filters.hasActiveFilters();
  }, [filters]);

  /**
   * Get active filter count
   */
  const activeFilterCount = useMemo(() => {
    return filters.getActiveFilterCount();
  }, [filters]);

  /**
   * Get available status options
   */
  const statusOptions = useMemo(() => {
    return [
      { value: 'all', label: 'All Orders' },
      { value: 'pending', label: 'Pending' },
      { value: 'confirmed', label: 'Confirmed' },
      { value: 'preparing', label: 'Preparing' },
      { value: 'ready', label: 'Ready' },
      { value: 'out_for_delivery', label: 'Out for Delivery' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'cancelled', label: 'Cancelled' },
    ];
  }, []);

  /**
   * Get sort options
   */
  const sortOptions = useMemo(() => {
    return [
      { value: SortOptions.NEWEST, label: 'Newest First' },
      { value: SortOptions.OLDEST, label: 'Oldest First' },
      { value: SortOptions.HIGHEST_TOTAL, label: 'Highest Total' },
      { value: SortOptions.LOWEST_TOTAL, label: 'Lowest Total' },
    ];
  }, []);

  return {
    filters,
    hasActiveFilters,
    activeFilterCount,
    statusOptions,
    sortOptions,
    updateFilters,
    resetFilters,
    setStatusFilter,
    setDateRange,
    setRestaurantFilter,
    setSort,
    setSearch,
    clearDateRange,
    clearSearch,
  };
};

export default useOrderFilters;