// components/OrderFilters.jsx

import React, { useState } from 'react';
import styles from '../styles/Orders.module.css';

const OrderFilters = ({
  filters,
  onFilterChange,
  onReset,
  statusOptions = [],
  sortOptions = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultStatusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const defaultSortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest_total', label: 'Highest Total' },
    { value: 'lowest_total', label: 'Lowest Total' },
  ];

  const statusOpts = statusOptions.length > 0 ? statusOptions : defaultStatusOptions;
  const sortOpts = sortOptions.length > 0 ? sortOptions : defaultSortOptions;

  return (
    <div className={styles.filtersContainer}>
      {/* Toggle button */}
      <button
        className={styles.filtersToggle}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>🔍 Filters</span>
        {filters.hasActiveFilters && (
          <span className={styles.filterBadge}>
            {filters.getActiveFilterCount?.() || 0}
          </span>
        )}
        <span className={styles.toggleArrow}>
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>

      {isExpanded && (
        <div className={styles.filtersContent}>
          {/* Status filter */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Status</label>
            <select
              className={styles.filterSelect}
              value={filters.status || 'all'}
              onChange={(e) => onFilterChange?.({ status: e.target.value })}
            >
              {statusOpts.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Search</label>
            <input
              type="text"
              className={styles.filterInput}
              placeholder="Order # or restaurant..."
              value={filters.search || ''}
              onChange={(e) => onFilterChange?.({ search: e.target.value })}
            />
          </div>

          {/* Sort */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Sort By</label>
            <select
              className={styles.filterSelect}
              value={filters.sortBy || 'newest'}
              onChange={(e) => onFilterChange?.({ sortBy: e.target.value })}
            >
              {sortOpts.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Date Range</label>
            <div className={styles.dateRange}>
              <input
                type="date"
                className={styles.filterInput}
                value={filters.dateRange?.start || ''}
                onChange={(e) =>
                  onFilterChange?.({
                    dateRange: {
                      ...filters.dateRange,
                      start: e.target.value,
                    },
                  })
                }
              />
              <span className={styles.dateSeparator}>to</span>
              <input
                type="date"
                className={styles.filterInput}
                value={filters.dateRange?.end || ''}
                onChange={(e) =>
                  onFilterChange?.({
                    dateRange: {
                      ...filters.dateRange,
                      end: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Actions */}
          <div className={styles.filterActions}>
            <button
              className={styles.applyFiltersButton}
              onClick={() => setIsExpanded(false)}
            >
              Apply Filters
            </button>
            {filters.hasActiveFilters?.() && (
              <button
                className={styles.resetFiltersButton}
                onClick={onReset}
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;