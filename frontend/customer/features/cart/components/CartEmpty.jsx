// components/CartEmpty.jsx

import React from 'react';
import styles from '../styles/Cart.module.css';

const CartEmpty = ({
  message = 'Your cart is empty',
  subMessage = 'Start adding delicious items from our menu!',
  onBrowseClick,
  icon = '🛒',
}) => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h3 className={styles.emptyTitle}>{message}</h3>
      <p className={styles.emptySub}>{subMessage}</p>
      {onBrowseClick && (
        <button className={styles.browseButton} onClick={onBrowseClick}>
          Browse Menu
        </button>
      )}
    </div>
  );
};

export default CartEmpty;