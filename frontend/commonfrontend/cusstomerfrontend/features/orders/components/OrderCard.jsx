// components/OrderCard.jsx

import React from 'react';
import styles from '../styles/Orders.module.css';

const OrderCard = ({ order, onView, onCancel, onReorder }) => {
  const {
    id,
    orderNumber,
    restaurantName,
    status,
    items,
    total,
    createdAt,
    getStatusLabel,
    getStatusColor,
    getStatusIcon,
    getFormattedDate,
    getFormattedTotal,
    getTotalItems,
    canCancel,
    canReorder,
    isActive,
    isDelivered,
    isCancelled,
  } = order;

  // Preview items (first 2)
  const previewItems = items.slice(0, 2);
  const remainingCount = items.length - 2;

  return (
    <div className={styles.orderCard}>
      {/* Header */}
      <div className={styles.orderHeader}>
        <div className={styles.orderLeft}>
          <span className={styles.orderNumber}>{orderNumber}</span>
          <span className={styles.orderDate}>{getFormattedDate()}</span>
        </div>
        <div className={styles.orderRight}>
          <span
            className={styles.statusBadge}
            style={{
              backgroundColor: getStatusColor() + '20',
              color: getStatusColor(),
            }}
          >
            {getStatusIcon()} {getStatusLabel()}
          </span>
        </div>
      </div>

      {/* Restaurant */}
      <div className={styles.orderRestaurant}>
        <span className={styles.restaurantName}>{restaurantName}</span>
      </div>

      {/* Items Preview */}
      <div className={styles.orderItems}>
        {previewItems.map((item) => (
          <div key={item.id} className={styles.orderItemPreview}>
            <span className={styles.itemQuantity}>{item.quantity}x</span>
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
          </div>
        ))}
        {remainingCount > 0 && (
          <div className={styles.remainingItems}>
            +{remainingCount} more item{remainingCount > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={styles.orderFooter}>
        <div className={styles.orderTotal}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={styles.totalAmount}>{getFormattedTotal()}</span>
          <span className={styles.itemCount}>({getTotalItems()} items)</span>
        </div>
        <div className={styles.orderActions}>
          <button
            className={styles.viewButton}
            onClick={() => onView?.(order)}
          >
            View Details
          </button>
          {canCancel() && (
            <button
              className={styles.cancelButton}
              onClick={() => onCancel?.(order)}
            >
              Cancel
            </button>
          )}
          {canReorder() && (
            <button
              className={styles.reorderButton}
              onClick={() => onReorder?.(order)}
            >
              Reorder
            </button>
          )}
        </div>
      </div>

      {/* Status progress (for active orders) */}
      {isActive() && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: getStatusProgress(status) + '%' }}
            />
          </div>
          <span className={styles.progressLabel}>
            {getStatusLabel()}
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Get status progress (0-100)
 */
function getStatusProgress(status) {
  const order = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'out_for_delivery',
    'delivered',
  ];
  const index = order.indexOf(status);
  if (index === -1) return 0;
  return Math.round((index / (order.length - 1)) * 100);
}

export default OrderCard;