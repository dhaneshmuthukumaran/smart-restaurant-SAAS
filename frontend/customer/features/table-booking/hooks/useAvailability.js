// hooks/useAvailability.js

import { useState, useEffect, useCallback } from 'react';
import bookingService from '../services/bookingService';

export const useAvailability = (options = {}) => {
  const {
    branchId,
    date,
    partySize = 2,
    duration = 90,
    autoFetch = true,
  } = options;

  const [availability, setAvailability] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailability = useCallback(async () => {
    if (!branchId || !date) {
      setError(new Error('Branch ID and date are required'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await bookingService.getAvailability({
        branchId,
        date,
        partySize,
        duration,
      });

      setAvailability(data);
      setSlots(data.slots || []);
      
      const firstAvailable = data.slots.find((slot) => slot.isAvailable);
      if (firstAvailable) {
        setSelectedSlot(firstAvailable);
      } else {
        setSelectedSlot(null);
      }
    } catch (err) {
      setError(err);
      console.error('Failed to fetch availability:', err);
    } finally {
      setLoading(false);
    }
  }, [branchId, date, partySize, duration]);

  const selectSlot = useCallback((slot) => {
    if (!slot.isAvailable) {
      setError(new Error('This time slot is not available'));
      return;
    }
    setSelectedSlot(slot);
    setError(null);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedSlot(null);
  }, []);

  const getAvailableSlots = useCallback(() => {
    return slots.filter((slot) => slot.isAvailable);
  }, [slots]);

  useEffect(() => {
    if (autoFetch) {
      fetchAvailability();
    }
  }, [autoFetch, fetchAvailability]);

  return {
    availability,
    slots,
    selectedSlot,
    loading,
    error,
    hasAvailability: slots.length > 0,
    hasAvailableSlots: slots.some((slot) => slot.isAvailable),
    fetchAvailability,
    selectSlot,
    clearSelection,
    getAvailableSlots,
    setSelectedSlot,
  };
};

export default useAvailability;