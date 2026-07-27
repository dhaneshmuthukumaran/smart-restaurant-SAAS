// services/favoritesService.js

import { Favorite, FavoriteTypes } from '../types/favorites.types';

// Mock data
const mockFavorites = [
  {
    id: 1,
    userId: 'user1',
    restaurantId: 'rest1',
    dishId: '',
    type: 'restaurant',
    item: {
      name: 'Downtown Flagship',
      image: 'https://via.placeholder.com/300x200?text=Restaurant',
      description: 'Fine dining with a view of the city skyline',
      price: 0,
      rating: 4.8,
      totalReviews: 234,
      category: 'Fine Dining',
      dietary: [],
    },
    createdAt: '2026-07-20T10:00:00Z',
  },
  {
    id: 2,
    userId: 'user1',
    restaurantId: 'rest1',
    dishId: '1',
    type: 'dish',
    item: {
      name: 'Margherita Pizza',
      image: 'https://via.placeholder.com/300x200?text=Pizza',
      description: 'Classic tomato, mozzarella, and fresh basil.',
      price: 12.5,
      rating: 4.5,
      totalReviews: 120,
      category: 'Pizza',
      dietary: ['Vegetarian'],
    },
    createdAt: '2026-07-21T14:30:00Z',
  },
  {
    id: 3,
    userId: 'user1',
    restaurantId: 'rest1',
    dishId: '3',
    type: 'dish',
    item: {
      name: 'Avocado Toast',
      image: 'https://via.placeholder.com/300x200?text=Toast',
      description: 'Toasted sourdough with avocado and chili flakes.',
      price: 9.0,
      rating: 4.7,
      totalReviews: 95,
      category: 'Breakfast',
      dietary: ['Vegetarian', 'Vegan'],
    },
    createdAt: '2026-07-22T09:15:00Z',
  },
  {
    id: 4,
    userId: 'user1',
    restaurantId: 'rest2',
    dishId: '',
    type: 'restaurant',
    item: {
      name: 'Westside Bistro',
      image: 'https://via.placeholder.com/300x200?text=Bistro',
      description: 'Cozy neighborhood spot with seasonal menu',
      price: 0,
      rating: 4.6,
      totalReviews: 189,
      category: 'Casual Dining',
      dietary: [],
    },
    createdAt: '2026-07-23T18:45:00Z',
  },
];

export const favoritesService = {
  /**
   * Get user's favorites
   * @param {string} userId - User ID
   * @returns {Promise<Favorite[]>}
   */
  async getFavorites(userId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const userFavorites = mockFavorites.filter(
      (fav) => fav.userId === userId
    );
    
    return userFavorites.map((fav) => new Favorite(fav));
  },

  /**
   * Add item to favorites
   * @param {string} userId - User ID
   * @param {Object} itemData - Item data to favorite
   * @returns {Promise<Favorite>}
   */
  async addFavorite(userId, itemData) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Check if already favorited
    const existing = mockFavorites.find(
      (fav) => 
        fav.userId === userId && 
        ((itemData.dishId && fav.dishId === itemData.dishId) ||
         (itemData.restaurantId && fav.restaurantId === itemData.restaurantId))
    );
    
    if (existing) {
      return new Favorite(existing);
    }
    
    const newFavorite = {
      id: Date.now(),
      userId,
      restaurantId: itemData.restaurantId || '',
      dishId: itemData.dishId || '',
      type: itemData.type || (itemData.dishId ? 'dish' : 'restaurant'),
      item: {
        name: itemData.name || '',
        image: itemData.image || '',
        description: itemData.description || '',
        price: itemData.price || 0,
        rating: itemData.rating || 0,
        totalReviews: itemData.totalReviews || 0,
        category: itemData.category || '',
        dietary: itemData.dietary || [],
      },
      createdAt: new Date().toISOString(),
    };
    
    mockFavorites.push(newFavorite);
    return new Favorite(newFavorite);
  },

  /**
   * Remove item from favorites
   * @param {number|string} favoriteId - Favorite ID
   * @returns {Promise<{success: boolean, id: number|string}>}
   */
  async removeFavorite(favoriteId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const index = mockFavorites.findIndex((fav) => fav.id === Number(favoriteId));
    if (index === -1) {
      throw new Error('Favorite not found');
    }
    
    mockFavorites.splice(index, 1);
    return { success: true, id: favoriteId };
  },

  /**
   * Check if item is favorited
   * @param {string} userId - User ID
   * @param {string} itemId - Item ID (restaurantId or dishId)
   * @param {string} type - 'restaurant' | 'dish'
   * @returns {Promise<boolean>}
   */
  async isFavorited(userId, itemId, type = 'restaurant') {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const exists = mockFavorites.some(
      (fav) => 
        fav.userId === userId && 
        (fav.dishId === itemId || fav.restaurantId === itemId) &&
        fav.type === type
    );
    
    return exists;
  },

  /**
   * Get favorite count for user
   * @param {string} userId - User ID
   * @returns {Promise<number>}
   */
  async getFavoriteCount(userId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const userFavorites = mockFavorites.filter(
      (fav) => fav.userId === userId
    );
    
    return userFavorites.length;
  },

  /**
   * Clear all favorites for user
   * @param {string} userId - User ID
   * @returns {Promise<{success: boolean}>}
   */
  async clearAllFavorites(userId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const indices = [];
    mockFavorites.forEach((fav, index) => {
      if (fav.userId === userId) {
        indices.push(index);
      }
    });
    
    // Remove in reverse order to maintain index integrity
    indices.reverse().forEach((index) => {
      mockFavorites.splice(index, 1);
    });
    
    return { success: true };
  },

  /**
   * Get favorite by item ID
   * @param {string} userId - User ID
   * @param {string} itemId - Item ID
   * @param {string} type - 'restaurant' | 'dish'
   * @returns {Promise<Favorite|null>}
   */
  async getFavoriteByItemId(userId, itemId, type = 'restaurant') {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const favorite = mockFavorites.find(
      (fav) => 
        fav.userId === userId && 
        (fav.dishId === itemId || fav.restaurantId === itemId) &&
        fav.type === type
    );
    
    return favorite ? new Favorite(favorite) : null;
  },

  /**
   * Get restaurant favorites
   * @param {string} userId - User ID
   * @returns {Promise<Favorite[]>}
   */
  async getRestaurantFavorites(userId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const userFavorites = mockFavorites.filter(
      (fav) => fav.userId === userId && fav.type === FavoriteTypes.RESTAURANT
    );
    
    return userFavorites.map((fav) => new Favorite(fav));
  },

  /**
   * Get dish favorites
   * @param {string} userId - User ID
   * @returns {Promise<Favorite[]>}
   */
  async getDishFavorites(userId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const userFavorites = mockFavorites.filter(
      (fav) => fav.userId === userId && fav.type === FavoriteTypes.DISH
    );
    
    return userFavorites.map((fav) => new Favorite(fav));
  },
};

export default favoritesService;