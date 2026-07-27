// components/NotificationSkeleton.jsx

import React from 'react';
import styles from '../styles/Notifications.module.css';

const NotificationSkeleton = ({ count = 5 }) => {
  return (
    <div className={styles.skeletonContainer}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonIcon} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonMessage} />
            <div className={styles.skeletonTime} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;