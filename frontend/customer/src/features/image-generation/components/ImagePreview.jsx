import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/ImageGeneration.module.css'

export default function ImagePreview({ image, loading, error, onDownload = () => {}, onFavorite = () => {}, onDelete = () => {} }) {
  if (loading) {
    return (
      <div className={styles.previewContainer}>
        <div className={styles.generatingState}>
          <div className={styles.spinner} />
          <div className={styles.generatingText}>Creating your image...</div>
          <div className={styles.generatingSubtext}>This may take a few seconds</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.previewContainer}>
        <div className={styles.errorState}>
          <span className={styles.errorIcon}>⚠️</span>
          <div className={styles.errorMessage}>{String(error.message || error)}</div>
          <button className={styles.retryBtn} onClick={() => {}}>Try Again</button>
        </div>
      </div>
    )
  }

  if (!image) {
    return (
      <div className={styles.previewContainer}>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>🎨</span>
          <div className={styles.emptyTitle}>No image yet</div>
          <div className={styles.emptyText}>Write a prompt and click Generate to create your first image</div>
        </div>
      </div>
    )
  }

  const handleDownload = () => {
    try {
      const a = document.createElement('a')
      a.href = image.url
      a.download = `ai-image-${image.id || 'img'}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      onDownload(image)
    } catch (e) {
      console.error('download failed', e)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) await navigator.share({ title: image.prompt || 'AI Image', url: image.url })
      else await navigator.clipboard.writeText(image.url)
    } catch (e) {
      console.error('share failed', e)
    }
  }

  return (
    <div>
      <div className={styles.previewContainer}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={image.url} alt={image.prompt || 'generated'} />
        </div>
      </div>
      <div className={styles.imageActions}>
        <button className={styles.btnSecondary} onClick={handleDownload}>⬇ Download</button>
        <button className={styles.btnOutlined} onClick={() => onFavorite(image)}>
          {image.isFavorite ? '★ Favorited' : '☆ Favorite'}
        </button>
        <button className={styles.btnOutlined} onClick={handleShare}>📤 Share</button>
        <button className={styles.btnOutlined} onClick={() => onDelete(image)}>🗑 Delete</button>
      </div>
      {image.prompt && <div className={styles.charCount} style={{ marginTop: '0.8rem' }}>{image.prompt}</div>}
    </div>
  )
}

ImagePreview.propTypes = {
  image: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.any,
  onDownload: PropTypes.func,
  onFavorite: PropTypes.func,
  onDelete: PropTypes.func,
}
