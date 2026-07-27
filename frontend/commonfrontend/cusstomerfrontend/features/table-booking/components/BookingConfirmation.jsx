// components/BookingConfirmation.jsx

import React from 'react';

const BookingConfirmation = ({
  booking,
  onViewBookings,
  onBackHome,
}) => {
  if (!booking) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 1.5rem',
        background: '#fff',
        borderRadius: '0.9rem',
        border: '1px solid #e5e7eb',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>❌</div>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>
          Booking Not Found
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
          We couldn't find your booking details.
        </p>
        <button
          onClick={onBackHome}
          style={{
            padding: '0.6rem 1.5rem',
            background: '#f1c40f',
            color: '#0b0b0b',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Go Home
        </button>
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
      {/* Success Header */}
      <div style={{
        background: '#f0fdf4',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        borderBottom: '1px solid #dcfce7',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>✅</div>
        <h2 style={{
          margin: '0 0 0.25rem 0',
          color: '#166534',
          fontSize: '1.5rem',
        }}>
          Booking Confirmed!
        </h2>
        <p style={{
          margin: 0,
          color: '#15803d',
          fontSize: '0.95rem',
        }}>
          Your table has been reserved successfully.
        </p>
      </div>

      {/* Booking Details */}
      <div style={{ padding: '1.5rem' }}>
        <h4 style={{
          margin: '0 0 1rem 0',
          color: '#374151',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Booking Details
        </h4>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}>
          {/* Booking ID */}
          <div style={{
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
              Booking ID
            </div>
            <div style={{ fontWeight: '600', color: '#111827', fontFamily: 'monospace' }}>
              #{booking.id}
            </div>
          </div>

          {/* Status */}
          <div style={{
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
              Status
            </div>
            <div style={{
              fontWeight: '600',
              color: booking.getStatusColor(),
            }}>
              {booking.getStatusLabel()}
            </div>
          </div>

          {/* Date */}
          <div style={{
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
              Date
            </div>
            <div style={{ fontWeight: '600', color: '#111827' }}>
              {booking.getFormattedDate()}
            </div>
          </div>

          {/* Time */}
          <div style={{
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
              Time
            </div>
            <div style={{ fontWeight: '600', color: '#111827' }}>
              {booking.getFormattedTime()}
            </div>
          </div>

          {/* Party Size */}
          <div style={{
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
              Guests
            </div>
            <div style={{ fontWeight: '600', color: '#111827' }}>
              {booking.partySize} {booking.partySize === 1 ? 'Guest' : 'Guests'}
            </div>
          </div>

          {/* Table */}
          {booking.table?.name && (
            <div style={{
              padding: '0.75rem',
              background: '#f9fafb',
              borderRadius: '0.5rem',
            }}>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>
                Table
              </div>
              <div style={{ fontWeight: '600', color: '#111827' }}>
                {booking.table.name}
              </div>
            </div>
          )}
        </div>

        {/* Customer Details */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{
            margin: '0 0 0.5rem 0',
            color: '#374151',
            fontSize: '0.85rem',
            fontWeight: '600',
          }}>
            Customer Information
          </h4>
          <div style={{
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ fontWeight: '500', color: '#374151' }}>
                {booking.customer.name}
              </span>
              <span style={{ color: '#6b7280' }}>•</span>
              <span style={{ color: '#6b7280' }}>{booking.customer.email}</span>
              <span style={{ color: '#6b7280' }}>•</span>
              <span style={{ color: '#6b7280' }}>{booking.customer.phone}</span>
            </div>
            {booking.customer.preferences?.notes && (
              <div style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                background: '#fff',
                borderRadius: '0.25rem',
                fontSize: '0.85rem',
                color: '#6b7280',
              }}>
                <strong>Special Requests:</strong> {booking.customer.preferences.notes}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}>
          {onViewBookings && (
            <button
              onClick={onViewBookings}
              style={{
                flex: 1,
                padding: '0.7rem',
                background: '#fff',
                color: '#111827',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '150px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
              }}
            >
              View My Bookings
            </button>
          )}
          {onBackHome && (
            <button
              onClick={onBackHome}
              style={{
                flex: 1,
                padding: '0.7rem',
                background: '#f1c40f',
                color: '#0b0b0b',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '150px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f5d64a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f1c40f';
              }}
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;