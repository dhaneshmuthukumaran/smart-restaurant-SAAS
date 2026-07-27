// components/BookingForm.jsx

import React from 'react';
import { useBookingForm } from '../hooks/useBookingForm';

const BookingForm = ({
  onSubmit,
  onCancel,
  loading = false,
  error = null,
  initialValues = {},
  branchName = '',
}) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useBookingForm(initialValues, onSubmit, validateForm);

  // Validation function
  function validateForm(values) {
    const errors = {};
    
    if (!values.customer?.name || values.customer.name.length < 2) {
      errors['customer.name'] = 'Name is required (min 2 characters)';
    }
    
    if (!values.customer?.email) {
      errors['customer.email'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.customer.email)) {
      errors['customer.email'] = 'Please enter a valid email address';
    }
    
    if (!values.customer?.phone) {
      errors['customer.phone'] = 'Phone number is required';
    } else if (!/^[\d\s\-+()]{10,15}$/.test(values.customer.phone)) {
      errors['customer.phone'] = 'Please enter a valid phone number';
    }
    
    if (!values.date) {
      errors.date = 'Please select a date';
    }
    
    if (!values.time) {
      errors.time = 'Please select a time';
    }
    
    if (!values.partySize || values.partySize < 1) {
      errors.partySize = 'Please select number of guests';
    }
    
    return errors;
  }

  return (
    <form onSubmit={handleSubmit} style={{ 
      background: '#fff',
      borderRadius: '0.9rem',
      padding: '1.5rem',
      border: '1px solid #e5e7eb',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#111827' }}>
          Book a Table
        </h3>
        {branchName && (
          <p style={{ margin: '0.25rem 0 0 0', color: '#6b7280', fontSize: '0.9rem' }}>
            {branchName}
          </p>
        )}
      </div>

      {/* Error Display */}
      {submitError && (
        <div style={{
          padding: '0.75rem',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          color: '#dc2626',
          fontSize: '0.9rem',
          marginBottom: '1rem',
        }}>
          {submitError}
        </div>
      )}

      {/* Customer Name */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{
          display: 'block',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.25rem',
        }}>
          Full Name *
        </label>
        <input
          type="text"
          name="customer.name"
          value={values.customer?.name || ''}
          onChange={(e) => handleChange('customer.name', e.target.value)}
          onBlur={() => handleBlur('customer.name')}
          placeholder="Enter your full name"
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: errors['customer.name'] && touched['customer.name'] 
              ? '1px solid #ef4444' 
              : '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
        />
        {errors['customer.name'] && touched['customer.name'] && (
          <p style={{ margin: '0.25rem 0 0 0', color: '#ef4444', fontSize: '0.8rem' }}>
            {errors['customer.name']}
          </p>
        )}
      </div>

      {/* Email */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{
          display: 'block',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.25rem',
        }}>
          Email Address *
        </label>
        <input
          type="email"
          name="customer.email"
          value={values.customer?.email || ''}
          onChange={(e) => handleChange('customer.email', e.target.value)}
          onBlur={() => handleBlur('customer.email')}
          placeholder="you@example.com"
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: errors['customer.email'] && touched['customer.email'] 
              ? '1px solid #ef4444' 
              : '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
        />
        {errors['customer.email'] && touched['customer.email'] && (
          <p style={{ margin: '0.25rem 0 0 0', color: '#ef4444', fontSize: '0.8rem' }}>
            {errors['customer.email']}
          </p>
        )}
      </div>

      {/* Phone */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{
          display: 'block',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.25rem',
        }}>
          Phone Number *
        </label>
        <input
          type="tel"
          name="customer.phone"
          value={values.customer?.phone || ''}
          onChange={(e) => handleChange('customer.phone', e.target.value)}
          onBlur={() => handleBlur('customer.phone')}
          placeholder="+1 555-123-4567"
          style={{
            width: '100%',
            padding: '0.6rem 0.8rem',
            border: errors['customer.phone'] && touched['customer.phone'] 
              ? '1px solid #ef4444' 
              : '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'border-color 0.2s ease',
          }}
        />
        {errors['customer.phone'] && touched['customer.phone'] && (
          <p style={{ margin: '0.25rem 0 0 0', color: '#ef4444', fontSize: '0.8rem' }}>
            {errors['customer.phone']}
          </p>
        )}
      </div>

      {/* Party Size */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{
          display: 'block',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.25rem',
        }}>
          Number of Guests *
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => handleChange('partySize', Math.max(1, (values.partySize || 2) - 1))}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              background: '#fff',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            −
          </button>
          <span style={{
            minWidth: '3rem',
            textAlign: 'center',
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#111827',
          }}>
            {values.partySize || 2}
          </span>
          <button
            type="button"
            onClick={() => handleChange('partySize', Math.min(20, (values.partySize || 2) + 1))}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              background: '#fff',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +
          </button>
          <span style={{ fontSize: '0.85rem', color: '#6b7280', marginLeft: '0.5rem' }}>
            max 20
          </span>
        </div>
        {errors.partySize && touched.partySize && (
          <p style={{ margin: '0.25rem 0 0 0', color: '#ef4444', fontSize: '0.8rem' }}>
            {errors.partySize}
          </p>
        )}
      </div>

      {/* Special Requests */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          fontSize: '0.85rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.25rem',
        }}>
          Special Requests
        </label>
        <textarea
          value={values.customer?.preferences?.notes || ''}
          onChange={(e) => handleChange('customer.preferences.notes', e.target.value)}
          placeholder="Any special requests? (dietary restrictions, seating preferences, special occasions...)"
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
            transition: 'border-color 0.2s ease',
          }}
        />
      </div>

      {/* Buttons */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
      }}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '0.7rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              background: '#fff',
              color: '#6b7280',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
            }}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || loading}
          style={{
            flex: 2,
            padding: '0.7rem',
            border: 'none',
            borderRadius: '0.5rem',
            background: '#f1c40f',
            color: '#0b0b0b',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: isSubmitting || loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            opacity: isSubmitting || loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting && !loading) {
              e.currentTarget.style.background = '#f5d64a';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting && !loading) {
              e.currentTarget.style.background = '#f1c40f';
            }
          }}
        >
          {isSubmitting || loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>

      {/* Reset Button */}
      <button
        type="button"
        onClick={resetForm}
        style={{
          marginTop: '0.75rem',
          background: 'none',
          border: 'none',
          color: '#6b7280',
          fontSize: '0.85rem',
          cursor: 'pointer',
          textDecoration: 'underline',
          width: '100%',
        }}
      >
        Reset Form
      </button>
    </form>
  );
};

export default BookingForm;