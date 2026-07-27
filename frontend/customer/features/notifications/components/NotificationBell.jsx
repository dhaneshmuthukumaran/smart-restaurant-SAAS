// components/NotificationBell.jsx

import React, { useState, useRef, useEffect } from 'react';
import NotificationList from './NotificationList';
import NotificationBadge from './NotificationBadge';
import styles from '../styles/Notifications.module.css';

const NotificationBell = ({
  unreadCount = 0,
  notifications = [],
  loading = false,
  onMarkRead,
  onMarkAllRead,
  onViewAll,
  onNotificationClick,
  onDelete,
  size = 'medium',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sizeMap = {
    small: { container: '2.5rem', icon: '1.2rem' },
    medium: { container: '3rem', icon: '1.5rem' },
    large: { container: '3.5rem', icon: '1.8rem' },
  };

  const currentSize = sizeMap[size] || sizeMap.medium;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleBellClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAllRead = () => {
    onMarkAllRead?.();
  };

  const handleViewAll = () => {
    setIsOpen(false);
    onViewAll?.();
  };

  return (
    <div className={styles.bellContainer} ref={dropdownRef}>
      <button
        className={styles.bellButton}
        onClick={handleBellClick}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
        style={{
          width: currentSize.container,
          height: currentSize.container,
          fontSize: currentSize.icon,
        }}
      >
        🔔
        {unreadCount > 0 && (
          <NotificationBadge count={unreadCount} />
        )}
      </button>

      {isOpen && (
        <div className={styles.bellDropdown}>
          <div className={styles.dropdownHeader}>
            <span className={styles.dropdownTitle}>
              Notifications
              {unreadCount > 0 && (
                <span className={styles.unreadBadge}>
                  {unreadCount} unread
                </span>
              )}
            </span>
            <div className={styles.dropdownActions}>
              {unreadCount > 0 && (
                <button
                  className={styles.markAllReadButton}
                  onClick={handleMarkAllRead}
                >
                  Mark all read
                </button>
              )}
              <button
                className={styles.viewAllButton}
                onClick={handleViewAll}
              >
                View all
              </button>
            </div>
          </div>

          <div className={styles.dropdownContent}>
            <NotificationList
              notifications={notifications}
              loading={loading}
              onMarkRead={onMarkRead}
              onDelete={onDelete}
              onNotificationClick={onNotificationClick}
              compact={true}
              limit={5}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;