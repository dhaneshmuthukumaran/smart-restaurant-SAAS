// types/cart.types.js

export const cartTypes = {};

/**
 * @typedef {Object} CartItem
 * @property {number|string} id - Unique cart item identifier
 * @property {number|string} dishId - Dish ID
 * @property {string} name - Dish name
 * @property {number} price - Price per item
 * @property {number} quantity - Quantity in cart
 * @property {string} image - Image URL
 * @property {string} description - Dish description
 * @property {string[]} dietary - Dietary tags
 * @property {string} category - Category name
 * @property {string} specialInstructions - Special instructions
 * @property {number} maxQuantity - Maximum quantity allowed
 * @property {boolean} isAvailable - Whether item is available
 */

/**
 * @typedef {Object} Cart
 * @property {Array<CartItem>} items - Cart items
 * @property {string} restaurantId - Restaurant ID
 * @property {string} branchId - Branch ID
 * @property {string} deliveryType - 'delivery' | 'pickup'
 * @property {Object} deliveryAddress - Delivery address
 * @property {string} deliveryAddress.street - Street address
 * @property {string} deliveryAddress.city - City
 * @property {string} deliveryAddress.state - State
 * @property {string} deliveryAddress.zipCode - ZIP code
 * @property {string} specialInstructions - Order special instructions
 * @property {string} promoCode - Applied promo code
 * @property {number} discountAmount - Discount amount
 */

/**
 * @typedef {Object} CartTotals
 * @property {number} subtotal - Subtotal amount
 * @property {number} tax - Tax amount
 * @property {number} deliveryFee - Delivery fee
 * @property {number} serviceFee - Service fee
 * @property {number} discount - Discount amount
 * @property {number} total - Total amount
 * @property {number} itemCount - Total item count
 * @property {number} uniqueItems - Number of unique items
 */

export const DeliveryTypes = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
};

export const DeliveryTypeLabels = {
  [DeliveryTypes.DELIVERY]: '🚚 Delivery',
  [DeliveryTypes.PICKUP]: '📦 Pickup',
};

export class CartItem {
  constructor(data) {
    this.id = data.id || `item_${Date.now()}`;
    this.dishId = data.dishId || data.id || '';
    this.name = data.name || '';
    this.price = data.price || 0;
    this.quantity = data.quantity || 1;
    this.image = data.image || '';
    this.description = data.description || '';
    this.dietary = data.dietary || [];
    this.category = data.category || '';
    this.specialInstructions = data.specialInstructions || '';
    this.maxQuantity = data.maxQuantity || 10;
    this.isAvailable = data.isAvailable !== undefined ? data.isAvailable : true;
  }

  /**
   * Get subtotal for this item
   */
  getSubtotal() {
    return this.price * this.quantity;
  }

  /**
   * Get formatted price
   */
  getFormattedPrice(currency = '$') {
    return `${currency}${this.price.toFixed(2)}`;
  }

  /**
   * Get formatted subtotal
   */
  getFormattedSubtotal(currency = '$') {
    return `${currency}${this.getSubtotal().toFixed(2)}`;
  }

  /**
   * Check if item is valid
   */
  isValid() {
    return this.dishId && this.name && this.price > 0 && this.quantity > 0;
  }

  /**
   * Get quantity display text
   */
  getQuantityText() {
    return `${this.quantity}x`;
  }
}

export class Cart {
  constructor(data = {}) {
    this.items = (data.items || []).map((item) => new CartItem(item));
    this.restaurantId = data.restaurantId || '';
    this.branchId = data.branchId || '';
    this.deliveryType = data.deliveryType || DeliveryTypes.PICKUP;
    this.deliveryAddress = data.deliveryAddress || {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    };
    this.specialInstructions = data.specialInstructions || '';
    this.promoCode = data.promoCode || '';
    this.discountAmount = data.discountAmount || 0;
  }

  /**
   * Get total item count (sum of all quantities)
   */
  getTotalItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * Get unique item count
   */
  getUniqueItemCount() {
    return this.items.length;
  }

  /**
   * Get subtotal (sum of all item subtotals)
   */
  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  /**
   * Check if cart is empty
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Get item by dish ID
   */
  getItemByDishId(dishId) {
    return this.items.find((item) => item.dishId === dishId);
  }

  /**
   * Check if cart has a specific dish
   */
  hasDish(dishId) {
    return this.items.some((item) => item.dishId === dishId);
  }

  /**
   * Get quantity of a specific dish
   */
  getDishQuantity(dishId) {
    const item = this.getItemByDishId(dishId);
    return item ? item.quantity : 0;
  }

  /**
   * Check if restaurant is consistent
   */
  isRestaurantConsistent(restaurantId) {
    if (this.isEmpty()) return true;
    return this.restaurantId === restaurantId;
  }

  /**
   * Calculate totals
   */
  calculateTotals(taxRate = 0.08, deliveryFee = 3.99, serviceFee = 1.99) {
    const subtotal = this.getSubtotal();
    const tax = subtotal * taxRate;
    const discount = this.discountAmount || 0;
    const delivery = this.deliveryType === DeliveryTypes.DELIVERY ? deliveryFee : 0;
    const service = subtotal > 0 ? serviceFee : 0;
    const total = subtotal + tax + delivery + service - discount;

    return {
      subtotal,
      tax,
      deliveryFee: delivery,
      serviceFee: service,
      discount,
      total: Math.max(0, total),
      itemCount: this.getTotalItemCount(),
      uniqueItems: this.getUniqueItemCount(),
    };
  }
}

export class CartTotals {
  constructor(data) {
    this.subtotal = data.subtotal || 0;
    this.tax = data.tax || 0;
    this.deliveryFee = data.deliveryFee || 0;
    this.serviceFee = data.serviceFee || 0;
    this.discount = data.discount || 0;
    this.total = data.total || 0;
    this.itemCount = data.itemCount || 0;
    this.uniqueItems = data.uniqueItems || 0;
  }

  /**
   * Get formatted subtotal
   */
  getFormattedSubtotal(currency = '$') {
    return `${currency}${this.subtotal.toFixed(2)}`;
  }

  /**
   * Get formatted total
   */
  getFormattedTotal(currency = '$') {
    return `${currency}${this.total.toFixed(2)}`;
  }

  /**
   * Get formatted tax
   */
  getFormattedTax(currency = '$') {
    return `${currency}${this.tax.toFixed(2)}`;
  }

  /**
   * Get formatted delivery fee
   */
  getFormattedDeliveryFee(currency = '$') {
    return `${currency}${this.deliveryFee.toFixed(2)}`;
  }

  /**
   * Get formatted discount
   */
  getFormattedDiscount(currency = '$') {
    return `${currency}${this.discount.toFixed(2)}`;
  }
}