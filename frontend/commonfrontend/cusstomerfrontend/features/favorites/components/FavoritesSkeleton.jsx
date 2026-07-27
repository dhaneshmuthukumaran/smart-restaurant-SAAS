// components/FavoritesSkeleton.jsx

import React from 'react';
import styles from '../styles/Favorites.module.css';

const FavoritesSkeleton = ({ count = 6, columns = 3 }) => {
  return (
    <div
      className={styles.skeletonGrid}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {[...Array(count)].map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          {/* Image skeleton */}
          <div className={styles.skeletonImage} />
          
          {/* Content skeleton */}
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonDescription} />
            <div className={styles.skeletonRating} />
            <div className={styles.skeletonFooter} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesSkeleton;