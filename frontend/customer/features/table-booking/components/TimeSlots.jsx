// components/TimeSlots.jsx

import React from 'react';

const TimeSlots = ({
  slots = [],
  selectedSlot,
  onSlotSelect,
  isLoading = false,
}) => {
  const getStatusStyle = (slot) => {
    if (!slot.isAvailable) {
      return {
        background: '#f3f4f6',
        color: '#9ca3af',
        borderColor: '#e5e7eb',
        cursor: 'not-allowed',
      };
    }

    if (slot.status === 'limited') {
      return {
        background: '#fefce8',
        color: '#f1c40f',
        borderColor: '#f1c40f',
        cursor: 'pointer',
      };
    }

    return {
      background: '#fff',
      color: '#111827',
      borderColor: '#e5e7eb',
      cursor: 'pointer',
    };
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '0.5rem',
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              height: '3rem',
              background: '#f3f4f6',
              borderRadius: '0.5rem',
            }}
          />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
          background: '#f9fafb',
          borderRadius: '0.5rem',
        }}
      >
        <p style={{ margin: 0, color: '#6b7280' }}>
          No time slots available for this date.
        </p>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#9ca3af' }}>
          Please select another date.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#374151' }}>
          Select a time
        </h4>
        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '12px', height: '12px', background: '#2ecc71', borderRadius: '50%' }} />
            Available
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '12px', height: '12px', background: '#f39c12', borderRadius: '50%' }} />
            Limited
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: '12px', height: '12px', background: '#d1d5db', borderRadius: '50%' }} />
            Unavailable
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '0.5rem',
        }}
      >
        {slots.map((slot) => {
          const isSelected = selectedSlot?.time === slot.time;
          const statusStyle = getStatusStyle(slot);
          const isDisabled = !slot.isAvailable;

          return (
            <button
              key={slot.time}
              type="button"
              onClick={() => !isDisabled && onSlotSelect?.(slot)}
              disabled={isDisabled}
              style={{
                padding: '0.75rem 0.5rem',
                border: '1px solid',
                borderRadius: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: isSelected ? 600 : 500,
                background: statusStyle.background,
                color: statusStyle.color,
                borderColor: statusStyle.borderColor,
                cursor: statusStyle.cursor,
                opacity: isDisabled ? 0.7 : 1,
              }}
            >
              <div>{slot.time}</div>
              {slot.status === 'limited' && (
                <div style={{ fontSize: '0.7rem', marginTop: '0.2rem', opacity: 0.8 }}>
                  Limited
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;
