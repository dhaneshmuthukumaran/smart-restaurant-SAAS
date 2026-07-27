// components/ReviewList.jsx

import React from 'react';
import ReviewCard from './ReviewCard';
import ReviewEmpty from './ReviewEmpty';
import ReviewSkeleton from './ReviewSkeleton';
import styles from '../styles/Reviews.module.css';

const ReviewList = ({
  reviews = [],
  loading = false,
  pagination,
  onPageChange,
  onHelpful,
  onReport,
  onEdit,
  onDelete,
  onWriteReview,
  emptyMessage = 'No reviews yet',
}) => {
  // Loading state
  if (loading) {
    return <ReviewSkeleton count={5} />;
  }

  // Empty state
  if (reviews.length === 0) {
    return (
      <ReviewEmpty
        message={emptyMessage}
        onWriteReview={onWriteReview}
      />
    );
  }

  return (
    <div className={styles.reviewList}>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onHelpful={onHelpful}
          onReport={onReport}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange?.(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange?.(pagination.page + 1)}
            disabled={pagination.page >= pagination.pages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;