// components/OrderEmpty.jsx

import React from 'react';
import styles from '../styles/Orders.module.css';

const OrderEmpty = ({
  message = 'No orders found',
  subMessage = 'Start ordering from your favorite restaurants!',
  onBrowseClick,
  icon = '📦',
}) => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h3 className={styles.emptyTitle}>{message}</h3>
      <p className={styles.emptySub}>{subMessage}</p>
      {onBrowseClick && (
        <button className={styles.browseButton} onClick={onBrowseClick}>
          Browse Restaurants
        </button>
      )}
    </div>
  );
};

export default OrderEmpty;