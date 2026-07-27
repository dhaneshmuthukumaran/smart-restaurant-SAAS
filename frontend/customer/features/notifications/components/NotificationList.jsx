// components/NotificationList.jsx

import React from 'react';
import NotificationCard from './NotificationCard';
import NotificationEmpty from './NotificationEmpty';
import NotificationSkeleton from './NotificationSkeleton';
import styles from '../styles/Notifications.module.css';

const NotificationList = ({
  notifications = [],
  loading = false,
  pagination,
  onPageChange,
  onMarkRead,
  onDelete,
  onNotificationClick,
  compact = false,
  limit = 20,
}) => {
  // Loading state
  if (loading) {
    return <NotificationSkeleton count={compact ? 3 : 5} />;
  }

  // Empty state
  if (notifications.length === 0) {
    return (
      <NotificationEmpty
        message="No notifications"
        subMessage="You're all caught up!"
      />
    );
  }

  const displayNotifications = compact ? notifications.slice(0, limit) : notifications;

  return (
    <div className={styles.notificationList}>
      {displayNotifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onMarkRead={onMarkRead}
          onDelete={onDelete}
          onClick={onNotificationClick}
          compact={compact}
        />
      ))}

      {/* Pagination */}
      {!compact && pagination && pagination.pages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange?.(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange?.(pagination.page + 1)}
            disabled={pagination.page >= pagination.pages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationList;