// components/FavoritesEmpty.jsx

import React from 'react';
import styles from '../styles/Favorites.module.css';

const FavoritesEmpty = ({
  message = 'No favorites yet',
  subMessage = 'Start saving your favorite restaurants and dishes!',
  onBrowseClick,
  icon = '❤️',
}) => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h3 className={styles.emptyTitle}>{message}</h3>
      <p className={styles.emptySub}>{subMessage}</p>
      {onBrowseClick && (
        <button className={styles.browseButton} onClick={onBrowseClick}>
          Browse Restaurants
        </button>
      )}
      <div className={styles.emptySuggestions}>
        <p className={styles.suggestionTitle}>💡 Suggestions:</p>
        <ul className={styles.suggestionList}>
          <li>Explore our menu and save your favorite dishes</li>
          <li>Save restaurants you love for quick access</li>
          <li>Your favorites will appear here</li>
        </ul>
      </div>
    </div>
  );
};

export default FavoritesEmpty;