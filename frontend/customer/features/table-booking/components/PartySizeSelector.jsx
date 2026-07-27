// components/PartySizeSelector.jsx

import React from 'react';

const PartySizeSelector = ({
  value = 2,
  onChange,
  min = 1,
  max = 20,
  label = 'Number of Guests',
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= min && val <= max && !disabled) {
      onChange(val);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    }}>
      {label && (
        <label style={{
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#374151',
        }}>
          {label}
          <span style={{ color: '#6b7280', fontSize: '0.8rem', marginLeft: '0.25rem' }}>
            ({min} - {max})
          </span>
        </label>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        {/* Decrement Button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          style={{
            width: '2.5rem',
            height: '2.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            background: '#fff',
            fontSize: '1.2rem',
            cursor: disabled || value <= min ? 'not-allowed' : 'pointer',
            opacity: disabled || value <= min ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!disabled && value > min) {
              e.currentTarget.style.background = '#f9fafb';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
          }}
        >
          −
        </button>

        {/* Value Display */}
        <div style={{
          minWidth: '3rem',
          textAlign: 'center',
        }}>
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            min={min}
            max={max}
            style={{
              width: '4rem',
              padding: '0.4rem 0.2rem',
              textAlign: 'center',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#111827',
              background: disabled ? '#f3f4f6' : '#fff',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#f1c40f';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb';
            }}
          />
        </div>

        {/* Increment Button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          style={{
            width: '2.5rem',
            height: '2.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            background: '#fff',
            fontSize: '1.2rem',
            cursor: disabled || value >= max ? 'not-allowed' : 'pointer',
            opacity: disabled || value >= max ? 0.5 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!disabled && value < max) {
              e.currentTarget.style.background = '#f9fafb';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
          }}
        >
          +
        </button>

        {/* Guest Count Display */}
        <span style={{
          fontSize: '0.85rem',
          color: '#6b7280',
          marginLeft: '0.25rem',
        }}>
          {value === 1 ? 'Guest' : 'Guests'}
        </span>
      </div>

      {/* Quick Select Options */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginTop: '0.25rem',
      }}>
        {[1, 2, 3, 4, 6, 8].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => !disabled && onChange(num)}
            disabled={disabled}
            style={{
              padding: '0.2rem 0.8rem',
              border: value === num ? '2px solid #f1c40f' : '1px solid #e5e7eb',
              borderRadius: '9999px',
              background: value === num ? '#fefce8' : '#fff',
              color: value === num ? '#f1c40f' : '#6b7280',
              fontSize: '0.8rem',
              fontWeight: value === num ? '600' : '400',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.5 : 1,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!disabled && value !== num) {
                e.currentTarget.style.borderColor = '#f1c40f';
                e.currentTarget.style.background = '#fefce8';
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled && value !== num) {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.background = '#fff';
              }
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PartySizeSelector;