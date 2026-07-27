// components/FavoriteButton.jsx

import React from 'react';
import useFavoriteToggle from '../hooks/useFavoriteToggle';
import styles from '../styles/Favorites.module.css';

const FavoriteButton = ({
  item,
  userId = 'user1',
  onToggle,
  size = 'medium',
  className = '',
  showLabel = false,
  label = 'Favorite',
  disabled = false,
  ariaLabel = 'Toggle favorite',
}) => {
  const { isFavorited, isToggling, toggleFavorite, getStatusMessage } = useFavoriteToggle(userId, item);

  const sizeMap = {
    small: {
      button: '2rem',
      icon: '1rem',
      fontSize: '0.75rem',
    },
    medium: {
      button: '2.5rem',
      icon: '1.25rem',
      fontSize: '0.85rem',
    },
    large: {
      button: '3rem',
      icon: '1.5rem',
      fontSize: '1rem',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.medium;

  const handleClick = async (event) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (disabled || isToggling || !item) {
      return;
    }

    const result = await toggleFavorite();
    onToggle?.(result);
  };

  return (
    <button
      type="button"
      className={`${styles.favoriteButton} ${className}`.trim()}
      onClick={handleClick}
      disabled={isToggling || disabled}
      aria-label={ariaLabel}
      aria-pressed={isFavorited}
      style={{
        width: currentSize.button,
        height: currentSize.button,
        fontSize: currentSize.icon,
        color: isFavorited ? '#f1c40f' : '#666',
        borderColor: isFavorited ? '#f1c40f' : '#e5e7eb',
        opacity: isToggling ? 0.6 : 1,
        cursor: isToggling || disabled ? 'not-allowed' : 'pointer',
      }}
      data-favorited={isFavorited}
    >
      {isToggling ? (
        <span className={styles.spinner} style={{ width: currentSize.icon, height: currentSize.icon }} />
      ) : (
        <span className={styles.heartIcon} style={{ fontSize: currentSize.icon }}>
          {isFavorited ? '❤️' : '🤍'}
        </span>
      )}

      {showLabel && !isToggling && (
        <span className={styles.favoriteLabel} style={{ fontSize: currentSize.fontSize }}>
          {getStatusMessage()}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;