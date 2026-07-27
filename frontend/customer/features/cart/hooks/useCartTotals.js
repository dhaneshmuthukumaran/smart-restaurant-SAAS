// hooks/useCartTotals.js

import { useMemo } from 'react';
import useCart from './useCart';
import { CartTotals } from '../types/cart.types';

export const useCartTotals = (userId, taxRate = 0.08, deliveryFee = 3.99, serviceFee = 1.99) => {
  const { items, deliveryType, discountAmount, loading } = useCart(userId);

  const totals = useMemo(() => {
    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Calculate tax
    const tax = subtotal * taxRate;
    
    // Calculate delivery fee
    const delivery = deliveryType === 'delivery' ? deliveryFee : 0;
    
    // Calculate service fee (only if cart has items)
    const service = items.length > 0 ? serviceFee : 0;
    
    // Calculate total
    const total = subtotal + tax + delivery + service - discountAmount;
    
    // Get item count
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    return new CartTotals({
      subtotal,
      tax,
      deliveryFee: delivery,
      serviceFee: service,
      discount: discountAmount,
      total: Math.max(0, total),
      itemCount,
      uniqueItems: items.length,
    });
  }, [items, deliveryType, discountAmount, taxRate, deliveryFee, serviceFee]);

  const formattedTotals = useMemo(() => {
    return {
      subtotal: totals.getFormattedSubtotal(),
      tax: totals.getFormattedTax(),
      deliveryFee: totals.getFormattedDeliveryFee(),
      total: totals.getFormattedTotal(),
      discount: totals.getFormattedDiscount(),
    };
  }, [totals]);

  const isEligibleForDelivery = useMemo(() => {
    return totals.subtotal > 15; // Minimum order for delivery
  }, [totals]);

  const isEligibleForDiscount = useMemo(() => {
    return totals.subtotal > 20; // Minimum order for discount
  }, [totals]);

  const hasItems = useMemo(() => {
    return items.length > 0;
  }, [items]);

  return {
    totals,
    formattedTotals,
    isEligibleForDelivery,
    isEligibleForDiscount,
    hasItems,
    loading,
    itemCount: totals.itemCount,
    uniqueItems: totals.uniqueItems,
  };
};

export default useCartTotals;