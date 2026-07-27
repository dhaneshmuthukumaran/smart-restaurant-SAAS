import React from 'react';

const DietaryFilters = ({
  selectedDietary = [],
  onDietaryToggle,
  availableDietary = [],
}) => {
  // Default dietary options if none provided
  const dietaryOptions = availableDietary.length > 0 
    ? availableDietary 
    : ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'High Protein', 'Low Carb', 'Organic'];

  // Icon mapping for dietary tags
  const getDietaryIcon = (tag) => {
    const icons = {
      'Vegetarian': '🥬',
      'Vegan': '🌱',
      'Gluten-Free': '🌾',
      'Dairy-Free': '🥛',
      'Nut-Free': '🥜',
      'High Protein': '💪',
      'Low Carb': '🥑',
      'Organic': '🌿',
    };
    return icons[tag] || '✅';
  };

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      padding: '0.5rem 0',
    }}>
      {dietaryOptions.map((tag) => {
        const isSelected = selectedDietary.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onDietaryToggle(tag)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.8rem',
              borderRadius: '9999px',
              border: isSelected ? '2px solid #f1c40f' : '1px solid #e5e7eb',
              background: isSelected ? '#fefce8' : '#fff',
              color: isSelected ? '#f1c40f' : '#6b7280',
              fontWeight: isSelected ? '600' : '500',
              fontSize: '0.8rem',
              cursor: 'pointer',
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
            <span>{isSelected ? '✅' : '⬜'}</span>
            <span>{getDietaryIcon(tag)}</span>
            <span>{tag}</span>
          </button>
        );
      })}
    </div>
  );
};

export default DietaryFilters;