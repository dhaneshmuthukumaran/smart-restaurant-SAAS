// components/CartSkeleton.jsx

import React from 'react';
import styles from '../styles/Cart.module.css';

const CartSkeleton = ({ count = 3 }) => {
  return (
    <div className={styles.skeletonContainer}>
      {/* Header skeleton */}
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonBadge} />
      </div>

      {/* Items skeleton */}
      {[...Array(count)].map((_, index) => (
        <div key={index} className={styles.skeletonItem}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonName} />
            <div className={styles.skeletonDescription} />
            <div className={styles.skeletonControls}>
              <div className={styles.skeletonQuantity} />
              <div className={styles.skeletonPrice} />
            </div>
          </div>
        </div>
      ))}

      {/* Summary skeleton */}
      <div className={styles.skeletonSummary}>
        <div className={styles.skeletonTotal} />
        <div className={styles.skeletonButton} />
      </div>
    </div>
  );
};

export default CartSkeleton;