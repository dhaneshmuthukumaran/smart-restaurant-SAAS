// components/NotificationBadge.jsx

import React from 'react';
import styles from '../styles/Notifications.module.css';

const NotificationBadge = ({
  count = 0,
  max = 99,
  className = '',
  pulse = true,
}) => {
  if (count === 0) return null;

  const displayCount = count > max ? `${max}+` : count;

  return (
    <span
      className={`${styles.badge} ${pulse ? styles.pulse : ''} ${className}`}
      aria-label={`${count} unread notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;