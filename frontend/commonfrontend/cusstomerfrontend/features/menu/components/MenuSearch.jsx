import React, { useState, useRef, useEffect } from 'react';

const MenuSearch = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search menu...',
  isLoading = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle Escape key to clear search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && value) {
        handleClear();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [value]);

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        border: isFocused ? '2px solid #f1c40f' : '1px solid #e5e7eb',
        borderRadius: '9999px',
        padding: '0.5rem 1rem',
        background: '#fff',
        transition: 'all 0.2s ease',
        boxShadow: isFocused ? '0 0 0 3px rgba(241, 196, 15, 0.1)' : 'none',
      }}>
        <span style={{ color: '#9ca3af', fontSize: '1rem' }}>🔍</span>
        
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '0.95rem',
            color: '#111827',
            background: 'transparent',
            minWidth: '100px',
          }}
          aria-label="Search menu"
        />

        {isLoading && (
          <span style={{
            display: 'inline-block',
            width: '1rem',
            height: '1rem',
            border: '2px solid #e5e7eb',
            borderTopColor: '#f1c40f',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
        )}

        {value && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

        <button
          type="submit"
          style={{
            padding: '0.4rem 1.2rem',
            background: '#f1c40f',
            color: '#0b0b0b',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f5d64a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f1c40f';
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default MenuSearch;