// components/OrderList.jsx

import React from 'react';
import OrderCard from './OrderCard';
import OrderEmpty from './OrderEmpty';
import OrderSkeleton from './OrderSkeleton';
import styles from '../styles/Orders.module.css';

const OrderList = ({
  orders = [],
  loading = false,
  pagination,
  onPageChange,
  onView,
  onCancel,
  onReorder,
  onBrowseClick,
  emptyMessage = 'No orders found',
}) => {
  // Loading state
  if (loading) {
    return <OrderSkeleton count={5} />;
  }

  // Empty state
  if (orders.length === 0) {
    return (
      <OrderEmpty
        message={emptyMessage}
        subMessage="Start ordering from your favorite restaurants!"
        onBrowseClick={onBrowseClick}
      />
    );
  }

  return (
    <div className={styles.orderList}>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onView={onView}
          onCancel={onCancel}
          onReorder={onReorder}
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

export default OrderList;