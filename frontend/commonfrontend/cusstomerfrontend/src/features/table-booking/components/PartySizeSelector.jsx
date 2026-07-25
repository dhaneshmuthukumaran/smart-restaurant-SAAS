import React from 'react';
import styles from '../styles/Booking.module.css';

const sizes = [2, 4, 6, 8];

export const PartySizeSelector = ({ partySize, onSelectSize }) => {
  return (
    <div>
      <h3>Party size</h3>
      <div className={styles.sizeGroup}>
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={`${styles.sizeButton} ${partySize === size ? styles.sizeButtonActive : ''}`}
            onClick={() => onSelectSize(size)}
          >
            {size} guests
          </button>
        ))}
      </div>
    </div>
  );
};
