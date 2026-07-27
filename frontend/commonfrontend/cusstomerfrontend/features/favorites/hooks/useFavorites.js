// hooks/useFavorites.js

import { useState, useEffect, useCallback, useMemo } from 'react';
import favoritesService from '../services/favoritesService';

export const useFavorites = (userId) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Load favorites
   */
  const loadFavorites = useCallback(async () => {
    if (!userId) {
      setFavorites([]);
      setFavoriteIds([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await favoritesService.getFavorites(userId);
      setFavorites(data);
      setFavoriteIds(data.map((fav) => fav.id));
    } catch (err) {
      setError(err.message || 'Failed to load favorites');
      console.error('Failed to load favorites:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Add to favorites
   */
  const addFavorite = useCallback(async (itemData) => {
    if (!userId) {
      setError('User not logged in');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const newFavorite = await favoritesService.addFavorite(userId, itemData);
      setFavorites((prev) => [...prev, newFavorite]);
      setFavoriteIds((prev) => [...prev, newFavorite.id]);
      return newFavorite;
    } catch (err) {
      setError(err.message || 'Failed to add favorite');
      console.error('Failed to add favorite:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Remove from favorites
   */
  const removeFavorite = useCallback(async (favoriteId) => {
    setLoading(true);
    setError(null);

    try {
      await favoritesService.removeFavorite(favoriteId);
      setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
      setFavoriteIds((prev) => prev.filter((id) => id !== favoriteId));
    } catch (err) {
      setError(err.message || 'Failed to remove favorite');
      console.error('Failed to remove favorite:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Remove by item ID (convenience method)
   */
  const removeFavoriteByItemId = useCallback(async (itemId, type = 'restaurant') => {
    const favorite = favorites.find(
      (fav) => 
        (fav.dishId === itemId || fav.restaurantId === itemId) &&
        fav.type === type
    );
    
    if (favorite) {
      await removeFavorite(favorite.id);
      return true;
    }
    return false;
  }, [favorites, removeFavorite]);

  /**
   * Clear all favorites
   */
  const clearAllFavorites = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      await favoritesService.clearAllFavorites(userId);
      setFavorites([]);
      setFavoriteIds([]);
    } catch (err) {
      setError(err.message || 'Failed to clear favorites');
      console.error('Failed to clear favorites:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Check if item is favorited
   */
  const isItemFavorited = useCallback((itemId, type = 'restaurant') => {
    return favorites.some(
      (fav) => 
        (fav.dishId === itemId || fav.restaurantId === itemId) &&
        fav.type === type
    );
  }, [favorites]);

  /**
   * Get favorite by item ID
   */
  const getFavoriteByItemId = useCallback((itemId, type = 'restaurant') => {
    return favorites.find(
      (fav) => 
        (fav.dishId === itemId || fav.restaurantId === itemId) &&
        fav.type === type
    );
  }, [favorites]);

  /**
   * Get restaurant favorites
   */
  const getRestaurantFavorites = useCallback(() => {
    return favorites.filter((fav) => fav.isRestaurant());
  }, [favorites]);

  /**
   * Get dish favorites
   */
  const getDishFavorites = useCallback(() => {
    return favorites.filter((fav) => fav.isDish());
  }, [favorites]);

  /**
   * Get favorite count
   */
  const favoriteCount = useMemo(() => {
    return favorites.length;
  }, [favorites]);

  /**
   * Get restaurant favorite count
   */
  const restaurantFavoriteCount = useMemo(() => {
    return favorites.filter((fav) => fav.isRestaurant()).length;
  }, [favorites]);

  /**
   * Get dish favorite count
   */
  const dishFavoriteCount = useMemo(() => {
    return favorites.filter((fav) => fav.isDish()).length;
  }, [favorites]);

  /**
   * Refresh favorites
   */
  const refresh = useCallback(() => {
    loadFavorites();
  }, [loadFavorites]);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load favorites on mount and when userId changes
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return {
    // State
    favorites,
    favoriteIds,
    loading,
    error,
    favoriteCount,
    restaurantFavoriteCount,
    dishFavoriteCount,

    // Actions
    loadFavorites,
    addFavorite,
    removeFavorite,
    removeFavoriteByItemId,
    clearAllFavorites,
    isItemFavorited,
    getFavoriteByItemId,
    getRestaurantFavorites,
    getDishFavorites,
    refresh,
    clearError,
  };
};

export default useFavorites;