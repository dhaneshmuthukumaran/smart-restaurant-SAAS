import { useMemo } from 'react';

export const useRatings = (reviews = []) => {
  const summary = useMemo(() => {
    const totalReviews = reviews.length;
    const averageRating = totalReviews
      ? reviews.reduce((sum, item) => sum + (item.rating || 0), 0) / totalReviews
      : 0;

    const breakdown = reviews.reduce((acc, item) => {
      const stars = Math.min(5, Math.max(1, Math.round(item.rating || 0)));
      acc[stars] = (acc[stars] || 0) + 1;
      return acc;
    }, {});

    return {
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      breakdown,
    };
  }, [reviews]);

  return summary;
};

export default useRatings;
