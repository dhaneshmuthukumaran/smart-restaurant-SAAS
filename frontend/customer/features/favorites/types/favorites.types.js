// types/favorites.types.js

export const favoritesTypes = {};

/**
 * @typedef {Object} Favorite
 * @property {number|string} id - Unique favorite identifier
 * @property {string} userId - User who favorited
 * @property {string} restaurantId - Restaurant ID
 * @property {string} dishId - Dish ID (optional, for dish favorites)
 * @property {string} type - 'restaurant' | 'dish' | 'menu_item'
 * @property {Object} item - The favorited item data
 * @property {string} item.name - Name of the item
 * @property {string} item.image - Image URL
 * @property {string} item.description - Description
 * @property {number} item.price - Price (if dish)
 * @property {number} item.rating - Rating
 * @property {Date} createdAt - When it was favorited
 */

/**
 * @typedef {Object} FavoritesState
 * @property {Array<Favorite>} favorites - List of favorites
 * @property {Array<string>} favoriteIds - List of favorite IDs
 * @property {boolean} loading - Loading state
 * @property {string|null} error - Error message
 */

export const FavoriteTypes = {
  RESTAURANT: 'restaurant',
  DISH: 'dish',
  MENU_ITEM: 'menu_item',
};

export class Favorite {
  constructor(data) {
    this.id = data.id || '';
    this.userId = data.userId || '';
    this.restaurantId = data.restaurantId || '';
    this.dishId = data.dishId || '';
    this.type = data.type || FavoriteTypes.RESTAURANT;
    this.item = {
      name: data.item?.name || '',
      image: data.item?.image || '',
      description: data.item?.description || '',
      price: data.item?.price || 0,
      rating: data.item?.rating || 0,
      totalReviews: data.item?.totalReviews || 0,
      category: data.item?.category || '',
      dietary: data.item?.dietary || [],
    };
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
  }

  /**
   * Get formatted date
   */
  getFormattedDate() {
    return this.createdAt.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  /**
   * Check if favorite is a restaurant
   */
  isRestaurant() {
    return this.type === FavoriteTypes.RESTAURANT;
  }

  /**
   * Check if favorite is a dish
   */
  isDish() {
    return this.type === FavoriteTypes.DISH || this.type === FavoriteTypes.MENU_ITEM;
  }

  /**
   * Get formatted price
   */
  getFormattedPrice(currency = '$') {
    return this.item.price ? `${currency}${this.item.price.toFixed(2)}` : '';
  }

  /**
   * Get rating stars
   */
  getRatingStars() {
    return '⭐'.repeat(Math.round(this.item.rating || 0));
  }

  /**
   * Get item type label
   */
  getTypeLabel() {
    return this.isRestaurant() ? 'Restaurant' : 'Dish';
  }

  /**
   * Get item type icon
   */
  getTypeIcon() {
    return this.isRestaurant() ? '🏪' : '🍽️';
  }

  /**
   * Get item ID (restaurantId or dishId)
   */
  getItemId() {
    return this.isRestaurant() ? this.restaurantId : this.dishId;
  }
}

export default Favorite;