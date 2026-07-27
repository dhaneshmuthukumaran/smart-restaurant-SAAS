// components/RatingStars.jsx

import React, { useState } from 'react';
import styles from '../styles/Reviews.module.css';

const RatingStars = ({
  rating = 0,
  onRatingChange,
  size = 'medium',
  readonly = false,
  showCount = false,
  totalReviews = 0,
  className = '',
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeMap = {
    small: { star: '1.2rem', gap: '0.15rem' },
    medium: { star: '1.5rem', gap: '0.2rem' },
    large: { star: '2rem', gap: '0.3rem' },
    xlarge: { star: '2.5rem', gap: '0.4rem' },
  };

  const currentSize = sizeMap[size] || sizeMap.medium;

  const handleStarClick = (starValue) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starValue === rating ? 0 : starValue);
    }
  };

  const handleStarHover = (starValue) => {
    if (!readonly) {
      setHoverRating(starValue);
    }
  };

  const handleStarLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={`${styles.ratingStars} ${className}`}>
      <div 
        className={styles.starsContainer}
        style={{ gap: currentSize.gap }}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={styles.starButton}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}
            disabled={readonly}
            aria-label={`Rate ${star} stars`}
            style={{
              fontSize: currentSize.star,
            }}
          >
            <span className={displayRating >= star ? styles.starFilled : styles.starEmpty}>
              {displayRating >= star ? '⭐' : '☆'}
            </span>
          </button>
        ))}
      </div>
      {showCount && totalReviews > 0 && (
        <span className={styles.reviewCount}>
          ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};

export default RatingStars;