// components/OrderDetails.jsx

import React from 'react';
import OrderStatusTracker from './OrderStatusTracker';
import OrderSummary from './OrderSummary';
import styles from '../styles/Orders.module.css';

const OrderDetails = ({
  order,
  onCancel,
  onReorder,
  onClose,
  loading = false,
}) => {
  if (!order) {
    return (
      <div className={styles.orderDetailsEmpty}>
        <p>Order not found</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  const {
    orderNumber,
    restaurantName,
    branchName,
    status,
    items,
    deliveryType,
    deliveryAddress,
    specialInstructions,
    paymentMethod,
    paymentStatus,
    createdAt,
    getStatusLabel,
    getStatusColor,
    getStatusIcon,
    getFormattedDate,
    getFormattedTime,
    getTotalItems,
    canCancel,
    canReorder,
  } = order;

  return (
    <div className={styles.orderDetails}>
      {/* Close Button */}
      {onClose && (
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      )}

      {/* Header */}
      <div className={styles.detailsHeader}>
        <div className={styles.detailsTitle}>
          <h2>{orderNumber}</h2>
          <span className={styles.detailsDate}>
            {getFormattedDate()} at {getFormattedTime()}
          </span>
        </div>
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

      {/* Restaurant */}
      <div className={styles.detailsRestaurant}>
        <h3>{restaurantName}</h3>
        <p>{branchName}</p>
      </div>

      {/* Status Tracker */}
      <div className={styles.detailsTracker}>
        <OrderStatusTracker order={order} />
      </div>

      {/* Items */}
      <div className={styles.detailsItems}>
        <h4>Order Items ({getTotalItems()} items)</h4>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.detailItem}>
              <div className={styles.detailItemInfo}>
                <span className={styles.detailItemQuantity}>
                  {item.quantity}x
                </span>
                <span className={styles.detailItemName}>{item.name}</span>
                {item.specialInstructions && (
                  <span className={styles.detailItemInstructions}>
                    📝 {item.specialInstructions}
                  </span>
                )}
              </div>
              <span className={styles.detailItemPrice}>
                ${item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery/Pickup Info */}
      <div className={styles.detailsDelivery}>
        <h4>{deliveryType === 'delivery' ? '🚚 Delivery' : '📦 Pickup'}</h4>
        {deliveryType === 'delivery' && deliveryAddress && (
          <div className={styles.deliveryAddress}>
            <p>{deliveryAddress.street}</p>
            <p>
              {deliveryAddress.city}, {deliveryAddress.state}{' '}
              {deliveryAddress.zipCode}
            </p>
          </div>
        )}
        {specialInstructions && (
          <div className={styles.deliveryInstructions}>
            <strong>Special Instructions:</strong> {specialInstructions}
          </div>
        )}
      </div>

      {/* Payment Info */}
      <div className={styles.detailsPayment}>
        <h4>💳 Payment</h4>
        <div className={styles.paymentInfo}>
          <span>Method: {paymentMethod}</span>
          <span>Status: {paymentStatus}</span>
        </div>
      </div>

      {/* Summary */}
      <OrderSummary order={order} />

      {/* Actions */}
      <div className={styles.detailsActions}>
        {canCancel() && (
          <button
            className={styles.cancelButton}
            onClick={() => onCancel?.(order)}
          >
            Cancel Order
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
  );
};

export default OrderDetails;