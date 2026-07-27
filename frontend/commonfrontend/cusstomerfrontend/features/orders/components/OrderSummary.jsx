// components/OrderSummary.jsx

import React from 'react';
import styles from '../styles/Orders.module.css';

const OrderSummary = ({ order }) => {
  const {
    subtotal,
    tax,
    deliveryFee,
    serviceFee,
    discount,
    total,
    getFormattedSubtotal,
    getFormattedTax,
    getFormattedDeliveryFee,
    getFormattedDiscount,
    getFormattedTotal,
  } = order;

  return (
    <div className={styles.summaryContainer}>
      <h4 className={styles.summaryTitle}>Order Summary</h4>

      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span>{getFormattedSubtotal()}</span>
      </div>

      <div className={styles.summaryRow}>
        <span>Tax</span>
        <span>{getFormattedTax()}</span>
      </div>

      {deliveryFee > 0 && (
        <div className={styles.summaryRow}>
          <span>Delivery Fee</span>
          <span>{getFormattedDeliveryFee()}</span>
        </div>
      )}

      {serviceFee > 0 && (
        <div className={styles.summaryRow}>
          <span>Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
      )}

      {discount > 0 && (
        <div className={`${styles.summaryRow} ${styles.discountRow}`}>
          <span>Discount</span>
          <span>-{getFormattedDiscount()}</span>
        </div>
      )}

      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
        <span>Total</span>
        <span>{getFormattedTotal()}</span>
      </div>
    </div>
  );
};

export default OrderSummary;