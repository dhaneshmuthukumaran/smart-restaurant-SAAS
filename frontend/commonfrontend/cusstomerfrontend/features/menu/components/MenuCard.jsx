import React, { useState } from 'react';

const MenuCard = ({ dish, onSelect, onAddToCart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    id,
    name,
    description,
    price,
    image,
    rating,
    totalReviews,
    isAvailable,
    isSpecial,
    isBestSeller,
    dietary,
    spiceLevel,
    preparationTime,
  } = dish;

  // Helper functions
  const getDietaryLabels = () => {
    const labels = {
      'Vegetarian': '🥬 Veg',
      'Vegan': '🌱 Vegan',
      'Gluten-Free': '🌾 GF',
      'Dairy-Free': '🥛 DF',
      'Nut-Free': '🥜 NF',
      'High Protein': '💪 HP',
      'Low Carb': '🥑 LC',
      'Organic': '🌿 Organic',
    };
    return dietary?.slice(0, 3).map((tag) => labels[tag] || tag) || [];
  };

  const getSpiceIndicator = () => {
    if (!spiceLevel || spiceLevel <= 1) return '🌶️ Mild';
    if (spiceLevel === 2) return '🌶️🌶️ Medium';
    if (spiceLevel === 3) return '🌶️🌶️🌶️ Hot';
    if (spiceLevel === 4) return '🌶️🌶️🌶️🌶️ Very Hot';
    return '🌶️🌶️🌶️🌶️🌶️ Extreme';
  };

  const getRatingStars = () => {
    return '⭐'.repeat(Math.round(rating || 0));
  };

  return (
    <div
      onClick={() => isAvailable !== false && onSelect?.(dish)}
      style={{
        width: '100%',
        textAlign: 'left',
        border: `1px solid ${!isAvailable ? '#e5e7eb' : '#e5e7eb'}`,
        borderRadius: '0.9rem',
        overflow: 'hidden',
        background: '#fff',
        cursor: isAvailable !== false ? 'pointer' : 'not-allowed',
        transition: 'all 0.2s ease',
        opacity: isAvailable !== false ? 1 : 0.6,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={(e) => {
        if (isAvailable !== false) {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      role="button"
      tabIndex={isAvailable !== false ? 0 : -1}
      onKeyPress={(e) => {
        if (e.key === 'Enter' && isAvailable !== false) {
          onSelect?.(dish);
        }
      }}
    >
      {/* Image Section */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '60%',
        background: '#f3f4f6',
        overflow: 'hidden',
      }}>
        {!imageLoaded && !imageError && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            background: '#f3f4f6',
          }}>
            🍽️
          </div>
        )}
        {image && !imageError ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            background: '#f3f4f6',
          }}>
            🍽️
          </div>
        )}

        {/* Badges */}
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          left: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}>
          {isBestSeller && (
            <span style={{
              background: '#f59e0b',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: '600',
              padding: '0.15rem 0.6rem',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              ⭐ Best Seller
            </span>
          )}
          {isSpecial && (
            <span style={{
              background: '#8b5cf6',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: '600',
              padding: '0.15rem 0.6rem',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              ✨ Today's Special
            </span>
          )}
          {isAvailable === false && (
            <span style={{
              background: '#ef4444',
              color: '#fff',
              fontSize: '0.65rem',
              fontWeight: '600',
              padding: '0.15rem 0.6rem',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Sold Out
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: '1rem' }}>
        {/* Header: Name + Price */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '0.25rem',
        }}>
          <h4 style={{
            margin: 0,
            fontSize: '1rem',
            fontWeight: '600',
            color: '#111827',
            flex: 1,
            marginRight: '0.5rem',
          }}>
            {name}
          </h4>
          <span style={{
            fontWeight: '700',
            color: '#111827',
            fontSize: '1rem',
            whiteSpace: 'nowrap',
          }}>
            ${price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p style={{
          margin: '0 0 0.5rem 0',
          fontSize: '0.85rem',
          color: '#6b7280',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: '1.4',
        }}>
          {description}
        </p>

        {/* Dietary Tags */}
        {dietary && dietary.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.25rem',
            marginBottom: '0.5rem',
          }}>
            {getDietaryLabels().map((tag) => (
              <span key={tag} style={{
                fontSize: '0.7rem',
                background: '#f3f4f6',
                color: '#374151',
                padding: '0.1rem 0.5rem',
                borderRadius: '9999px',
                border: '1px solid #e5e7eb',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Rating + Spice + Prep Time */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: '#6b7280',
          marginBottom: '0.75rem',
        }}>
          {rating > 0 && (
            <span>
              {getRatingStars()} {rating.toFixed(1)}
              {totalReviews > 0 && (
                <span style={{ color: '#9ca3af', marginLeft: '0.2rem' }}>
                  ({totalReviews})
                </span>
              )}
            </span>
          )}
          {spiceLevel > 0 && (
            <span>{getSpiceIndicator()}</span>
          )}
          {preparationTime > 0 && (
            <span>⏱️ {preparationTime}min</span>
          )}
        </div>

        {/* Add to Cart Button */}
        {isAvailable !== false && onAddToCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(dish);
            }}
            style={{
              width: '100%',
              padding: '0.5rem',
              background: '#f1c40f',
              color: '#0b0b0b',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5d64a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f1c40f';
            }}
          >
            Add to Cart
          </button>
        )}

        {/* Unavailable Message */}
        {isAvailable === false && (
          <div style={{
            width: '100%',
            padding: '0.5rem',
            textAlign: 'center',
            color: '#ef4444',
            fontSize: '0.85rem',
            fontWeight: '500',
          }}>
            Currently Unavailable
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;