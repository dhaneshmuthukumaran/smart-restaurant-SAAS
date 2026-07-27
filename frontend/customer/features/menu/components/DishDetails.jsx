import React from 'react';

const DishDetails = ({ dish, onClose, onAddToCart }) => {
  if (!dish) return null;

  const {
    name,
    description,
    price,
    image,
    rating,
    totalReviews,
    dietary,
    ingredients,
    preparationTime,
    spiceLevel,
    isAvailable,
    isSpecial,
    isBestSeller,
    nutritionalInfo,
  } = dish;

  // Helper functions
  const getDietaryLabels = () => {
    const labels = {
      'Vegetarian': '🥬 Vegetarian',
      'Vegan': '🌱 Vegan',
      'Gluten-Free': '🌾 Gluten-Free',
      'Dairy-Free': '🥛 Dairy-Free',
      'Nut-Free': '🥜 Nut-Free',
      'High Protein': '💪 High-Protein',
      'Low Carb': '🥑 Low-Carb',
      'Organic': '🌿 Organic',
    };
    return dietary?.map((tag) => labels[tag] || tag) || [];
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

  // Handle escape key to close
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '1.2rem',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          animation: 'slideUp 0.3s ease',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            fontSize: '1.2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
          }}
        >
          ✕
        </button>

        {/* Image */}
        <div style={{
          width: '100%',
          paddingTop: '50%',
          position: 'relative',
          background: '#f3f4f6',
          overflow: 'hidden',
        }}>
          {image ? (
            <img
              src={image}
              alt={name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
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
              fontSize: '4rem',
              background: '#f3f4f6',
            }}>
              🍽️
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              flex: 1,
            }}>
              {name}
            </h2>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              marginLeft: '1rem',
            }}>
              ${price.toFixed(2)}
            </span>
          </div>

          {/* Rating */}
          {rating > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
            }}>
              <span style={{ fontSize: '1rem' }}>{getRatingStars()}</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>
                {rating.toFixed(1)}
              </span>
              {totalReviews > 0 && (
                <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  ({totalReviews} reviews)
                </span>
              )}
            </div>
          )}

          {/* Description */}
          <p style={{
            color: '#6b7280',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            marginBottom: '1rem',
          }}>
            {description}
          </p>

          {/* Dietary Tags */}
          {dietary && dietary.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '0.85rem',
                color: '#374151',
                fontWeight: '600',
              }}>
                Dietary Information
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {getDietaryLabels().map((tag) => (
                  <span key={tag} style={{
                    fontSize: '0.8rem',
                    background: '#f3f4f6',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    border: '1px solid #e5e7eb',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {ingredients && ingredients.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '0.85rem',
                color: '#374151',
                fontWeight: '600',
              }}>
                Ingredients
              </h4>
              <ul style={{
                margin: 0,
                paddingLeft: '1.2rem',
                color: '#6b7280',
                fontSize: '0.9rem',
              }}>
                {ingredients.map((item, index) => (
                  <li key={index} style={{ marginBottom: '0.2rem' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Meta Info */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
          }}>
            {preparationTime > 0 && (
              <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                ⏱️ {preparationTime} minutes
              </span>
            )}
            {spiceLevel > 0 && (
              <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                {getSpiceIndicator()}
              </span>
            )}
            {isSpecial && (
              <span style={{
                fontSize: '0.8rem',
                fontWeight: '600',
                color: '#8b5cf6',
              }}>
                ✨ Today's Special
              </span>
            )}
            {isBestSeller && (
              <span style={{
                fontSize: '0.8rem',
                fontWeight: '600',
                color: '#f59e0b',
              }}>
                ⭐ Best Seller
              </span>
            )}
          </div>

          {/* Nutritional Info */}
          {nutritionalInfo && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
              gap: '0.5rem',
              marginBottom: '1rem',
              padding: '0.75rem',
              background: '#f3f4f6',
              borderRadius: '0.5rem',
            }}>
              {Object.entries(nutritionalInfo).map(([key, value]) => (
                <div key={key} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                  }}>
                    {key}
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#111827',
                  }}>
                    {value}{key === 'calories' ? '' : 'g'}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Button */}
          {isAvailable !== false && onAddToCart && (
            <button
              onClick={() => onAddToCart(dish)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#f1c40f',
                color: '#0b0b0b',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
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

          {isAvailable === false && (
            <div style={{
              width: '100%',
              padding: '0.75rem',
              textAlign: 'center',
              background: '#fef2f2',
              color: '#ef4444',
              borderRadius: '0.5rem',
              fontWeight: '600',
            }}>
              Currently Unavailable
            </div>
          )}
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default DishDetails;