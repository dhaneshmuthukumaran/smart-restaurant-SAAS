// components/BookingSummary.jsx

import React from 'react';

const BookingSummary = ({
  booking,
  onEdit,
  onConfirm,
  onCancel,
  showActions = true,
  isLoading = false,
}) => {
  if (!booking) {
    return (
      <div style={{
        padding: '1.5rem',
        textAlign: 'center',
        color: '#6b7280',
        background: '#f9fafb',
        borderRadius: '0.5rem',
      }}>
        No booking details available
      </div>
    );
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: '0.9rem',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem 1.5rem',
        background: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h4 style={{
          margin: 0,
          fontSize: '1rem',
          fontWeight: '600',
          color: '#111827',
        }}>
          Booking Summary
        </h4>
        <span style={{
          padding: '0.2rem 0.8rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '600',
          background: booking.getStatusColor() + '20',
          color: booking.getStatusColor(),
        }}>
          {booking.getStatusLabel()}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        {/* Date & Time */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem',
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
              📅 Date
            </div>
            <div style={{ fontWeight: '600', color: '#111827' }}>
              {booking.getFormattedDate()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
              🕐 Time
            </div>
            <div style={{ fontWeight: '600', color: '#111827' }}>
              {booking.getFormattedTime()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
              👥 Guests
            </div>
            <div style={{ fontWeight: '600', color: '#111827' }}>
              {booking.partySize} {booking.partySize === 1 ? 'Guest' : 'Guests'}
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
            👤 Customer
          </div>
          <div style={{
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
          }}>
            <div style={{ fontWeight: '500', color: '#111827' }}>
              {booking.customer.name}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              {booking.customer.email}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              {booking.customer.phone}
            </div>
          </div>
        </div>

        {/* Special Requests */}
        {booking.customer.preferences && (
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
              📝 Special Requests
            </div>
            <div style={{
              padding: '0.75rem',
              background: '#f9fafb',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              color: '#374151',
            }}>
              {booking.customer.preferences.dietary && (
                <div><strong>Dietary:</strong> {booking.customer.preferences.dietary}</div>
              )}
              {booking.customer.preferences.seating && (
                <div><strong>Seating:</strong> {booking.customer.preferences.seating}</div>
              )}
              {booking.customer.preferences.specialOccasion && (
                <div><strong>Occasion:</strong> {booking.customer.preferences.specialOccasion}</div>
              )}
              {booking.customer.preferences.notes && (
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e5e7eb' }}>
                  {booking.customer.preferences.notes}
                </div>
              )}
              {!booking.customer.preferences.dietary && 
               !booking.customer.preferences.seating && 
               !booking.customer.preferences.specialOccasion && 
               !booking.customer.preferences.notes && (
                <div style={{ color: '#9ca3af' }}>No special requests</div>
              )}
            </div>
          </div>
        )}

        {/* Table Info */}
        {booking.table && booking.table.name && (
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
              🪑 Table
            </div>
            <div style={{
              padding: '0.75rem',
              background: '#f9fafb',
              borderRadius: '0.5rem',
            }}>
              <div style={{ fontWeight: '500', color: '#111827' }}>
                {booking.table.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                Capacity: {booking.table.capacity} guests
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                Duration: {booking.getDurationText()}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e5e7eb',
          }}>
            {onEdit && (
              <button
                onClick={onEdit}
                disabled={isLoading}
                style={{
                  padding: '0.6rem 1.5rem',
                  background: '#fff',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isLoading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                }}
              >
                ✏️ Edit
              </button>
            )}

            {onCancel && booking.canCancel() && (
              <button
                onClick={onCancel}
                disabled={isLoading}
                style={{
                  padding: '0.6rem 1.5rem',
                  background: '#fff',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isLoading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = '#fef2f2';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                }}
              >
                ❌ Cancel
              </button>
            )}

            {onConfirm && booking.status === 'pending' && (
              <button
                onClick={onConfirm}
                disabled={isLoading}
                style={{
                  padding: '0.6rem 1.5rem',
                  background: '#f1c40f',
                  color: '#0b0b0b',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isLoading ? 0.6 : 1,
                  marginLeft: 'auto',
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = '#f5d64a';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1c40f';
                }}
              >
                ✅ Confirm Booking
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;