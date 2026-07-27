// components/OrderStatusTracker.jsx

import React from 'react';
import styles from '../styles/Orders.module.css';
import { OrderStatus, OrderStatusLabels, OrderStatusIcons } from '../types/orders.types';

const OrderStatusTracker = ({ order, showTimestamps = true }) => {
  const timeline = order.getTimeline();

  return (
    <div className={styles.trackerContainer}>
      <div className={styles.trackerLine}>
        {timeline.map((item, index) => (
          <div
            key={item.status}
            className={`${styles.trackerStep} ${
              item.isCompleted ? styles.completed : ''
            } ${item.isCurrent ? styles.current : ''}`}
          >
            {/* Connector line */}
            {index < timeline.length - 1 && (
              <div
                className={`${styles.trackerConnector} ${
                  item.isCompleted ? styles.completed : ''
                }`}
              />
            )}

            {/* Step content */}
            <div className={styles.trackerContent}>
              <div className={styles.trackerIcon}>
                {item.isCompleted ? '✓' : item.icon}
              </div>
              <div className={styles.trackerInfo}>
                <span className={styles.trackerLabel}>{item.label}</span>
                {showTimestamps && item.timestamp && (
                  <span className={styles.trackerTime}>
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
                {item.isCurrent && (
                  <span className={styles.trackerBadge}>Current</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className={styles.trackerProgress}>
        <div
          className={styles.trackerProgressFill}
          style={{ width: getProgressPercentage(timeline) + '%' }}
        />
      </div>
    </div>
  );
};

/**
 * Calculate progress percentage
 */
function getProgressPercentage(timeline) {
  const completed = timeline.filter((item) => item.isCompleted).length;
  return Math.round((completed / timeline.length) * 100);
}

export default OrderStatusTracker;