// components/NotificationCard.jsx

import React, { useState } from 'react';
import styles from '../styles/Notifications.module.css';

const NotificationCard = ({
  notification,
  onMarkRead,
  onDelete,
  onClick,
  compact = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    id,
    type,
    title,
    message,
    image,
    link,
    isRead,
    getTypeIcon,
    getTypeColor,
    getTimeAgo,
  } = notification;

  const handleClick = () => {
    if (!isRead) {
      onMarkRead?.(id);
    }
    if (link) {
      onClick?.(notification);
    }
  };

  const handleMarkRead = (e) => {
    e.stopPropagation();
    if (!isRead) {
      onMarkRead?.(id);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    await onDelete?.(id);
    setIsDeleting(false);
  };

  return (
    <div
      className={`${styles.notificationCard} ${!isRead ? styles.unread : ''} ${
        isDeleting ? styles.deleting : ''
      }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Icon */}
      <div
        className={styles.notificationIcon}
        style={{ backgroundColor: getTypeColor() + '20', color: getTypeColor() }}
      >
        <span>{getTypeIcon()}</span>
      </div>

      {/* Content */}
      <div className={styles.notificationContent}>
        <div className={styles.notificationHeader}>
          <span className={styles.notificationTitle}>{title}</span>
          {!compact && (
            <span className={styles.notificationTime}>{getTimeAgo()}</span>
          )}
        </div>

        {!compact && <p className={styles.notificationMessage}>{message}</p>}

        {compact && message && (
          <p className={styles.notificationMessageCompact}>{message}</p>
        )}

        {!compact && image && (
          <div className={styles.notificationImage}>
            <img src={image} alt="Notification" loading="lazy" />
          </div>
        )}

        <div className={styles.notificationFooter}>
          {!compact && !isRead && (
            <span className={styles.unreadDot}>●</span>
          )}
          {compact && (
            <span className={styles.notificationTimeCompact}>{getTimeAgo()}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      {(isHovered || !isRead) && !compact && (
        <div className={styles.notificationActions}>
          {!isRead && (
            <button
              className={styles.markReadButton}
              onClick={handleMarkRead}
              aria-label="Mark as read"
            >
              ✓
            </button>
          )}
          <button
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={isDeleting}
            aria-label="Delete notification"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;