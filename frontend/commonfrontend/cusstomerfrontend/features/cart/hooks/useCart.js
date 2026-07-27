// hooks/useCart.js

import { useState, useEffect, useCallback, useMemo } from 'react';
import cartService from '../services/cartService';

const CART_STORAGE_KEY = 'user_cart';

export const useCart = (userId) => {
  const [items, setItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Load cart from localStorage or API
   */
  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let cartData;
      
      // Try localStorage first
      if (userId) {
        const saved = localStorage.getItem(`${CART_STORAGE_KEY}_${userId}`);
        if (saved) {
          cartData = JSON.parse(saved);
        }
      }

      // If not in localStorage or no userId, load from API
      if (!cartData || !userId) {
        const data = await cartService.getCart(userId || 'guest');
        cartData = data;
      }

      if (cartData) {
        setItems(cartData.items || []);
        setRestaurantId(cartData.restaurantId || '');
        setBranchId(cartData.branchId || '');
        setDeliveryType(cartData.deliveryType || 'pickup');
        setDeliveryAddress(cartData.deliveryAddress || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
        });
        setSpecialInstructions(cartData.specialInstructions || '');
        setPromoCode(cartData.promoCode || '');
        setDiscountAmount(cartData.discountAmount || 0);
      }
    } catch (err) {
      setError(err.message || 'Failed to load cart');
      console.error('Failed to load cart:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Save cart to localStorage
   */
  const saveCart = useCallback((cartData) => {
    if (userId) {
      localStorage.setItem(
        `${CART_STORAGE_KEY}_${userId}`,
        JSON.stringify(cartData)
      );
    }
  }, [userId]);

  /**
   * Add item to cart
   */
  const addItem = useCallback(async (itemData, quantity = 1) => {
    setLoading(true);
    setError(null);

    try {
      const cart = await cartService.addToCart(
        userId || 'guest',
        itemData,
        quantity
      );
      
      setItems(cart.items);
      setRestaurantId(cart.restaurantId);
      setBranchId(cart.branchId);
      setDeliveryType(cart.deliveryType);
      setDeliveryAddress(cart.deliveryAddress);
      setSpecialInstructions(cart.specialInstructions);
      setPromoCode(cart.promoCode);
      setDiscountAmount(cart.discountAmount);
      
      saveCart(cart);
      return cart;
    } catch (err) {
      setError(err.message || 'Failed to add item');
      console.error('Failed to add item:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, saveCart]);

  /**
   * Remove item from cart
   */
  const removeItem = useCallback(async (itemId) => {
    setLoading(true);
    setError(null);

    try {
      const cart = await cartService.removeFromCart(userId || 'guest', itemId);
      
      setItems(cart.items);
      setRestaurantId(cart.restaurantId);
      setBranchId(cart.branchId);
      
      saveCart(cart);
      return cart;
    } catch (err) {
      setError(err.message || 'Failed to remove item');
      console.error('Failed to remove item:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, saveCart]);

  /**
   * Update item quantity
   */
  const updateQuantity = useCallback(async (itemId, quantity) => {
    setLoading(true);
    setError(null);

    try {
      const cart = await cartService.updateQuantity(
        userId || 'guest',
        itemId,
        quantity
      );
      
      setItems(cart.items);
      setRestaurantId(cart.restaurantId);
      setBranchId(cart.branchId);
      
      saveCart(cart);
      return cart;
    } catch (err) {
      setError(err.message || 'Failed to update quantity');
      console.error('Failed to update quantity:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, saveCart]);

  /**
   * Update item special instructions
   */
  const updateItemInstructions = useCallback(async (itemId, instructions) => {
    setLoading(true);
    setError(null);

    try {
      const cart = await cartService.updateItemInstructions(
        userId || 'guest',
        itemId,
        instructions
      );
      
      setItems(cart.items);
      saveCart(cart);
      return cart;
    } catch (err) {
      setError(err.message || 'Failed to update instructions');
      console.error('Failed to update instructions:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, saveCart]);

  /**
   * Clear cart
   */
  const clearCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const cart = await cartService.clearCart(userId || 'guest');
      
      setItems(cart.items);
      setRestaurantId(cart.restaurantId);
      setBranchId(cart.branchId);
      setPromoCode('');
      setDiscountAmount(0);
      
      if (userId) {
        localStorage.removeItem(`${CART_STORAGE_KEY}_${userId}`);
      }
      
      return cart;
    } catch (err) {
      setError(err.message || 'Failed to clear cart');
      console.error('Failed to clear cart:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Apply promo code
   */
  const applyPromoCode = useCallback(async (code) => {
    setLoading(true);
    setError(null);

    try {
      const result = await cartService.applyPromoCode(userId || 'guest', code);
      
      if (result.success) {
        setPromoCode(result.code);
        setDiscountAmount(result.discount);
        
        // Update local storage
        const cart = {
          items,
          restaurantId,
          branchId,
          deliveryType,
          deliveryAddress,
          specialInstructions,
          promoCode: result.code,
          discountAmount: result.discount,
        };
        saveCart(cart);
      }
      
      return result;
    } catch (err) {
      setError(err.message || 'Failed to apply promo code');
      console.error('Failed to apply promo code:', err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [userId, items, restaurantId, branchId, deliveryType, deliveryAddress, specialInstructions, saveCart]);

  /**
   * Remove promo code
   */
  const removePromoCode = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const cart = await cartService.removePromoCode(userId || 'guest');
      
      setPromoCode(cart.promoCode);
      setDiscountAmount(cart.discountAmount);
      
      saveCart(cart);
      return cart;
    } catch (err) {
      setError(err.message || 'Failed to remove promo code');
      console.error('Failed to remove promo code:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, saveCart]);

  /**
   * Update delivery type
   */
  const updateDeliveryType = useCallback(async (type) => {
    setLoading(true);
    setError(null);

    try {
      const cart = await cartService.updateDeliveryType(userId || 'guest', type);
      
      setDeliveryType(cart.deliveryType);
      saveCart(cart);
      return cart;
    } catch (err) {
      setError(err.message || 'Failed to update delivery type');
      console.error('Failed to update delivery type:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, saveCart]);

  /**
   * Update delivery address
   */
  const updateDeliveryAddress = useCallback(async (address) => {
    setLoading(true);
    setError(null);

    try {
      const cart = await cartService.updateDeliveryAddress(userId || 'guest', address);
      
      setDeliveryAddress(cart.deliveryAddress);
      saveCart(cart);
      return cart;
    } catch (err) {
      setError(err.message || 'Failed to update delivery address');
      console.error('Failed to update delivery address:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, saveCart]);

  /**
   * Update order special instructions
   */
  const updateOrderInstructions = useCallback(async (instructions) => {
    setLoading(true);
    setError(null);

    try {
      const cart = await cartService.updateOrderInstructions(userId || 'guest', instructions);
      
      setSpecialInstructions(cart.specialInstructions);
      saveCart(cart);
      return cart;
    } catch (err) {
      setError(err.message || 'Failed to update instructions');
      console.error('Failed to update instructions:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, saveCart]);

  /**
   * Get item count
   */
  const getItemCount = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  /**
   * Get quantity of specific dish
   */
  const getItemQuantity = useCallback((dishId) => {
    const item = items.find((item) => item.dishId === dishId);
    return item ? item.quantity : 0;
  }, [items]);

  /**
   * Check if cart contains a dish
   */
  const hasItem = useCallback((dishId) => {
    return items.some((item) => item.dishId === dishId);
  }, [items]);

  /**
   * Check if cart is empty
   */
  const isEmpty = useMemo(() => {
    return items.length === 0;
  }, [items]);

  /**
   * Get cart totals
   */
  const getTotals = useCallback(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const delivery = deliveryType === 'delivery' ? 3.99 : 0;
    const service = items.length > 0 ? 1.99 : 0;
    const total = subtotal + tax + delivery + service - discountAmount;

    return {
      subtotal,
      tax,
      deliveryFee: delivery,
      serviceFee: service,
      discount: discountAmount,
      total: Math.max(0, total),
      itemCount: getItemCount(),
      uniqueItems: items.length,
    };
  }, [items, deliveryType, discountAmount, getItemCount]);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return {
    // State
    items,
    restaurantId,
    branchId,
    deliveryType,
    deliveryAddress,
    specialInstructions,
    promoCode,
    discountAmount,
    loading,
    error,
    isEmpty,

    // Actions
    loadCart,
    addItem,
    removeItem,
    updateQuantity,
    updateItemInstructions,
    clearCart,
    applyPromoCode,
    removePromoCode,
    updateDeliveryType,
    updateDeliveryAddress,
    updateOrderInstructions,
    getItemCount,
    getItemQuantity,
    hasItem,
    getTotals,
  };
};

export default useCart;