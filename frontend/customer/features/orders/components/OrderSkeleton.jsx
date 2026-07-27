// components/OrderSkeleton.jsx

import React from 'react';
import styles from '../styles/Orders.module.css';

const OrderSkeleton = ({ count = 3 }) => {
  return (
    <div className={styles.skeletonContainer}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          {/* Header */}
          <div className={styles.skeletonHeader}>
            <div className={styles.skeletonNumber} />
            <div className={styles.skeletonStatus} />
          </div>

          {/* Restaurant */}
          <div className={styles.skeletonRestaurant} />

          {/* Items */}
          <div className={styles.skeletonItems}>
            <div className={styles.skeletonItem} />
            <div className={styles.skeletonItem} />
          </div>

          {/* Footer */}
          <div className={styles.skeletonFooter}>
            <div className={styles.skeletonTotal} />
            <div className={styles.skeletonActions} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSkeleton;