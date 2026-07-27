// components/RatingSummary.jsx

import React from 'react';
import RatingStars from './RatingStars';
import styles from '../styles/Reviews.module.css';

const RatingSummary = ({
  summary,
  entityName = '',
  entityType = 'restaurant',
}) => {
  if (!summary || summary.total === 0) {
    return (
      <div className={styles.ratingSummary}>
        <div className={styles.noRatings}>
          <span className={styles.noRatingsIcon}>⭐</span>
          <h3>No Ratings Yet</h3>
          <p>Be the first to review {entityName || 'this place'}!</p>
        </div>
      </div>
    );
  }

  const { average, total, distribution, categoryRatings } = summary;

  const ratingLevels = [
    { stars: 5, label: 'Excellent' },
    { stars: 4, label: 'Good' },
    { stars: 3, label: 'Average' },
    { stars: 2, label: 'Poor' },
    { stars: 1, label: 'Terrible' },
  ];

  const categoryLabels = {
    food: '🍽️ Food',
    ambiance: '🪑 Ambiance',
    service: '👨‍🍳 Service',
    hygiene: '🧼 Hygiene',
  };

  return (
    <div className={styles.ratingSummary}>
      <div className={styles.summaryMain}>
        {/* Average Rating */}
        <div className={styles.averageRating}>
          <span className={styles.averageValue}>{average.toFixed(1)}</span>
          <RatingStars rating={Math.round(average)} size="large" readonly />
          <span className={styles.totalReviews}>
            Based on {total} {total === 1 ? 'review' : 'reviews'}
          </span>
        </div>

        {/* Distribution Bars */}
        <div className={styles.distributionBars}>
          {ratingLevels.map(({ stars, label }) => {
            const count = distribution[stars] || 0;
            const percentage = (count / total) * 100;
            return (
              <div key={stars} className={styles.distributionRow}>
                <span className={styles.distributionLabel}>
                  {stars} ⭐
                </span>
                <div className={styles.distributionBar}>
                  <div
                    className={styles.distributionFill}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className={styles.distributionCount}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Ratings */}
      {categoryRatings && (
        <div className={styles.categoryRatings}>
          <h4 className={styles.categoryTitle}>Category Ratings</h4>
          <div className={styles.categoryGrid}>
            {Object.entries(categoryRatings).map(([key, value]) => (
              <div key={key} className={styles.categoryItem}>
                <span className={styles.categoryLabel}>
                  {categoryLabels[key] || key}
                </span>
                <div className={styles.categoryRating}>
                  <RatingStars rating={Math.round(value)} size="small" readonly />
                  <span className={styles.categoryValue}>{value.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingSummary;