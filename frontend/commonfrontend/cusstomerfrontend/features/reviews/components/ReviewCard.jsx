// components/ReviewCard.jsx

import React, { useState } from 'react';
import RatingStars from './RatingStars';
import styles from '../styles/Reviews.module.css';

const ReviewCard = ({
  review,
  onHelpful,
  onReport,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const [isHelped, setIsHelped] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const {
    id,
    userName,
    userAvatar,
    rating,
    title,
    comment,
    images,
    tags,
    helpfulCount,
    isVerified,
    getFormattedDate,
    getTimeAgo,
    getTagLabels,
    hasImages,
    hasResponse,
  } = review;

  const handleHelpful = async () => {
    if (!isHelped) {
      setIsHelped(true);
      await onHelpful?.(id);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const tagLabels = getTagLabels();

  return (
    <div className={styles.reviewCard}>
      {/* Header */}
      <div className={styles.reviewHeader}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {userAvatar ? (
              <img src={userAvatar} alt={userName} />
            ) : (
              <span>{getInitials(userName)}</span>
            )}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{userName}</span>
            {isVerified && (
              <span className={styles.verifiedBadge}>✓ Verified</span>
            )}
            <span className={styles.reviewDate}>
              {getFormattedDate()} · {getTimeAgo()}
            </span>
          </div>
        </div>
        <div className={styles.reviewRating}>
          <RatingStars rating={rating} size="small" readonly />
          <span className={styles.ratingValue}>{rating}.0</span>
        </div>
      </div>

      {/* Title */}
      <h4 className={styles.reviewTitle}>{title}</h4>

      {/* Comment */}
      <p className={styles.reviewComment}>{comment}</p>

      {/* Tags */}
      {tagLabels.length > 0 && (
        <div className={styles.reviewTags}>
          {tagLabels.map((tag) => (
            <span key={tag} className={styles.reviewTag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Images */}
      {hasImages() && (
        <div className={styles.reviewImages}>
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={styles.reviewImage}
              onClick={() => handleImageClick(image)}
            >
              <img src={image} alt={`Review ${index + 1}`} loading="lazy" />
              {index === 3 && images.length > 4 && (
                <div className={styles.imageOverlay}>
                  +{images.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Restaurant Response */}
      {hasResponse() && (
        <div className={styles.restaurantResponse}>
          <div className={styles.responseHeader}>
            <span className={styles.responseIcon}>🏪</span>
            <span className={styles.responseLabel}>Restaurant Response</span>
          </div>
          <p className={styles.responseText}>{review.response.text}</p>
          <span className={styles.responseDate}>
            {new Date(review.response.createdAt).toLocaleDateString()}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className={styles.reviewActions}>
        <button
          className={`${styles.helpfulButton} ${isHelped ? styles.helped : ''}`}
          onClick={handleHelpful}
        >
          👍 Helpful ({helpfulCount})
        </button>

        {showActions && (
          <div className={styles.actionButtons}>
            {onEdit && (
              <button className={styles.editButton} onClick={() => onEdit(review)}>
                ✏️ Edit
              </button>
            )}
            {onDelete && (
              <button className={styles.deleteButton} onClick={() => onDelete(review)}>
                🗑️ Delete
              </button>
            )}
            {onReport && (
              <button className={styles.reportButton} onClick={() => onReport(review)}>
                🚩 Report
              </button>
            )}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className={styles.imageModal} onClick={() => setShowImageModal(false)}>
          <div className={styles.imageModalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.imageModalClose}
              onClick={() => setShowImageModal(false)}
            >
              ✕
            </button>
            <img src={selectedImage} alt="Full size" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;