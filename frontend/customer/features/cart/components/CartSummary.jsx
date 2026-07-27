// components/CartSummary.jsx

import React, { useState } from 'react';
import styles from '../styles/Cart.module.css';

const CartSummary = ({
  totals,
  onCheckout,
  onApplyPromo,
  isCheckoutLoading = false,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setPromoError('');
    setPromoMessage('');

    try {
      const result = await onApplyPromo?.(promoCode);
      if (result?.success) {
        setPromoApplied(true);
        setPromoMessage(result.message);
        setPromoCode('');
      } else {
        setPromoError(result?.message || 'Invalid promo code');
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
    }
  };

  if (!totals) return null;

  const {
    subtotal,
    tax,
    deliveryFee,
    serviceFee,
    discount,
    total,
    itemCount,
    uniqueItems,
  } = totals;

  return (
    <div className={styles.summaryContainer}>
      <h4 className={styles.summaryTitle}>Order Summary</h4>

      {/* Items count */}
      <div className={styles.summaryRow}>
        <span>Items ({uniqueItems} unique)</span>
        <span>{itemCount} total</span>
      </div>

      {/* Subtotal */}
      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      {/* Tax */}
      <div className={styles.summaryRow}>
        <span>Tax (8%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      {/* Delivery Fee */}
      {deliveryFee > 0 && (
        <div className={styles.summaryRow}>
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
      )}

      {/* Service Fee */}
      {serviceFee > 0 && (
        <div className={styles.summaryRow}>
          <span>Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
      )}

      {/* Discount */}
      {discount > 0 && (
        <div className={`${styles.summaryRow} ${styles.discountRow}`}>
          <span>Discount</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
      )}

      {/* Promo Code Input */}
      <div className={styles.promoContainer}>
        <input
          type="text"
          className={styles.promoInput}
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          disabled={promoApplied}
        />
        <button
          className={styles.promoButton}
          onClick={handleApplyPromo}
          disabled={promoApplied}
        >
          {promoApplied ? 'Applied ✓' : 'Apply'}
        </button>
      </div>

      {promoMessage && (
        <div className={styles.promoSuccess}>{promoMessage}</div>
      )}
      {promoError && (
        <div className={styles.promoError}>{promoError}</div>
      )}

      {/* Total */}
      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalAmount}>${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      <button
        className={styles.checkoutButton}
        onClick={onCheckout}
        disabled={isCheckoutLoading || itemCount === 0}
      >
        {isCheckoutLoading ? 'Processing...' : `Checkout • $${total.toFixed(2)}`}
      </button>

      {itemCount === 0 && (
        <p className={styles.emptyMessage}>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartSummary;