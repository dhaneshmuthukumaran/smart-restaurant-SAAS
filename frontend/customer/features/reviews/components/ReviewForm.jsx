// components/ReviewForm.jsx

import React, { useState } from 'react';
import RatingStars from './RatingStars';
import styles from '../styles/Reviews.module.css';

const ReviewForm = ({
  onSubmit,
  onCancel,
  initialValues = {},
  loading = false,
  entityName = '',
}) => {
  const [formData, setFormData] = useState({
    rating: initialValues.rating || 0,
    title: initialValues.title || '',
    comment: initialValues.comment || '',
    tags: initialValues.tags || [],
    images: initialValues.images || [],
    ratings: initialValues.ratings || {
      food: 0,
      ambiance: 0,
      service: 0,
      hygiene: 0,
    },
  });

  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

  const tagOptions = [
    { value: 'great_food', label: '🍽️ Great Food' },
    { value: 'good_service', label: '👨‍🍳 Good Service' },
    { value: 'nice_ambiance', label: '🪑 Nice Ambiance' },
    { value: 'value_for_money', label: '💰 Value for Money' },
    { value: 'will_visit_again', label: '🔄 Will Visit Again' },
    { value: 'recommended', label: '👍 Recommended' },
    { value: 'family_friendly', label: '👨‍👩‍👧‍👦 Family Friendly' },
    { value: 'good_for_groups', label: '👥 Good for Groups' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: '' }));
    }
  };

  const handleCategoryRatingChange = (category, value) => {
    setFormData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [category]: value },
    }));
  };

  const handleTagToggle = (tagValue) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagValue)
        ? prev.tags.filter((t) => t !== tagValue)
        : [...prev.tags, tagValue],
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.rating === 0) newErrors.rating = 'Please select a rating';
    if (!formData.title.trim()) newErrors.title = 'Please enter a title';
    if (formData.title.trim().length < 3) newErrors.title = 'Title must be at least 3 characters';
    if (formData.comment.trim().length < 10) newErrors.comment = 'Comment must be at least 10 characters';
    if (formData.comment.trim().length > 1000) newErrors.comment = 'Comment must be less than 1000 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await onSubmit?.(formData);
  };

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>
        Write a Review
        {entityName && <span> for {entityName}</span>}
      </h3>

      {/* Rating */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Overall Rating *
        </label>
        <RatingStars
          rating={formData.rating}
          onRatingChange={handleRatingChange}
          size="large"
        />
        {errors.rating && (
          <span className={styles.formError}>{errors.rating}</span>
        )}
      </div>

      {/* Category Ratings */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Category Ratings</label>
        <div className={styles.categoryRatingGroup}>
          {['food', 'ambiance', 'service', 'hygiene'].map((category) => (
            <div key={category} className={styles.categoryRatingRow}>
              <span className={styles.categoryRatingLabel}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <RatingStars
                rating={formData.ratings[category] || 0}
                onRatingChange={(value) => handleCategoryRatingChange(category, value)}
                size="small"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Review Title *
        </label>
        <input
          type="text"
          className={styles.formInput}
          placeholder="Summarize your experience..."
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        {errors.title && (
          <span className={styles.formError}>{errors.title}</span>
        )}
      </div>

      {/* Comment */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Review Comment *
        </label>
        <textarea
          className={styles.formTextarea}
          placeholder="Share your experience in detail..."
          value={formData.comment}
          onChange={(e) => handleChange('comment', e.target.value)}
          rows={5}
        />
        <div className={styles.characterCount}>
          {formData.comment.length} / 1000 characters
        </div>
        {errors.comment && (
          <span className={styles.formError}>{errors.comment}</span>
        )}
      </div>

      {/* Tags */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Tags</label>
        <div className={styles.tagGroup}>
          {tagOptions.map((tag) => (
            <button
              key={tag.value}
              type="button"
              className={`${styles.tagButton} ${
                formData.tags.includes(tag.value) ? styles.active : ''
              }`}
              onClick={() => handleTagToggle(tag.value)}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Photos</label>
        <div className={styles.imageUpload}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className={styles.fileInput}
            id="review-images"
          />
          <label htmlFor="review-images" className={styles.uploadLabel}>
            📷 Upload Photos
          </label>
        </div>
        {imagePreviews.length > 0 && (
          <div className={styles.imagePreviews}>
            {imagePreviews.map((preview, index) => (
              <div key={index} className={styles.imagePreview}>
                <img src={preview} alt={`Preview ${index + 1}`} />
                <button
                  type="button"
                  className={styles.removeImage}
                  onClick={() => removeImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className={styles.formActions}>
        {onCancel && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;