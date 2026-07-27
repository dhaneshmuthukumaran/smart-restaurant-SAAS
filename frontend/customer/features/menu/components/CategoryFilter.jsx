import React from 'react';

const CategoryFilter = ({
  categories = [],
  selectedCategories = [],
  onCategoryToggle,
  showAll = true,
}) => {
  const handleCategoryClick = (categoryName) => {
    if (categoryName === 'all') {
      // If 'all' is clicked, clear all selections
      if (selectedCategories.length > 0) {
        // Pass 'all' as a special flag to clear selections
        onCategoryToggle('all');
      }
      return;
    }
    onCategoryToggle(categoryName);
  };

  const isAllSelected = selectedCategories.length === 0;

  return (
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      overflowX: 'auto',
      padding: '0.5rem 0',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      {showAll && (
        <button
          onClick={() => handleCategoryClick('all')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            border: isAllSelected ? '2px solid #f1c40f' : '1px solid #e5e7eb',
            background: isAllSelected ? '#fefce8' : '#fff',
            color: isAllSelected ? '#f1c40f' : '#6b7280',
            fontWeight: isAllSelected ? '600' : '500',
            fontSize: '0.85rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!isAllSelected) {
              e.currentTarget.style.borderColor = '#f1c40f';
              e.currentTarget.style.background = '#fefce8';
            }
          }}
          onMouseLeave={(e) => {
            if (!isAllSelected) {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = '#fff';
            }
          }}
        >
          <span>🍽️</span>
          <span>All</span>
        </button>
      )}

      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category.name);
        return (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: isSelected ? '2px solid #f1c40f' : '1px solid #e5e7eb',
              background: isSelected ? '#fefce8' : '#fff',
              color: isSelected ? '#f1c40f' : '#6b7280',
              fontWeight: isSelected ? '600' : '500',
              fontSize: '0.85rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = '#f1c40f';
                e.currentTarget.style.background = '#fefce8';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.background = '#fff';
              }
            }}
          >
            <span>{category.icon || '🍽️'}</span>
            <span>{category.name}</span>
            {category.count > 0 && (
              <span style={{
                background: isSelected ? '#f1c40f' : '#f3f4f6',
                color: isSelected ? '#fff' : '#6b7280',
                fontSize: '0.7rem',
                padding: '0.1rem 0.5rem',
                borderRadius: '9999px',
                marginLeft: '0.2rem',
              }}>
                {category.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;