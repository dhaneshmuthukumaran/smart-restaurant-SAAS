// services/cartService.js

import { Cart, CartItem, CartTotals } from '../types/cart.types';

// Mock data - initial cart items
const mockCartItems = [
  {
    id: 'cart_1',
    dishId: '1',
    name: 'Margherita Pizza',
    price: 12.5,
    quantity: 2,
    image: 'https://via.placeholder.com/100x100?text=Pizza',
    description: 'Classic tomato, mozzarella, and basil.',
    dietary: ['Vegetarian'],
    category: 'Pizza',
    specialInstructions: 'Extra cheese',
    maxQuantity: 10,
    isAvailable: true,
  },
  {
    id: 'cart_2',
    dishId: '3',
    name: 'Avocado Toast',
    price: 9.0,
    quantity: 1,
    image: 'https://via.placeholder.com/100x100?text=Toast',
    description: 'Toasted sourdough with avocado and chili flakes.',
    dietary: ['Vegetarian', 'Vegan'],
    category: 'Breakfast',
    specialInstructions: '',
    maxQuantity: 5,
    isAvailable: true,
  },
];

// Mock storage (simulating database)
let mockCart = new Cart({
  items: mockCartItems,
  restaurantId: 'rest1',
  branchId: 'branch1',
  deliveryType: 'pickup',
  specialInstructions: '',
  promoCode: '',
  discountAmount: 0,
});

export const cartService = {
  /**
   * Get user's cart
   * @param {string} userId - User ID
   * @returns {Promise<Cart>}
   */
  async getCart(userId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return new Cart(mockCart);
  },

  /**
   * Add item to cart
   * @param {string} userId - User ID
   * @param {Object} itemData - Item data
   * @param {number} quantity - Quantity to add
   * @returns {Promise<Cart>}
   */
  async addToCart(userId, itemData, quantity = 1) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Check if item already exists
    const existingItem = mockCart.getItemByDishId(itemData.dishId || itemData.id);
    
    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
      if (existingItem.quantity > existingItem.maxQuantity) {
        existingItem.quantity = existingItem.maxQuantity;
      }
    } else {
      // Add new item
      const newItem = new CartItem({
        ...itemData,
        quantity: Math.min(quantity, itemData.maxQuantity || 10),
      });
      mockCart.items.push(newItem);
    }

    // Update restaurant consistency
    if (itemData.restaurantId) {
      mockCart.restaurantId = itemData.restaurantId;
    }

    return new Cart(mockCart);
  },

  /**
   * Remove item from cart
   * @param {string} userId - User ID
   * @param {string} itemId - Cart item ID
   * @returns {Promise<Cart>}
   */
  async removeFromCart(userId, itemId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    mockCart.items = mockCart.items.filter((item) => item.id !== itemId);
    
    // If cart is empty, reset restaurant
    if (mockCart.isEmpty()) {
      mockCart.restaurantId = '';
      mockCart.branchId = '';
    }
    
    return new Cart(mockCart);
  },

  /**
   * Update item quantity
   * @param {string} userId - User ID
   * @param {string} itemId - Cart item ID
   * @param {number} quantity - New quantity
   * @returns {Promise<Cart>}
   */
  async updateQuantity(userId, itemId, quantity) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const item = mockCart.items.find((item) => item.id === itemId);
    if (item) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        mockCart.items = mockCart.items.filter((i) => i.id !== itemId);
      } else {
        item.quantity = Math.min(quantity, item.maxQuantity);
      }
    }
    
    if (mockCart.isEmpty()) {
      mockCart.restaurantId = '';
      mockCart.branchId = '';
    }
    
    return new Cart(mockCart);
  },

  /**
   * Update special instructions for an item
   * @param {string} userId - User ID
   * @param {string} itemId - Cart item ID
   * @param {string} instructions - Special instructions
   * @returns {Promise<Cart>}
   */
  async updateItemInstructions(userId, itemId, instructions) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const item = mockCart.items.find((item) => item.id === itemId);
    if (item) {
      item.specialInstructions = instructions;
    }
    
    return new Cart(mockCart);
  },

  /**
   * Clear cart
   * @param {string} userId - User ID
   * @returns {Promise<Cart>}
   */
  async clearCart(userId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    mockCart = new Cart({
      items: [],
      restaurantId: '',
      branchId: '',
      deliveryType: 'pickup',
      specialInstructions: '',
      promoCode: '',
      discountAmount: 0,
    });
    
    return new Cart(mockCart);
  },

  /**
   * Apply promo code
   * @param {string} userId - User ID
   * @param {string} code - Promo code
   * @returns {Promise<{success: boolean, discount: number, message: string}>}
   */
  async applyPromoCode(userId, code) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // Mock promo codes
    const promoCodes = {
      'SAVE10': { discount: 10, message: '10% off applied!' },
      'SAVE20': { discount: 20, message: '20% off applied!' },
      'FREEDELIVERY': { discount: 5, message: 'Free delivery applied!' },
    };
    
    const promo = promoCodes[code.toUpperCase()];
    if (promo) {
      const subtotal = mockCart.getSubtotal();
      const discount = (subtotal * promo.discount) / 100;
      mockCart.promoCode = code;
      mockCart.discountAmount = discount;
      
      return {
        success: true,
        discount: discount,
        message: promo.message,
        code: code,
      };
    }
    
    return {
      success: false,
      discount: 0,
      message: 'Invalid promo code',
    };
  },

  /**
   * Remove promo code
   * @param {string} userId - User ID
   * @returns {Promise<Cart>}
   */
  async removePromoCode(userId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    mockCart.promoCode = '';
    mockCart.discountAmount = 0;
    
    return new Cart(mockCart);
  },

  /**
   * Update delivery type
   * @param {string} userId - User ID
   * @param {string} deliveryType - 'delivery' | 'pickup'
   * @returns {Promise<Cart>}
   */
  async updateDeliveryType(userId, deliveryType) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    mockCart.deliveryType = deliveryType;
    
    return new Cart(mockCart);
  },

  /**
   * Update delivery address
   * @param {string} userId - User ID
   * @param {Object} address - Delivery address
   * @returns {Promise<Cart>}
   */
  async updateDeliveryAddress(userId, address) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    mockCart.deliveryAddress = {
      street: address.street || '',
      city: address.city || '',
      state: address.state || '',
      zipCode: address.zipCode || '',
    };
    
    return new Cart(mockCart);
  },

  /**
   * Update order special instructions
   * @param {string} userId - User ID
   * @param {string} instructions - Special instructions
   * @returns {Promise<Cart>}
   */
  async updateOrderInstructions(userId, instructions) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    mockCart.specialInstructions = instructions;
    
    return new Cart(mockCart);
  },

  /**
   * Get cart totals
   * @param {string} userId - User ID
   * @returns {Promise<CartTotals>}
   */
  async getCartTotals(userId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const totals = mockCart.calculateTotals();
    return new CartTotals(totals);
  },

  /**
   * Validate cart before checkout
   * @param {string} userId - User ID
   * @returns {Promise<{valid: boolean, errors: string[]}>}
   */
  async validateCart(userId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const errors = [];
    
    if (mockCart.isEmpty()) {
      errors.push('Cart is empty');
    }
    
    if (mockCart.deliveryType === 'delivery') {
      const address = mockCart.deliveryAddress;
      if (!address.street || !address.city || !address.state || !address.zipCode) {
        errors.push('Please complete delivery address');
      }
    }
    
    // Check item availability
    mockCart.items.forEach((item) => {
      if (!item.isAvailable) {
        errors.push(`${item.name} is currently unavailable`);
      }
    });
    
    return {
      valid: errors.length === 0,
      errors,
    };
  },
};

export default cartService;