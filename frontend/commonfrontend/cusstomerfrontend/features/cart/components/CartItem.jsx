// components/CartItem.jsx

import React, { useState } from 'react';
import styles from '../styles/Cart.module.css';

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  onUpdateInstructions,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [instructions, setInstructions] = useState(item.specialInstructions || '');
  const [showInstructions, setShowInstructions] = useState(false);

  const {
    id,
    name,
    price,
    image,
    description,
    dietary,
    maxQuantity = 10,
    isAvailable = true,
  } = item;

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) {
      await onRemove?.();
      return;
    }
    if (newQuantity > maxQuantity) return;

    setIsUpdating(true);
    setQuantity(newQuantity);
    await onUpdateQuantity?.(newQuantity);
    setIsUpdating(false);
  };

  const handleInstructionsSave = async () => {
    await onUpdateInstructions?.(instructions);
    setShowInstructions(false);
  };

  const getDietaryLabels = () => {
    const labels = {
      'Vegetarian': '🥬 Veg',
      'Vegan': '🌱 Vegan',
      'Gluten-Free': '🌾 GF',
      'Dairy-Free': '🥛 DF',
      'Nut-Free': '🥜 NF',
      'High Protein': '💪 HP',
      'Low Carb': '🥑 LC',
      'Organic': '🌿 Organic',
    };
    return dietary?.slice(0, 2).map((tag) => labels[tag] || tag) || [];
  };

  if (!isAvailable) {
    return (
      <div className={`${styles.cartItem} ${styles.unavailable}`}>
        <div className={styles.itemInfo}>
          <span className={styles.itemName}>{name}</span>
          <span className={styles.unavailableText}>Currently Unavailable</span>
        </div>
        <button
          className={styles.removeButton}
          onClick={onRemove}
          aria-label="Remove item"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartItem}>
      {/* Image */}
      <div className={styles.itemImage}>
        {image ? (
          <img src={image} alt={name} loading="lazy" />
        ) : (
          <div className={styles.imagePlaceholder}>🍽️</div>
        )}
      </div>

      {/* Info */}
      <div className={styles.itemInfo}>
        <div className={styles.itemHeader}>
          <span className={styles.itemName}>{name}</span>
          <span className={styles.itemPrice}>${price.toFixed(2)}</span>
        </div>

        {description && (
          <p className={styles.itemDescription}>{description}</p>
        )}

        {/* Dietary Tags */}
        {dietary && dietary.length > 0 && (
          <div className={styles.itemDietary}>
            {getDietaryLabels().map((tag) => (
              <span key={tag} className={styles.dietaryTag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Quantity Controls */}
        <div className={styles.itemControls}>
          <div className={styles.quantityControls}>
            <button
              className={styles.quantityButton}
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || isUpdating}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className={styles.quantityValue}>{quantity}</span>
            <button
              className={styles.quantityButton}
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= maxQuantity || isUpdating}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className={styles.itemActions}>
            <button
              className={styles.instructionsToggle}
              onClick={() => setShowInstructions(!showInstructions)}
              aria-label="Toggle instructions"
            >
              📝
            </button>
            <button
              className={styles.removeButton}
              onClick={onRemove}
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Special Instructions */}
        {showInstructions && (
          <div className={styles.instructionsContainer}>
            <input
              type="text"
              className={styles.instructionsInput}
              placeholder="Special instructions..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
            <button
              className={styles.saveInstructionsButton}
              onClick={handleInstructionsSave}
            >
              Save
            </button>
            <button
              className={styles.cancelInstructionsButton}
              onClick={() => {
                setInstructions(item.specialInstructions || '');
                setShowInstructions(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {isUpdating && (
          <div className={styles.updatingIndicator}>Updating...</div>
        )}
      </div>
    </div>
  );
};

export default CartItem;