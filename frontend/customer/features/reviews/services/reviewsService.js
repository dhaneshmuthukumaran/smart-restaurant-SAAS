// services/reviewsService.js

import { Review, RatingSummary } from '../types/reviews.types';

// Mock data - sample reviews
const mockReviews = [
  {
    id: 1,
    userId: 'user1',
    userName: 'John Doe',
    userAvatar: '',
    restaurantId: 'rest1',
    dishId: '',
    rating: 5,
    title: 'Amazing experience!',
    comment: 'The food was absolutely delicious and the service was impeccable. Highly recommend the margherita pizza!',
    images: ['https://via.placeholder.com/400x300?text=Food1'],
    tags: ['great_food', 'good_service', 'nice_ambiance', 'will_visit_again'],
    helpfulCount: 12,
    isVerified: true,
    createdAt: '2026-07-20T14:30:00Z',
    updatedAt: '2026-07-20T14:30:00Z',
    response: {
      text: 'Thank you for your wonderful review! We look forward to serving you again.',
      createdAt: '2026-07-21T10:00:00Z',
    },
    ratings: {
      food: 5,
      ambiance: 4,
      service: 5,
      hygiene: 5,
    },
  },
  {
    id: 2,
    userId: 'user2',
    userName: 'Jane Smith',
    userAvatar: '',
    restaurantId: 'rest1',
    dishId: '3',
    rating: 4,
    title: 'Great avocado toast',
    comment: 'The avocado toast was perfect! Fresh ingredients and great flavors. Will definitely order again.',
    images: [],
    tags: ['great_food', 'value_for_money', 'recommended'],
    helpfulCount: 5,
    isVerified: true,
    createdAt: '2026-07-18T12:00:00Z',
    updatedAt: '2026-07-18T12:00:00Z',
    response: null,
    ratings: {
      food: 4,
      ambiance: 0,
      service: 0,
      hygiene: 0,
    },
  },
  {
    id: 3,
    userId: 'user3',
    userName: 'Mike Johnson',
    userAvatar: '',
    restaurantId: 'rest2',
    dishId: '',
    rating: 3,
    title: 'Good but not great',
    comment: 'The food was decent but the service was slow. The atmosphere was nice though.',
    images: [],
    tags: ['nice_ambiance'],
    helpfulCount: 3,
    isVerified: true,
    createdAt: '2026-07-15T19:45:00Z',
    updatedAt: '2026-07-15T19:45:00Z',
    response: {
      text: 'We apologize for the slow service. We are working on improving our speed.',
      createdAt: '2026-07-16T09:30:00Z',
    },
    ratings: {
      food: 3,
      ambiance: 4,
      service: 2,
      hygiene: 4,
    },
  },
  {
    id: 4,
    userId: 'user4',
    userName: 'Sarah Wilson',
    userAvatar: '',
    restaurantId: 'rest1',
    dishId: '',
    rating: 5,
    title: 'Best restaurant in town!',
    comment: 'Everything was perfect from the moment we walked in. The staff was friendly, the food was amazing, and the ambiance was cozy.',
    images: ['https://via.placeholder.com/400x300?text=Food2', 'https://via.placeholder.com/400x300?text=Ambiance'],
    tags: ['great_food', 'good_service', 'nice_ambiance', 'family_friendly', 'will_visit_again'],
    helpfulCount: 8,
    isVerified: true,
    createdAt: '2026-07-12T20:15:00Z',
    updatedAt: '2026-07-12T20:15:00Z',
    response: null,
    ratings: {
      food: 5,
      ambiance: 5,
      service: 5,
      hygiene: 5,
    },
  },
  {
    id: 5,
    userId: 'user5',
    userName: 'Alex Brown',
    userAvatar: '',
    restaurantId: 'rest1',
    dishId: '1',
    rating: 2,
    title: 'Disappointed with pizza',
    comment: 'The pizza was undercooked and lacked flavor. Expected better from such a highly rated place.',
    images: [],
    tags: [],
    helpfulCount: 2,
    isVerified: true,
    createdAt: '2026-07-10T18:30:00Z',
    updatedAt: '2026-07-10T18:30:00Z',
    response: {
      text: 'We apologize for the quality of the pizza. We have addressed this with our kitchen team.',
      createdAt: '2026-07-11T11:00:00Z',
    },
    ratings: {
      food: 2,
      ambiance: 3,
      service: 3,
      hygiene: 4,
    },
  },
];

// Store reviews in memory
let reviews = [...mockReviews];

export const reviewsService = {
  /**
   * Get reviews with filters
   */
  async getReviews(params = {}) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    let filteredReviews = [...reviews];

    // Filter by restaurant
    if (params.restaurantId) {
      filteredReviews = filteredReviews.filter(
        (review) => review.restaurantId === params.restaurantId
      );
    }

    // Filter by dish
    if (params.dishId) {
      filteredReviews = filteredReviews.filter(
        (review) => review.dishId === params.dishId
      );
    }

    // Filter by user
    if (params.userId) {
      filteredReviews = filteredReviews.filter(
        (review) => review.userId === params.userId
      );
    }

    // Filter by rating
    if (params.rating && params.rating > 0) {
      filteredReviews = filteredReviews.filter(
        (review) => review.rating === params.rating
      );
    }

    // Filter by has images
    if (params.hasImages) {
      filteredReviews = filteredReviews.filter(
        (review) => review.images && review.images.length > 0
      );
    }

    // Filter by has response
    if (params.hasResponse) {
      filteredReviews = filteredReviews.filter(
        (review) => review.response && review.response.text
      );
    }

    // Filter by date range
    if (params.dateRange?.start) {
      const startDate = new Date(params.dateRange.start);
      filteredReviews = filteredReviews.filter(
        (review) => new Date(review.createdAt) >= startDate
      );
    }
    if (params.dateRange?.end) {
      const endDate = new Date(params.dateRange.end);
      endDate.setHours(23, 59, 59);
      filteredReviews = filteredReviews.filter(
        (review) => new Date(review.createdAt) <= endDate
      );
    }

    // Sort
    switch (params.sortBy) {
      case 'newest':
        filteredReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filteredReviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'highest_rating':
        filteredReviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest_rating':
        filteredReviews.sort((a, b) => a.rating - b.rating);
        break;
      case 'most_helpful':
        filteredReviews.sort((a, b) => b.helpfulCount - a.helpfulCount);
        break;
      default:
        filteredReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedReviews = filteredReviews.slice(start, end);

    return {
      reviews: paginatedReviews.map((review) => new Review(review)),
      total: filteredReviews.length,
      page,
      limit,
      pages: Math.ceil(filteredReviews.length / limit),
    };
  },

  /**
   * Get review by ID
   */
  async getReviewById(id) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const review = reviews.find((review) => review.id === Number(id));
    if (!review) {
      throw new Error('Review not found');
    }
    return new Review(review);
  },

  /**
   * Get rating summary
   */
  async getRatingSummary(entityId, type = 'restaurant') {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const entityReviews = reviews.filter((review) => 
      type === 'restaurant' 
        ? review.restaurantId === entityId 
        : review.dishId === entityId
    );

    if (entityReviews.length === 0) {
      return new RatingSummary({
        average: 0,
        total: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        categoryRatings: { food: 0, ambiance: 0, service: 0, hygiene: 0 },
      });
    }

    const total = entityReviews.length;
    const sum = entityReviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / total;

    // Calculate distribution
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    entityReviews.forEach((review) => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });

    // Calculate category ratings
    const categoryRatings = {
      food: 0,
      ambiance: 0,
      service: 0,
      hygiene: 0,
    };
    const categoryCount = { food: 0, ambiance: 0, service: 0, hygiene: 0 };
    entityReviews.forEach((review) => {
      if (review.ratings) {
        Object.keys(categoryRatings).forEach((category) => {
          if (review.ratings[category] > 0) {
            categoryRatings[category] += review.ratings[category];
            categoryCount[category]++;
          }
        });
      }
    });
    Object.keys(categoryRatings).forEach((category) => {
      categoryRatings[category] = categoryCount[category] > 0 
        ? categoryRatings[category] / categoryCount[category] 
        : 0;
    });

    return new RatingSummary({
      average,
      total,
      distribution,
      categoryRatings,
    });
  },

  /**
   * Create review
   */
  async createReview(data) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newReview = {
      id: Date.now(),
      userId: data.userId || 'user1',
      userName: data.userName || 'Anonymous',
      userAvatar: data.userAvatar || '',
      restaurantId: data.restaurantId || '',
      dishId: data.dishId || '',
      rating: data.rating || 0,
      title: data.title || '',
      comment: data.comment || '',
      images: data.images || [],
      tags: data.tags || [],
      helpfulCount: 0,
      isVerified: data.isVerified || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      response: null,
      ratings: data.ratings || {
        food: 0,
        ambiance: 0,
        service: 0,
        hygiene: 0,
      },
    };

    reviews.unshift(newReview);
    return new Review(newReview);
  },

  /**
   * Update review
   */
  async updateReview(id, data) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const index = reviews.findIndex((review) => review.id === Number(id));
    if (index === -1) {
      throw new Error('Review not found');
    }

    reviews[index] = {
      ...reviews[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return new Review(reviews[index]);
  },

  /**
   * Delete review
   */
  async deleteReview(id) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const index = reviews.findIndex((review) => review.id === Number(id));
    if (index === -1) {
      throw new Error('Review not found');
    }

    reviews.splice(index, 1);
    return { success: true };
  },

  /**
   * Mark review as helpful
   */
  async markHelpful(id) {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const review = reviews.find((review) => review.id === Number(id));
    if (!review) {
      throw new Error('Review not found');
    }

    review.helpfulCount = (review.helpfulCount || 0) + 1;
    return new Review(review);
  },

  /**
   * Report review
   */
  async reportReview(id, reason) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const review = reviews.find((review) => review.id === Number(id));
    if (!review) {
      throw new Error('Review not found');
    }

    // In real app, would store report
    return { success: true, message: 'Review reported successfully' };
  },

  /**
   * Get user's reviews
   */
  async getUserReviews(userId) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const userReviews = reviews.filter((review) => review.userId === userId);
    return userReviews.map((review) => new Review(review));
  },

  /**
   * Add response to review
   */
  async addResponse(id, responseText) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const review = reviews.find((review) => review.id === Number(id));
    if (!review) {
      throw new Error('Review not found');
    }

    review.response = {
      text: responseText,
      createdAt: new Date().toISOString(),
    };

    return new Review(review);
  },
};

export default reviewsService;