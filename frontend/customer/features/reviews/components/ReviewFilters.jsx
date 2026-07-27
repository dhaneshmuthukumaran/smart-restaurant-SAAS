// components/ReviewFilters.jsx

import React, { useState } from 'react';
import RatingStars from './RatingStars';
import styles from '../styles/Reviews.module.css';

const ReviewFilters = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest_rating', label: 'Highest Rating' },
    { value: 'lowest_rating', label: 'Lowest Rating' },
    { value: 'most_helpful', label: 'Most Helpful' },
  ];

  const handleRatingFilter = (rating) => {
    onFilterChange?.({ rating: rating === filters.rating ? 0 : rating });
  };

  return (
    <div className={styles.filtersContainer}>
      <button
        className={styles.filtersToggle}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>🔍 Filter Reviews</span>
        {filters.hasActiveFilters?.() && (
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
          {/* Rating Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Rating</label>
            <div className={styles.ratingFilter}>
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  className={`${styles.ratingFilterButton} ${
                    filters.rating === star ? styles.active : ''
                  }`}
                  onClick={() => handleRatingFilter(star)}
                >
                  {star} ⭐
                </button>
              ))}
              {filters.rating > 0 && (
                <button
                  className={styles.clearRatingButton}
                  onClick={() => onFilterChange?.({ rating: 0 })}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Sort By */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Sort By</label>
            <select
              className={styles.filterSelect}
              value={filters.sortBy || 'newest'}
              onChange={(e) => onFilterChange?.({ sortBy: e.target.value })}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Has Images */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filters</label>
            <div className={styles.toggleGroup}>
              <button
                className={`${styles.toggleButton} ${
                  filters.hasImages ? styles.active : ''
                }`}
                onClick={() => onFilterChange?.({ hasImages: !filters.hasImages })}
              >
                📷 Has Photos
              </button>
              <button
                className={`${styles.toggleButton} ${
                  filters.hasResponse ? styles.active : ''
                }`}
                onClick={() => onFilterChange?.({ hasResponse: !filters.hasResponse })}
              >
                💬 Has Response
              </button>
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

export default ReviewFilters;