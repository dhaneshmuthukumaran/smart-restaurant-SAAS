// components/CartIcon.jsx

import React from 'react';
import styles from '../styles/Cart.module.css';

const CartIcon = ({
  itemCount = 0,
  onClick,
  size = 'medium',
  className = '',
  isOpen = false,
}) => {
  const sizeMap = {
    small: {
      container: '2.5rem',
      icon: '1.2rem',
      badge: '0.8rem',
    },
    medium: {
      container: '3rem',
      icon: '1.5rem',
      badge: '1rem',
    },
    large: {
      container: '3.5rem',
      icon: '1.8rem',
      badge: '1.2rem',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.medium;

  return (
    <button
      className={`${styles.cartIconContainer} ${className} ${isOpen ? styles.active : ''}`}
      onClick={onClick}
      aria-label={`Cart ${itemCount} items`}
      style={{
        width: currentSize.container,
        height: currentSize.container,
      }}
    >
      <span className={styles.cartIcon} style={{ fontSize: currentSize.icon }}>
        🛒
      </span>
      {itemCount > 0 && (
        <span
          className={styles.cartBadge}
          style={{
            fontSize: currentSize.badge,
            minWidth: currentSize.badge,
            height: currentSize.badge,
          }}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;