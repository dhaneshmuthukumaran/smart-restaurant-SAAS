// components/CartDropdown.jsx

import React, { useRef, useEffect } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import CartEmpty from './CartEmpty';
import styles from '../styles/Cart.module.css';

const CartDropdown = ({
  isOpen = false,
  onClose,
  items = [],
  totals,
  loading = false,
  onCheckout,
  onItemUpdate,
  onItemRemove,
  onUpdateInstructions,
  onApplyPromo,
  onBrowseClick,
  onClearCart,
}) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.dropdownOverlay} onClick={onClose}>
      <div
        ref={dropdownRef}
        className={styles.dropdownContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.dropdownHeader}>
          <h3 className={styles.dropdownTitle}>
            Your Cart
            {items.length > 0 && (
              <span className={styles.itemCount}>
                ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
              </span>
            )}
          </h3>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className={styles.dropdownContent}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <span className={styles.loadingSpinner} />
              <p>Loading cart...</p>
            </div>
          ) : items.length === 0 ? (
            <CartEmpty
              message="Your cart is empty"
              subMessage="Start adding delicious items from our menu!"
              onBrowseClick={onBrowseClick}
            />
          ) : (
            <>
              {/* Cart Items */}
              <div className={styles.cartItemsList}>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={(quantity) => onItemUpdate?.(item.id, quantity)}
                    onRemove={() => onItemRemove?.(item.id)}
                    onUpdateInstructions={(instructions) =>
                      onUpdateInstructions?.(item.id, instructions)
                    }
                  />
                ))}
              </div>

              {/* Clear Cart */}
              <button
                className={styles.clearCartButton}
                onClick={onClearCart}
              >
                Clear Cart
              </button>

              {/* Summary */}
              <div className={styles.dropdownSummary}>
                <CartSummary
                  totals={totals}
                  onCheckout={onCheckout}
                  onApplyPromo={onApplyPromo}
                  isCheckoutLoading={loading}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;