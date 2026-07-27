// types/reviews.types.js

export const reviewsTypes = {};

/**
 * @typedef {Object} Review
 * @property {number|string} id - Review ID
 * @property {string} userId - User ID
 * @property {string} userName - User name
 * @property {string} userAvatar - User avatar URL
 * @property {string} restaurantId - Restaurant ID
 * @property {string} dishId - Dish ID (optional)
 * @property {number} rating - Rating (1-5)
 * @property {string} title - Review title
 * @property {string} comment - Review comment
 * @property {string[]} images - Image URLs
 * @property {string[]} tags - Review tags
 * @property {number} helpfulCount - Number of helpful votes
 * @property {boolean} isVerified - Verified purchase
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 * @property {Object} response - Restaurant response
 * @property {string} response.text - Response text
 * @property {Date} response.createdAt - Response timestamp
 * @property {Object} ratings - Category ratings
 * @property {number} ratings.food - Food rating
 * @property {number} ratings.ambiance - Ambiance rating
 * @property {number} ratings.service - Service rating
 * @property {number} ratings.hygiene - Hygiene rating
 */

/**
 * @typedef {Object} RatingSummary
 * @property {number} average - Average rating
 * @property {number} total - Total reviews count
 * @property {Object} distribution - Rating distribution
 * @property {number} distribution[5] - 5-star count
 * @property {number} distribution[4] - 4-star count
 * @property {number} distribution[3] - 3-star count
 * @property {number} distribution[2] - 2-star count
 * @property {number} distribution[1] - 1-star count
 * @property {Object} categoryRatings - Category ratings
 * @property {number} categoryRatings.food - Food rating
 * @property {number} categoryRatings.ambiance - Ambiance rating
 * @property {number} categoryRatings.service - Service rating
 * @property {number} categoryRatings.hygiene - Hygiene rating
 */

/**
 * @typedef {Object} ReviewFilters
 * @property {number} rating - Filter by rating (1-5)
 * @property {string} sortBy - Sort field
 * @property {boolean} hasImages - Has images filter
 * @property {boolean} hasResponse - Has response filter
 * @property {Object} dateRange - Date range
 * @property {string} dateRange.start - Start date
 * @property {string} dateRange.end - End date
 */

/**
 * @typedef {Object} ReviewFormData
 * @property {number} rating - Rating (1-5)
 * @property {string} title - Review title
 * @property {string} comment - Review comment
 * @property {File[]|string[]} images - Images
 * @property {string[]} tags - Review tags
 * @property {Object} ratings - Category ratings
 * @property {number} ratings.food - Food rating
 * @property {number} ratings.ambiance - Ambiance rating
 * @property {number} ratings.service - Service rating
 * @property {number} ratings.hygiene - Hygiene rating
 */

export const ReviewTags = {
  GREAT_FOOD: 'great_food',
  GOOD_SERVICE: 'good_service',
  NICE_AMBIANCE: 'nice_ambiance',
  VALUE_FOR_MONEY: 'value_for_money',
  WILL_VISIT_AGAIN: 'will_visit_again',
  RECOMMENDED: 'recommended',
  FAMILY_FRIENDLY: 'family_friendly',
  GOOD_FOR_GROUPS: 'good_for_groups',
};

export const ReviewTagLabels = {
  [ReviewTags.GREAT_FOOD]: '🍽️ Great Food',
  [ReviewTags.GOOD_SERVICE]: '👨‍🍳 Good Service',
  [ReviewTags.NICE_AMBIANCE]: '🪑 Nice Ambiance',
  [ReviewTags.VALUE_FOR_MONEY]: '💰 Value for Money',
  [ReviewTags.WILL_VISIT_AGAIN]: '🔄 Will Visit Again',
  [ReviewTags.RECOMMENDED]: '👍 Recommended',
  [ReviewTags.FAMILY_FRIENDLY]: '👨‍👩‍👧‍👦 Family Friendly',
  [ReviewTags.GOOD_FOR_GROUPS]: '👥 Good for Groups',
};

export const SortOptions = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  HIGHEST_RATING: 'highest_rating',
  LOWEST_RATING: 'lowest_rating',
  MOST_HELPFUL: 'most_helpful',
};

export const SortLabels = {
  [SortOptions.NEWEST]: 'Newest First',
  [SortOptions.OLDEST]: 'Oldest First',
  [SortOptions.HIGHEST_RATING]: 'Highest Rating',
  [SortOptions.LOWEST_RATING]: 'Lowest Rating',
  [SortOptions.MOST_HELPFUL]: 'Most Helpful',
};

export class Review {
  constructor(data) {
    this.id = data.id || '';
    this.userId = data.userId || '';
    this.userName = data.userName || '';
    this.userAvatar = data.userAvatar || '';
    this.restaurantId = data.restaurantId || '';
    this.dishId = data.dishId || '';
    this.rating = data.rating || 0;
    this.title = data.title || '';
    this.comment = data.comment || '';
    this.images = data.images || [];
    this.tags = data.tags || [];
    this.helpfulCount = data.helpfulCount || 0;
    this.isVerified = data.isVerified || false;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
    this.response = data.response || null;
    this.ratings = data.ratings || {
      food: 0,
      ambiance: 0,
      service: 0,
      hygiene: 0,
    };
  }

  getRatingStars() {
    return '⭐'.repeat(Math.round(this.rating));
  }

  getFormattedDate() {
    return this.createdAt.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  getTimeAgo() {
    const diff = Date.now() - this.createdAt.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }

  getHelpfulPercentage() {
    // Mock percentage - would need total votes
    return this.helpfulCount > 0 ? Math.min(100, Math.round((this.helpfulCount / 10) * 100)) : 0;
  }

  hasImages() {
    return this.images && this.images.length > 0;
  }

  hasResponse() {
    return this.response !== null && this.response.text;
  }

  getTagLabels() {
    return this.tags.map(tag => ReviewTagLabels[tag] || tag);
  }
}

export class RatingSummary {
  constructor(data) {
    this.average = data.average || 0;
    this.total = data.total || 0;
    this.distribution = data.distribution || {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
    this.categoryRatings = data.categoryRatings || {
      food: 0,
      ambiance: 0,
      service: 0,
      hygiene: 0,
    };
  }

  getPercentage(rating) {
    if (this.total === 0) return 0;
    return Math.round((this.distribution[rating] || 0) / this.total * 100);
  }

  getRatingStars() {
    return '⭐'.repeat(Math.round(this.average));
  }

  getCategoryRating(category) {
    return this.categoryRatings[category] || 0;
  }
}

export class ReviewFilters {
  constructor(data = {}) {
    this.rating = data.rating || 0;
    this.sortBy = data.sortBy || SortOptions.NEWEST;
    this.hasImages = data.hasImages || false;
    this.hasResponse = data.hasResponse || false;
    this.dateRange = data.dateRange || {
      start: '',
      end: '',
    };
  }

  hasActiveFilters() {
    return !!(
      this.rating > 0 ||
      this.hasImages ||
      this.hasResponse ||
      this.dateRange.start ||
      this.dateRange.end
    );
  }

  getActiveFilterCount() {
    let count = 0;
    if (this.rating > 0) count++;
    if (this.hasImages) count++;
    if (this.hasResponse) count++;
    if (this.dateRange.start) count++;
    if (this.dateRange.end) count++;
    return count;
  }

  reset() {
    this.rating = 0;
    this.sortBy = SortOptions.NEWEST;
    this.hasImages = false;
    this.hasResponse = false;
    this.dateRange = { start: '', end: '' };
  }
}

export class ReviewFormData {
  constructor(data = {}) {
    this.rating = data.rating || 0;
    this.title = data.title || '';
    this.comment = data.comment || '';
    this.images = data.images || [];
    this.tags = data.tags || [];
    this.ratings = data.ratings || {
      food: 0,
      ambiance: 0,
      service: 0,
      hygiene: 0,
    };
  }

  isValid() {
    return (
      this.rating > 0 &&
      this.rating <= 5 &&
      this.title.trim().length > 0 &&
      this.comment.trim().length > 10
    );
  }

  getErrors() {
    const errors = {};
    if (this.rating === 0) errors.rating = 'Please select a rating';
    if (this.title.trim().length === 0) errors.title = 'Please enter a title';
    if (this.title.trim().length < 3) errors.title = 'Title must be at least 3 characters';
    if (this.comment.trim().length < 10) errors.comment = 'Comment must be at least 10 characters';
    if (this.comment.trim().length > 1000) errors.comment = 'Comment must be less than 1000 characters';
    return errors;
  }
}