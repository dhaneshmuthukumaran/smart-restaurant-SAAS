import React from 'react';
import MenuCard from './MenuCard';

const MenuGrid = ({ 
  dishes = [], 
  loading = false, 
  onDishSelect, 
  onAddToCart,
  columns = 3,
  emptyMessage = 'No dishes available'
}) => {
  // Loading skeleton
  if (loading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '1.5rem',
        marginTop: '1.5rem',
      }}>
        {[...Array(6)].map((_, index) => (
          <div
            key={`skeleton-${index}`}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '0.9rem',
              overflow: 'hidden',
              background: '#fff',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          >
            <div style={{
              width: '100%',
              paddingTop: '60%',
              background: '#f3f4f6',
            }} />
            <div style={{ padding: '1rem' }}>
              <div style={{
                height: '1rem',
                background: '#f3f4f6',
                borderRadius: '0.25rem',
                marginBottom: '0.5rem',
                width: '70%',
              }} />
              <div style={{
                height: '0.75rem',
                background: '#f3f4f6',
                borderRadius: '0.25rem',
                marginBottom: '0.5rem',
                width: '90%',
              }} />
              <div style={{
                height: '0.75rem',
                background: '#f3f4f6',
                borderRadius: '0.25rem',
                width: '50%',
              }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!dishes || dishes.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 1.5rem',
        background: '#fff',
        borderRadius: '0.9rem',
        border: '1px solid #e5e7eb',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🍽️</div>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>{emptyMessage}</h3>
        <p style={{ margin: 0, color: '#6b7280' }}>
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: '1.5rem',
      marginTop: '1.5rem',
    }}>
      {dishes.map((dish) => (
        <MenuCard
          key={dish.id}
          dish={dish}
          onSelect={onDishSelect}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default MenuGrid;