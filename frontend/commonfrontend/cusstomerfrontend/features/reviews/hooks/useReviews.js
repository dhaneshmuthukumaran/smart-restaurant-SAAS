import { useState, useEffect, useCallback } from 'react';
import reviewsService from '../services/reviewsService';
import { ReviewFilters } from '../types/reviews.types';

const buildQueryParams = (filters, page, limit) => {
  return {
    rating: filters.rating !== 'all' ? filters.rating : undefined,
    sortBy: filters.sortBy,
    search: filters.search || undefined,
    page,
    limit,
  };
};

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState(new ReviewFilters());
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = buildQueryParams(filters, pagination.page, pagination.limit);
      const response = await reviewsService.getReviews(params);
      setReviews(response.reviews);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        pages: response.pages,
      });
    } catch (err) {
      setError(err.message || 'Unable to load reviews');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const changeFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const changeLimit = useCallback((limit) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  return {
    reviews,
    filters,
    pagination,
    loading,
    error,
    fetchReviews,
    changeFilters,
    changePage,
    changeLimit,
  };
};

export default useReviews;
