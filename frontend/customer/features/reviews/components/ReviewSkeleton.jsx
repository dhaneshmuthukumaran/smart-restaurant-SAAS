// components/ReviewSkeleton.jsx

import React from 'react';
import styles from '../styles/Reviews.module.css';

const ReviewSkeleton = ({ count = 3 }) => {
  return (
    <div className={styles.skeletonContainer}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          {/* Header */}
          <div className={styles.skeletonHeader}>
            <div className={styles.skeletonAvatar} />
            <div className={styles.skeletonUserInfo}>
              <div className={styles.skeletonName} />
              <div className={styles.skeletonDate} />
            </div>
            <div className={styles.skeletonRating} />
          </div>

          {/* Title */}
          <div className={styles.skeletonTitle} />

          {/* Comment */}
          <div className={styles.skeletonComment}>
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLineShort} />
          </div>

          {/* Tags */}
          <div className={styles.skeletonTags}>
            <div className={styles.skeletonTag} />
            <div className={styles.skeletonTag} />
            <div className={styles.skeletonTag} />
          </div>

          {/* Actions */}
          <div className={styles.skeletonActions}>
            <div className={styles.skeletonButton} />
            <div className={styles.skeletonButton} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSkeleton;