// hooks/useFavoriteToggle.js

import { useState, useCallback, useEffect } from 'react';
import useFavorites from './useFavorites';

const normalizeItemData = (itemData) => {
  if (!itemData) {
    return null;
  }

  const id = itemData.id || itemData.dishId || itemData.restaurantId || itemData._id;
  const resolvedType = itemData.type || (itemData.dishId || itemData.itemType === 'dish' ? 'dish' : 'restaurant');

  return {
    ...itemData,
    id,
    dishId: itemData.dishId || (resolvedType === 'dish' ? id : ''),
    restaurantId: itemData.restaurantId || (resolvedType === 'restaurant' ? id : ''),
    type: resolvedType,
  };
};

export const useFavoriteToggle = (userId, itemData) => {
  const [isToggling, setIsToggling] = useState(false);
  const [optimisticFavorited, setOptimisticFavorited] = useState(false);

  const { addFavorite, removeFavorite, isItemFavorited, getFavoriteByItemId, loading, error } = useFavorites(userId);

  const normalizedItem = normalizeItemData(itemData);
  const itemId = normalizedItem?.dishId || normalizedItem?.restaurantId || normalizedItem?.id;
  const type = normalizedItem?.type || 'restaurant';

  useEffect(() => {
    if (!itemId) {
      setOptimisticFavorited(false);
      return;
    }

    setOptimisticFavorited(isItemFavorited(itemId, type));
  }, [itemId, type, isItemFavorited]);

  const toggleFavorite = useCallback(async () => {
    if (!userId) {
      return {
        success: false,
        message: 'Please login to save favorites',
        redirectToLogin: true,
      };
    }

    if (!itemId) {
      return { success: false, message: 'Missing item data' };
    }

    if (isToggling) {
      return { success: false, message: 'Operation in progress' };
    }

    setIsToggling(true);

    try {
      const existingFavorite = getFavoriteByItemId(itemId, type);
      const currentlyFavorited = optimisticFavorited || Boolean(existingFavorite);

      if (currentlyFavorited) {
        if (existingFavorite) {
          setOptimisticFavorited(false);
          await removeFavorite(existingFavorite.id);
          return { success: true, action: 'removed', favorite: existingFavorite };
        }
        return { success: false, message: 'Favorite not found' };
      }

      const favoriteData = {
        restaurantId: normalizedItem?.restaurantId || '',
        dishId: normalizedItem?.dishId || '',
        type,
        name: normalizedItem?.name || normalizedItem?.item?.name || '',
        image: normalizedItem?.image || normalizedItem?.item?.image || '',
        description: normalizedItem?.description || normalizedItem?.item?.description || '',
        price: normalizedItem?.price || normalizedItem?.item?.price || 0,
        rating: normalizedItem?.rating || normalizedItem?.item?.rating || 0,
        totalReviews: normalizedItem?.totalReviews || normalizedItem?.item?.totalReviews || 0,
        category: normalizedItem?.category || normalizedItem?.item?.category || '',
        dietary: normalizedItem?.dietary || normalizedItem?.item?.dietary || [],
      };

      setOptimisticFavorited(true);
      const newFavorite = await addFavorite(favoriteData);
      return { success: true, action: 'added', favorite: newFavorite };
    } catch (errorObject) {
      setOptimisticFavorited(!optimisticFavorited);
      return {
        success: false,
        message: errorObject?.message || 'Failed to update favorite',
        error: errorObject,
      };
    } finally {
      setIsToggling(false);
    }
  }, [
    userId,
    itemId,
    type,
    normalizedItem,
    optimisticFavorited,
    isToggling,
    getFavoriteByItemId,
    addFavorite,
    removeFavorite,
  ]);

  const addToFavorites = useCallback(async () => {
    if (!optimisticFavorited) {
      return toggleFavorite();
    }
    return { success: false, message: 'Already favorited' };
  }, [optimisticFavorited, toggleFavorite]);

  const removeFromFavorites = useCallback(async () => {
    if (optimisticFavorited) {
      return toggleFavorite();
    }
    return { success: false, message: 'Not favorited' };
  }, [optimisticFavorited, toggleFavorite]);

  const canToggle = !!userId && !!itemId && !isToggling;

  const getStatusMessage = useCallback(() => {
    if (isToggling) return 'Updating...';
    if (optimisticFavorited) return 'Added to favorites';
    return 'Add to favorites';
  }, [isToggling, optimisticFavorited]);

  return {
    isFavorited: optimisticFavorited,
    isToggling,
    loading: loading || isToggling,
    error,
    canToggle,
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    getStatusMessage,
    itemId,
    type,
    userId,
  };
};

export default useFavoriteToggle;