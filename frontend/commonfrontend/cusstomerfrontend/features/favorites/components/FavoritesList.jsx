// components/FavoritesList.jsx

import React, { useState } from 'react';
import FavoriteCard from './FavoriteCard';
import FavoritesEmpty from './FavoritesEmpty';
import FavoritesSkeleton from './FavoritesSkeleton';
import styles from '../styles/Favorites.module.css';

const FavoritesList = ({
  favorites = [],
  loading = false,
  onRemove,
  onItemClick,
  onBrowseClick,
  columns = 3,
  showFilters = true,
  emptyMessage = 'No favorites yet',
  emptySubMessage = 'Start saving your favorite restaurants and dishes!',
}) => {
  const [filter, setFilter] = useState('all'); // 'all' | 'restaurants' | 'dishes'
  const [searchTerm, setSearchTerm] = useState('');

  const getFavoriteType = (favorite) => {
    if (favorite?.type === 'dish' || favorite?.type === 'menu_item') {
      return 'dish';
    }

    if (favorite?.type === 'restaurant') {
      return 'restaurant';
    }

    if (typeof favorite?.isRestaurant === 'function') {
      return favorite.isRestaurant() ? 'restaurant' : 'dish';
    }

    return 'restaurant';
  };

  const getFavoriteItem = (favorite) => favorite?.item || favorite || {};

  // Filter favorites
  const getFilteredFavorites = () => {
    let filtered = [...favorites];

    // Apply type filter
    if (filter === 'restaurants') {
      filtered = filtered.filter((fav) => getFavoriteType(fav) === 'restaurant');
    } else if (filter === 'dishes') {
      filtered = filtered.filter((fav) => getFavoriteType(fav) === 'dish');
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((fav) => {
        const item = getFavoriteItem(fav);
        return (item?.name || '').toLowerCase().includes(searchLower) ||
          (item?.description || '').toLowerCase().includes(searchLower);
      });
    }

    return filtered;
  };

  const filteredFavorites = getFilteredFavorites();

  // Get counts for filter badges
  const getCounts = () => {
    const total = favorites.length;
    const restaurants = favorites.filter((fav) => getFavoriteType(fav) === 'restaurant').length;
    const dishes = favorites.filter((fav) => getFavoriteType(fav) === 'dish').length;
    return { total, restaurants, dishes };
  };

  const counts = getCounts();

  // Loading state
  if (loading) {
    return <FavoritesSkeleton count={6} columns={columns} />;
  }

  // Empty state
  if (favorites.length === 0) {
    return (
      <FavoritesEmpty
        message={emptyMessage}
        subMessage={emptySubMessage}
        onBrowseClick={onBrowseClick}
      />
    );
  }

  // No results after filtering
  if (filteredFavorites.length === 0) {
    return (
      <div className={styles.noResults}>
        <div className={styles.noResultsIcon}>🔍</div>
        <h3 className={styles.noResultsTitle}>No matching favorites</h3>
        <p className={styles.noResultsSub}>
          Try adjusting your filters or search terms
        </p>
        <button
          className={styles.clearFiltersButton}
          onClick={() => {
            setFilter('all');
            setSearchTerm('');
          }}
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className={styles.favoritesContainer}>
      {/* Header with filters */}
      {showFilters && (
        <div className={styles.favoritesHeader}>
          <div className={styles.headerLeft}>
            <h2 className={styles.favoritesTitle}>
              My Favorites
              <span className={styles.favoritesCount}>({counts.total})</span>
            </h2>
          </div>

          <div className={styles.headerRight}>
            {/* Filter buttons */}
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({counts.total})
              </button>
              <button
                className={`${styles.filterButton} ${filter === 'restaurants' ? styles.active : ''}`}
                onClick={() => setFilter('restaurants')}
              >
                🏪 Restaurants ({counts.restaurants})
              </button>
              <button
                className={`${styles.filterButton} ${filter === 'dishes' ? styles.active : ''}`}
                onClick={() => setFilter('dishes')}
              >
                🍽️ Dishes ({counts.dishes})
              </button>
            </div>

            {/* Search input */}
            <div className={styles.searchWrapper}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className={styles.clearSearch}
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div
        className={styles.favoritesGrid}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {filteredFavorites.map((favorite) => (
          <FavoriteCard
            key={favorite.id}
            favorite={favorite}
            onRemove={onRemove}
            onClick={onItemClick}
          />
        ))}
      </div>

      {/* Footer stats */}
      <div className={styles.favoritesFooter}>
        <span className={styles.footerStats}>
          Showing {filteredFavorites.length} of {favorites.length} favorites
        </span>
      </div>
    </div>
  );
};

export default FavoritesList;