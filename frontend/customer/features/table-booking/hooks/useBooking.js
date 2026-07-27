// hooks/useBooking.js

import { useState, useCallback } from 'react';
import bookingService from '../services/bookingService';

export const useBooking = () => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const createBooking = useCallback(async (bookingData) => {
    setLoading(true);
    setError(null);
    
    try {
      const booking = await bookingService.createBooking(bookingData);
      setCurrentBooking(booking);
      return booking;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBookings = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await bookingService.getUserBookings({
        page: pagination.page,
        limit: pagination.limit,
        ...params,
      });
      
      setBookings(response.bookings);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        pages: response.pages,
      });
      
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  const fetchBooking = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const booking = await bookingService.getBooking(id);
      setCurrentBooking(booking);
      return booking;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelBooking = useCallback(async (id, reason = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const booking = await bookingService.cancelBooking(id, reason);
      setCurrentBooking(booking);
      
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? booking : b))
      );
      
      return booking;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmBooking = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const booking = await bookingService.confirmBooking(id);
      setCurrentBooking(booking);
      
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? booking : b))
      );
      
      return booking;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkInBooking = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const booking = await bookingService.checkInBooking(id);
      setCurrentBooking(booking);
      
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? booking : b))
      );
      
      return booking;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCurrentBooking = useCallback(() => {
    setCurrentBooking(null);
  }, []);

  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const changeLimit = useCallback((limit) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  return {
    currentBooking,
    bookings,
    loading,
    error,
    pagination,
    createBooking,
    fetchBookings,
    fetchBooking,
    cancelBooking,
    confirmBooking,
    checkInBooking,
    clearCurrentBooking,
    changePage,
    changeLimit,
  };
};

export default useBooking;