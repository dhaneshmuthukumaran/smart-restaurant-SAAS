import React from 'react';

const DishCardSkeleton = () => {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '0.9rem',
      overflow: 'hidden',
      background: '#fff',
      animation: 'pulse 1.5s ease-in-out infinite',
    }}>
      {/* Image skeleton */}
      <div style={{
        width: '100%',
        paddingTop: '60%',
        background: '#f3f4f6',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          left: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}>
          <div style={{
            width: '60px',
            height: '18px',
            background: '#e5e7eb',
            borderRadius: '9999px',
          }} />
        </div>
      </div>

      {/* Content skeleton */}
      <div style={{ padding: '1rem' }}>
        {/* Title and price */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '0.5rem',
        }}>
          <div style={{
            height: '1rem',
            background: '#e5e7eb',
            borderRadius: '0.25rem',
            width: '60%',
          }} />
          <div style={{
            height: '1rem',
            background: '#e5e7eb',
            borderRadius: '0.25rem',
            width: '25%',
          }} />
        </div>

        {/* Description */}
        <div style={{
          height: '0.75rem',
          background: '#e5e7eb',
          borderRadius: '0.25rem',
          width: '90%',
          marginBottom: '0.5rem',
        }} />
        <div style={{
          height: '0.75rem',
          background: '#e5e7eb',
          borderRadius: '0.25rem',
          width: '70%',
          marginBottom: '0.75rem',
        }} />

        {/* Dietary tags */}
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          marginBottom: '0.5rem',
        }}>
          <div style={{
            height: '18px',
            width: '50px',
            background: '#e5e7eb',
            borderRadius: '9999px',
          }} />
          <div style={{
            height: '18px',
            width: '40px',
            background: '#e5e7eb',
            borderRadius: '9999px',
          }} />
        </div>

        {/* Rating and meta */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '0.75rem',
        }}>
          <div style={{
            height: '16px',
            width: '80px',
            background: '#e5e7eb',
            borderRadius: '0.25rem',
          }} />
          <div style={{
            height: '16px',
            width: '60px',
            background: '#e5e7eb',
            borderRadius: '0.25rem',
          }} />
        </div>

        {/* Button skeleton */}
        <div style={{
          width: '100%',
          height: '36px',
          background: '#e5e7eb',
          borderRadius: '0.5rem',
        }} />
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default DishCardSkeleton;