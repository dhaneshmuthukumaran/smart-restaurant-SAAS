// components/BookingSkeleton.jsx

import React from 'react';

const BookingSkeleton = ({ type = 'form' }) => {
  if (type === 'calendar') {
    return (
      <div style={{
        padding: '1rem',
        background: '#fff',
        borderRadius: '0.9rem',
        border: '1px solid #e5e7eb',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}>
          <div style={{
            width: '80px',
            height: '32px',
            background: '#f3f4f6',
            borderRadius: '0.25rem',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          <div style={{
            width: '120px',
            height: '20px',
            background: '#f3f4f6',
            borderRadius: '0.25rem',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          <div style={{
            width: '80px',
            height: '32px',
            background: '#f3f4f6',
            borderRadius: '0.25rem',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0.25rem',
        }}>
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              style={{
                paddingTop: '100%',
                background: '#f3f4f6',
                borderRadius: '0.25rem',
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: `${(i % 10) * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'slots') {
    return (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}>
          <div style={{
            width: '120px',
            height: '20px',
            background: '#f3f4f6',
            borderRadius: '0.25rem',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          <div style={{
            display: 'flex',
            gap: '0.75rem',
          }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '60px',
                  height: '16px',
                  background: '#f3f4f6',
                  borderRadius: '0.25rem',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '0.5rem',
        }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                height: '3rem',
                background: '#f3f4f6',
                borderRadius: '0.5rem',
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'confirmation') {
    return (
      <div style={{
        background: '#fff',
        borderRadius: '0.9rem',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '2rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid #e5e7eb',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 0.5rem',
            background: '#f3f4f6',
            borderRadius: '50%',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          <div style={{
            width: '200px',
            height: '24px',
            margin: '0 auto 0.25rem',
            background: '#f3f4f6',
            borderRadius: '0.25rem',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          <div style={{
            width: '150px',
            height: '16px',
            margin: '0 auto',
            background: '#f3f4f6',
            borderRadius: '0.25rem',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  padding: '0.75rem',
                  background: '#f9fafb',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{
                  width: '60px',
                  height: '12px',
                  background: '#e5e7eb',
                  borderRadius: '0.25rem',
                  marginBottom: '0.2rem',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`,
                }} />
                <div style={{
                  width: '80px',
                  height: '18px',
                  background: '#f3f4f6',
                  borderRadius: '0.25rem',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  animationDelay: `${i * 0.15}s`,
                }} />
              </div>
            ))}
          </div>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
          }}>
            <div style={{
              flex: 1,
              height: '44px',
              background: '#f3f4f6',
              borderRadius: '0.5rem',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
            <div style={{
              flex: 1,
              height: '44px',
              background: '#f3f4f6',
              borderRadius: '0.5rem',
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: '0.3s',
            }} />
          </div>
        </div>
      </div>
    );
  }

  // Default: Form skeleton
  return (
    <div style={{
      background: '#fff',
      borderRadius: '0.9rem',
      padding: '1.5rem',
      border: '1px solid #e5e7eb',
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          width: '150px',
          height: '24px',
          background: '#f3f4f6',
          borderRadius: '0.25rem',
          marginBottom: '0.25rem',
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
        <div style={{
          width: '200px',
          height: '16px',
          background: '#f3f4f6',
          borderRadius: '0.25rem',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.2s',
        }} />
      </div>

      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <div style={{
            width: '100px',
            height: '14px',
            background: '#f3f4f6',
            borderRadius: '0.25rem',
            marginBottom: '0.25rem',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }} />
          <div style={{
            width: '100%',
            height: '42px',
            background: '#f3f4f6',
            borderRadius: '0.5rem',
            animation: 'pulse 1.5s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }} />
        </div>
      ))}

      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginTop: '1rem',
      }}>
        <div style={{
          flex: 1,
          height: '44px',
          background: '#f3f4f6',
          borderRadius: '0.5rem',
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
        <div style={{
          flex: 2,
          height: '44px',
          background: '#f3f4f6',
          borderRadius: '0.5rem',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.3s',
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BookingSkeleton;