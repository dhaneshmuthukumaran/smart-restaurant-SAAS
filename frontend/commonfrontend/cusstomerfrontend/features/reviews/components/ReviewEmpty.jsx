// components/ReviewEmpty.jsx

import React from 'react';
import styles from '../styles/Reviews.module.css';

const ReviewEmpty = ({
  message = 'No reviews yet',
  subMessage = 'Be the first to share your experience!',
  onWriteReview,
  icon = '📝',
}) => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h3 className={styles.emptyTitle}>{message}</h3>
      <p className={styles.emptySub}>{subMessage}</p>
      {onWriteReview && (
        <button className={styles.writeReviewButton} onClick={onWriteReview}>
          Write a Review
        </button>
      )}
    </div>
  );
};

export default ReviewEmpty;