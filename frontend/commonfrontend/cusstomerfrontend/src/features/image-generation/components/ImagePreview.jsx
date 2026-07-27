import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/ImageGeneration.module.css'

export default function ImagePreview({ image, loading, error, onDownload = () => {}, onFavorite = () => {}, onDelete = () => {} }) {
  if (loading) return <div className={styles['image-preview']}>Generating...</div>
  if (error) return <div className={styles['image-preview']}>Error: {String(error.message || error)}</div>
  if (!image) return <div className={styles['image-preview']}>No image yet</div>

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
    <div className={styles['image-preview']}>
      <img src={image.url} alt={image.prompt || 'generated'} style={{ maxWidth: '100%' }} />
      <div className={styles['preview-actions']}>
        <button onClick={handleDownload}>Download</button>
        <button onClick={() => onFavorite(image)}>{image.isFavorite ? 'Unfavorite' : 'Favorite'}</button>
        <button onClick={() => onDelete(image)}>Delete</button>
        <button onClick={handleShare}>Share</button>
      </div>
      <div className={styles['image-meta']}>{image.prompt}</div>
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
