// services/menuService.js

const mockMenuItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic tomato, mozzarella, and basil.',
    price: 12.5,
    category: 'Pizza',
    dietary: ['Vegetarian'],
    image: 'https://via.placeholder.com/300x200?text=Pizza',
    rating: 4.5,
    totalReviews: 120,
    isAvailable: true,
    isSpecial: false,
    isBestSeller: true,
    spiceLevel: 1,
    preparationTime: 20,
    ingredients: ['Tomato sauce', 'Mozzarella', 'Basil', 'Olive oil'],
  },
  {
    id: 2,
    name: 'Grilled Chicken Bowl',
    description: 'Healthy bowl with rice, greens, and grilled chicken.',
    price: 13.0,
    category: 'Bowls',
    dietary: ['High Protein'],
    image: 'https://via.placeholder.com/300x200?text=Bowl',
    rating: 4.2,
    totalReviews: 85,
    isAvailable: true,
    isSpecial: false,
    isBestSeller: false,
    spiceLevel: 2,
    preparationTime: 15,
    ingredients: ['Chicken breast', 'Brown rice', 'Kale', 'Avocado'],
  },
  {
    id: 3,
    name: 'Avocado Toast',
    description: 'Toasted sourdough with avocado and chili flakes.',
    price: 9.0,
    category: 'Breakfast',
    dietary: ['Vegetarian', 'Vegan'],
    image: 'https://via.placeholder.com/300x200?text=Toast',
    rating: 4.7,
    totalReviews: 95,
    isAvailable: true,
    isSpecial: true,
    isBestSeller: false,
    spiceLevel: 2,
    preparationTime: 10,
    ingredients: ['Sourdough bread', 'Avocado', 'Chili flakes', 'Lemon'],
  },
  {
    id: 4,
    name: 'Classic Burger',
    description: 'Beef patty with cheese, lettuce, and tomato.',
    price: 14.5,
    category: 'Burgers',
    dietary: [],
    image: 'https://via.placeholder.com/300x200?text=Burger',
    rating: 4.3,
    totalReviews: 150,
    isAvailable: true,
    isSpecial: false,
    isBestSeller: true,
    spiceLevel: 2,
    preparationTime: 25,
    ingredients: ['Beef patty', 'Cheddar', 'Lettuce', 'Tomato', 'Brioche bun'],
  },
  {
    id: 5,
    name: 'Caesar Salad',
    description: 'Crisp romaine with parmesan and croutons.',
    price: 10.0,
    category: 'Salads',
    dietary: ['Vegetarian'],
    image: 'https://via.placeholder.com/300x200?text=Salad',
    rating: 4.0,
    totalReviews: 60,
    isAvailable: false,
    isSpecial: false,
    isBestSeller: false,
    spiceLevel: 1,
    preparationTime: 12,
    ingredients: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
  },
  {
    id: 6,
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with egg, pecorino, and pancetta.',
    price: 15.0,
    category: 'Pasta',
    dietary: [],
    image: 'https://via.placeholder.com/300x200?text=Pasta',
    rating: 4.8,
    totalReviews: 200,
    isAvailable: true,
    isSpecial: false,
    isBestSeller: false,
    spiceLevel: 1,
    preparationTime: 30,
    ingredients: ['Spaghetti', 'Eggs', 'Pecorino', 'Pancetta', 'Black pepper'],
  },
];

// Mock categories
const mockCategories = [
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'bowls', name: 'Bowls', icon: '🥗' },
  { id: 'breakfast', name: 'Breakfast', icon: '🍳' },
  { id: 'salads', name: 'Salads', icon: '🥬' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
];

export const menuService = {
  /**
   * Get menu items with optional filtering
   */
  async getMenuItems(params = {}) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredItems = [...mockMenuItems];

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredItems = filteredItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
      );
    }

    if (params.categories && params.categories.length > 0) {
      filteredItems = filteredItems.filter((item) =>
        params.categories.includes(item.category)
      );
    }

    if (params.dietary && params.dietary.length > 0) {
      filteredItems = filteredItems.filter((item) =>
        params.dietary.some((tag) => item.dietary.includes(tag))
      );
    }

    if (params.minPrice !== undefined) {
      filteredItems = filteredItems.filter((item) => item.price >= params.minPrice);
    }

    if (params.maxPrice !== undefined) {
      filteredItems = filteredItems.filter((item) => item.price <= params.maxPrice);
    }

    if (params.showAvailable) {
      filteredItems = filteredItems.filter((item) => item.isAvailable);
    }

    // Sort
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price_asc':
          filteredItems.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredItems.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredItems.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          filteredItems.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }

    const dishes = filteredItems.map((item) => ({ ...item }));

    // Get categories with counts
    const categoryMap = {};
    dishes.forEach((dish) => {
      const categoryName = dish.category;
      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = {
          name: categoryName,
          count: 0,
        };
      }
      categoryMap[categoryName].count++;
    });

    const categories = Object.values(categoryMap).map((cat) => ({
      id: cat.name.toLowerCase().replace(/\s+/g, '-'),
      name: cat.name,
      icon: mockCategories.find((c) => c.name === cat.name)?.icon || '🍽️',
      count: cat.count,
    }));

    return { dishes, categories };
  },

  /**
   * Get categories
   */
  async getCategories() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockCategories.map((cat) => new Category(cat));
  },

  /**
   * Get dish by ID
   */
  async getDishById(id) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const item = mockMenuItems.find((item) => item.id === Number(id));
    if (!item) {
      throw new Error('Dish not found');
    }
    return item;
  },

  /**
   * Search dishes
   */
  async searchDishes(query, filters = {}) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    let results = [...mockMenuItems];
    const searchLower = query.toLowerCase();
    
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
    );

    if (filters.categories && filters.categories.length > 0) {
      results = results.filter((item) =>
        filters.categories.includes(item.category)
      );
    }

    if (filters.dietary && filters.dietary.length > 0) {
      results = results.filter((item) =>
        filters.dietary.some((tag) => item.dietary.includes(tag))
      );
    }

    return {
      dishes: results.map((item) => ({ ...item })),
      total: results.length,
    };
  },

  /**
   * Get daily specials
   */
  async getSpecials() {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockMenuItems
      .filter((item) => item.isSpecial)
      .map((item) => ({ ...item }));
  },

  /**
   * Get best sellers
   */
  async getBestSellers(limit = 5) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockMenuItems
      .filter((item) => item.isBestSeller)
      .slice(0, limit)
      .map((item) => ({ ...item }));
  },

  /**
   * Get dietary options
   */
  async getDietaryOptions() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const dietarySet = new Set();
    mockMenuItems.forEach((item) => {
      item.dietary.forEach((tag) => dietarySet.add(tag));
    });
    return Array.from(dietarySet);
  },

  /**
   * Check dish availability
   */
  async checkAvailability(dishId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const item = mockMenuItems.find((item) => item.id === Number(dishId));
    return {
      isAvailable: item ? item.isAvailable : false,
      quantity: item && item.isAvailable ? Math.floor(Math.random() * 20) + 1 : 0,
    };
  },
};

export default menuService;