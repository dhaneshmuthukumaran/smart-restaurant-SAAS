// components/SpecialRequests.jsx

import React from 'react';

const SpecialRequests = ({
  value = '',
  onChange,
  dietary = '',
  onDietaryChange,
  seating = '',
  onSeatingChange,
  occasion = '',
  onOccasionChange,
  disabled = false,
}) => {
  const seatingOptions = [
    { value: '', label: 'No preference' },
    { value: 'indoor', label: 'Indoor' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'window', label: 'Window' },
    { value: 'bar', label: 'Bar' },
    { value: 'private', label: 'Private Room' },
  ];

  const occasionOptions = [
    { value: '', label: 'No special occasion' },
    { value: 'birthday', label: '🎂 Birthday' },
    { value: 'anniversary', label: '💕 Anniversary' },
    { value: 'date', label: '🌹 Date Night' },
    { value: 'business', label: '💼 Business' },
    { value: 'family', label: '👨‍👩‍👧‍👦 Family Dinner' },
    { value: 'celebration', label: '🎉 Celebration' },
  ];

  const dietaryOptions = [
    { value: '', label: 'No restrictions' },
    { value: 'vegetarian', label: '🥬 Vegetarian' },
    { value: 'vegan', label: '🌱 Vegan' },
    { value: 'gluten-free', label: '🌾 Gluten-Free' },
    { value: 'dairy-free', label: '🥛 Dairy-Free' },
    { value: 'nut-free', label: '🥜 Nut-Free' },
    { value: 'halal', label: '☪️ Halal' },
    { value: 'kosher', label: '✡️ Kosher' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      {/* Dietary Preferences */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.25rem',
        }}>
          Dietary Preferences
        </label>
        <select
          value={dietary}
          onChange={(e) => onDietaryChange?.(e.target.value)}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            color: '#111827',
            background: disabled ? '#f3f4f6' : '#fff',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
        >
          {dietaryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Seating Preference */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.25rem',
        }}>
          Seating Preference
        </label>
        <select
          value={seating}
          onChange={(e) => onSeatingChange?.(e.target.value)}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            color: '#111827',
            background: disabled ? '#f3f4f6' : '#fff',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
        >
          {seatingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Special Occasion */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.25rem',
        }}>
          Special Occasion
        </label>
        <select
          value={occasion}
          onChange={(e) => onOccasionChange?.(e.target.value)}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            color: '#111827',
            background: disabled ? '#f3f4f6' : '#fff',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
        >
          {occasionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Additional Notes */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.25rem',
        }}>
          Additional Notes
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          placeholder="Any other special requests or notes for the restaurant..."
          rows="3"
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            background: disabled ? '#f3f4f6' : '#fff',
            transition: 'border-color 0.2s ease',
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: '#6b7280',
          marginTop: '0.25rem',
        }}>
          <span>Optional</span>
          <span>{value?.length || 0}/500</span>
        </div>
      </div>
    </div>
  );
};

export default SpecialRequests;