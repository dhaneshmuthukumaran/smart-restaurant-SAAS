import React from 'react';

const MenuHeader = ({
  title = 'Our Menu',
  subtitle,
  children,
  onViewToggle,
  viewMode = 'grid',
}) => {
  return (
    <div style={{
      marginBottom: '1.5rem',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '1rem',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        {/* Left side - Title */}
        <div>
          <h2 style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#111827',
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{
              margin: '0.25rem 0 0 0',
              color: '#6b7280',
              fontSize: '0.95rem',
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Right side - View toggle & children */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}>
          {onViewToggle && (
            <div style={{
              display: 'flex',
              gap: '0.25rem',
              background: '#f3f4f6',
              borderRadius: '0.5rem',
              padding: '0.25rem',
            }}>
              <button
                onClick={() => onViewToggle('grid')}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '0.35rem',
                  border: 'none',
                  background: viewMode === 'grid' ? '#fff' : 'transparent',
                  color: viewMode === 'grid' ? '#111827' : '#6b7280',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
                aria-label="Grid view"
              >
                ▦
              </button>
              <button
                onClick={() => onViewToggle('list')}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '0.35rem',
                  border: 'none',
                  background: viewMode === 'list' ? '#fff' : 'transparent',
                  color: viewMode === 'list' ? '#111827' : '#6b7280',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
                aria-label="List view"
              >
                ☰
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;