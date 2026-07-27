import React from 'react';
import styles from '../styles/Booking.module.css';

export const BookingSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h2>Loading your booking experience…</h2>
      </div>
      <div className={styles.layout}>
        <div className={styles.card}>
          <div style={{ height: 120, borderRadius: 12, background: '#fef3c7' }} />
        </div>
        <div className={styles.card}>
          <div style={{ height: 180, borderRadius: 12, background: '#fef3c7' }} />
        </div>
      </div>
    </div>
  );
};
