export const menuTypes = {};

/**
 * @typedef {Object} Dish
 * @property {string} id - Unique dish identifier
 * @property {string} name - Dish name
 * @property {string} description - Detailed description
 * @property {number} price - Price in restaurant's currency
 * @property {string} category - Category ID
 * @property {string[]} dietaryTags - Dietary preferences (vegan, gluten-free, etc.)
 * @property {number} spiceLevel - Spice level 1-5
 * @property {number} popularity - Popularity score
 * @property {string} image - Main image URL
 * @property {boolean} isAvailable - Currently available
 * @property {string[]} ingredients - List of ingredients
 * @property {Object} nutritionalInfo - Nutritional information
 * @property {number} nutritionalInfo.calories - Calories
 * @property {number} nutritionalInfo.protein - Protein in grams
 * @property {number} nutritionalInfo.carbs - Carbohydrates in grams
 * @property {number} nutritionalInfo.fat - Fat in grams
 * @property {number} preparationTime - Preparation time in minutes
 * @property {boolean} isSpecial - Today's special
 * @property {boolean} isBestSeller - Best seller
 * @property {number} rating - Average rating
 * @property {number} totalReviews - Total number of reviews
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} Category
 * @property {string} id - Unique category identifier
 * @property {string} name - Category name
 * @property {string} icon - Emoji or icon
 * @property {string} description - Category description
 * @property {number} displayOrder - Order of display
 * @property {number} itemCount - Number of items in category
 */

/**
 * @typedef {Object} MenuFilters
 * @property {string} search - Search term
 * @property {string[]} categories - Selected categories
 * @property {string[]} dietary - Selected dietary tags
 * @property {Object} priceRange - Price range
 * @property {number} priceRange.min - Minimum price
 * @property {number} priceRange.max - Maximum price
 * @property {string} sortBy - Sort field (popularity, price, rating, name)
 * @property {string} sortOrder - Sort order (asc, desc)
 * @property {boolean} isAvailable - Only show available
 */

/**
 * @typedef {Object} MenuSearchParams
 * @property {string} query - Search query
 * @property {string[]} categories - Category filters
 * @property {string[]} dietary - Dietary filters
 * @property {number} minPrice - Minimum price
 * @property {number} maxPrice - Maximum price
 * @property {string} sortBy - Sort field
 * @property {string} sortOrder - Sort order
 * @property {number} page - Page number
 * @property {number} limit - Items per page
 */

export const DietaryTags = {
  VEGAN: 'vegan',
  VEGETARIAN: 'vegetarian',
  GLUTEN_FREE: 'gluten-free',
  DAIRY_FREE: 'dairy-free',
  NUT_FREE: 'nut-free',
  HALAL: 'halal',
  KOSHER: 'kosher',
  ORGANIC: 'organic',
  LOW_CARB: 'low-carb',
  HIGH_PROTEIN: 'high-protein',
};

export const DietaryLabels = {
  [DietaryTags.VEGAN]: '🌱 Vegan',
  [DietaryTags.VEGETARIAN]: '🥬 Vegetarian',
  [DietaryTags.GLUTEN_FREE]: '🌾 Gluten-Free',
  [DietaryTags.DAIRY_FREE]: '🥛 Dairy-Free',
  [DietaryTags.NUT_FREE]: '🥜 Nut-Free',
  [DietaryTags.HALAL]: '☪️ Halal',
  [DietaryTags.KOSHER]: '✡️ Kosher',
  [DietaryTags.ORGANIC]: '🌿 Organic',
  [DietaryTags.LOW_CARB]: '🥑 Low-Carb',
  [DietaryTags.HIGH_PROTEIN]: '💪 High-Protein',
};

export const SortOptions = {
  POPULARITY: 'popularity',
  PRICE_LOW: 'price_asc',
  PRICE_HIGH: 'price_desc',
  RATING: 'rating',
  NAME: 'name',
};

export const SortLabels = {
  [SortOptions.POPULARITY]: 'Most Popular',
  [SortOptions.PRICE_LOW]: 'Price: Low to High',
  [SortOptions.PRICE_HIGH]: 'Price: High to Low',
  [SortOptions.RATING]: 'Top Rated',
  [SortOptions.NAME]: 'A-Z',
};

export class Dish {
  constructor(data) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.price = data.price || 0;
    this.category = data.category || '';
    this.dietaryTags = data.dietaryTags || [];
    this.spiceLevel = data.spiceLevel || 1;
    this.popularity = data.popularity || 0;
    this.image = data.image || '';
    this.isAvailable = data.isAvailable !== undefined ? data.isAvailable : true;
    this.ingredients = data.ingredients || [];
    this.nutritionalInfo = {
      calories: data.nutritionalInfo?.calories || 0,
      protein: data.nutritionalInfo?.protein || 0,
      carbs: data.nutritionalInfo?.carbs || 0,
      fat: data.nutritionalInfo?.fat || 0,
    };
    this.preparationTime = data.preparationTime || 15;
    this.isSpecial = data.isSpecial || false;
    this.isBestSeller = data.isBestSeller || false;
    this.rating = data.rating || 0;
    this.totalReviews = data.totalReviews || 0;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
  }

  /**
   * Get formatted price
   */
  getFormattedPrice(currency = '$') {
    return `${currency}${this.price.toFixed(2)}`;
  }

  /**
   * Get rating stars as string
   */
  getRatingStars() {
    return '⭐'.repeat(Math.round(this.rating));
  }

  /**
   * Get dietary tags as array of labels
   */
  getDietaryLabels() {
    return this.dietaryTags.map(tag => DietaryLabels[tag] || tag);
  }

  /**
   * Check if dish has a specific dietary tag
   */
  hasDietaryTag(tag) {
    return this.dietaryTags.includes(tag);
  }

  /**
   * Get spice level text
   */
  getSpiceLevelText() {
    const levels = ['Mild', 'Medium', 'Hot', 'Very Hot', 'Extremely Hot'];
    return levels[this.spiceLevel - 1] || 'Unknown';
  }

  /**
   * Get preparation time text
   */
  getPreparationTimeText() {
    return `${this.preparationTime} min`;
  }

  /**
   * Check if dish is available
   */
  isCurrentlyAvailable() {
    return this.isAvailable;
  }

  /**
   * Get nutritional info as formatted string
   */
  getNutritionalInfoText() {
    const { calories, protein, carbs, fat } = this.nutritionalInfo;
    return `${calories} cal | P: ${protein}g | C: ${carbs}g | F: ${fat}g`;
  }
}

export class Category {
  constructor(data) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.icon = data.icon || '🍽️';
    this.description = data.description || '';
    this.displayOrder = data.displayOrder || 0;
    this.itemCount = data.itemCount || 0;
  }
}

export class MenuFilters {
  constructor(data = {}) {
    this.search = data.search || '';
    this.categories = data.categories || [];
    this.dietary = data.dietary || [];
    this.priceRange = {
      min: data.priceRange?.min || 0,
      max: data.priceRange?.max || 1000,
    };
    this.sortBy = data.sortBy || SortOptions.POPULARITY;
    this.sortOrder = data.sortOrder || 'desc';
    this.isAvailable = data.isAvailable !== undefined ? data.isAvailable : false;
  }

  /**
   * Check if any filters are active
   */
  hasActiveFilters() {
    return !!(
      this.search ||
      this.categories.length > 0 ||
      this.dietary.length > 0 ||
      this.priceRange.min > 0 ||
      this.priceRange.max < 1000 ||
      this.isAvailable
    );
  }

  /**
   * Get active filter count
   */
  getActiveFilterCount() {
    let count = 0;
    if (this.search) count++;
    if (this.categories.length > 0) count++;
    if (this.dietary.length > 0) count++;
    if (this.priceRange.min > 0 || this.priceRange.max < 1000) count++;
    if (this.isAvailable) count++;
    return count;
  }

  /**
   * Reset all filters
   */
  reset() {
    this.search = '';
    this.categories = [];
    this.dietary = [];
    this.priceRange = { min: 0, max: 1000 };
    this.sortBy = SortOptions.POPULARITY;
    this.sortOrder = 'desc';
    this.isAvailable = false;
  }
}