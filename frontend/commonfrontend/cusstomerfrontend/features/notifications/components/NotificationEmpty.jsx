// components/NotificationEmpty.jsx

import React from 'react';
import styles from '../styles/Notifications.module.css';

const NotificationEmpty = ({
  message = 'No notifications',
  subMessage = 'You\'re all caught up!',
  icon = '🔔',
}) => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h3 className={styles.emptyTitle}>{message}</h3>
      <p className={styles.emptySub}>{subMessage}</p>
    </div>
  );
};

export default NotificationEmpty;