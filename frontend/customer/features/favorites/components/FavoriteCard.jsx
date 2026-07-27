// components/FavoriteCard.jsx

import React, { useState } from 'react';
import styles from '../styles/Favorites.module.css';

const FavoriteCard = ({ favorite, onRemove, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const item = favorite?.item || favorite || {};
  const id = favorite?.id || item?.id;
  const type = favorite?.type || (favorite?.dishId ? 'dish' : 'restaurant');
  const getFormattedDate = favorite?.getFormattedDate?.bind(favorite) || (() => 'recently');
  const getTypeIcon = favorite?.getTypeIcon?.bind(favorite) || (() => (type === 'restaurant' ? '🏪' : '🍽️'));
  const getTypeLabel = favorite?.getTypeLabel?.bind(favorite) || (() => (type === 'restaurant' ? 'Restaurant' : 'Dish'));

  const handleRemove = async (e) => {
    e.stopPropagation();
    if (isRemoving) return;
    
    setIsRemoving(true);
    try {
      await onRemove?.(id);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleClick = () => {
    if (!isRemoving) {
      onClick?.(favorite);
    }
  };

  const getRatingStars = () => {
    return '⭐'.repeat(Math.round(item.rating || 0));
  };

  return (
    <div
      className={`${styles.favoriteCard} ${isRemoving ? styles.removing : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Image */}
      <div className={styles.cardImage}>
        {!imageLoaded && !imageError && (
          <div className={styles.imagePlaceholder}>🍽️</div>
        )}
        {item.image && !imageError ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={imageLoaded ? styles.imageLoaded : styles.imageHidden}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            {type === 'restaurant' ? '🏪' : '🍽️'}
          </div>
        )}

        {/* Type badge */}
        <div className={styles.typeBadge}>
          <span>{getTypeIcon()}</span>
          <span>{getTypeLabel()}</span>
        </div>

        {/* Remove button */}
        <button
          className={styles.removeButton}
          onClick={handleRemove}
          disabled={isRemoving}
          aria-label="Remove from favorites"
        >
          {isRemoving ? '⏳' : '✕'}
        </button>
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        <h3 className={styles.itemName}>{item.name}</h3>
        
        {item.description && (
          <p className={styles.itemDescription}>{item.description}</p>
        )}

        {/* Price (for dishes) */}
        {item.price > 0 && (
          <div className={styles.itemPrice}>${item.price.toFixed(2)}</div>
        )}

        {/* Rating */}
        {item.rating > 0 && (
          <div className={styles.itemRating}>
            <span>{getRatingStars()}</span>
            <span className={styles.ratingValue}>{item.rating.toFixed(1)}</span>
            {item.totalReviews > 0 && (
              <span className={styles.reviewCount}>({item.totalReviews})</span>
            )}
          </div>
        )}

        {/* Dietary tags (for dishes) */}
        {item.dietary && item.dietary.length > 0 && (
          <div className={styles.dietaryTags}>
            {item.dietary.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.dietaryTag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className={styles.cardFooter}>
          <span className={styles.favoritedDate}>
            ❤️ Added {getFormattedDate()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;