import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/ImageGeneration.module.css'

export default function ImageHistory({ history = [], onSelect = () => {}, onDelete = () => {}, onToggleFav = () => {}, onClear = () => {} }) {
  return (
    <div>
      <div className={styles.historyHeader}>
        <h3 className={styles.historyTitle}>Generation History</h3>
        <div className={styles.historyFilters}>
          <button className={`${styles.filterBtn} ${styles.active}`}>All</button>
          <button className={styles.filterBtn}>Favorites</button>
          {history.length > 0 && (
            <button className={styles.filterBtn} onClick={onClear}>Clear All</button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <div className={styles.historyEmpty}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>📋</span>
          Your generated images will appear here
        </div>
      ) : (
        <div className={styles.historyGrid}>
          {history.map((h) => (
            <div key={h.id || h.url} className={styles.historyItem} onClick={() => onSelect(h)}>
              <img src={h.url} alt={h.prompt} />
              <button
                className={`${styles.favoriteBtn} ${h.isFavorite ? styles.active : ''}`}
                onClick={(e) => { e.stopPropagation(); onToggleFav(h) }}
              >
                {h.isFavorite ? '★' : '☆'}
              </button>
              <button
                className={styles.deleteBtn}
                onClick={(e) => { e.stopPropagation(); onDelete(h.id) }}
              >
                ✕
              </button>
              <div className="info">
                <div className="promptPreview">{h.prompt}</div>
                <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.3rem' }}>
                  {new Date(h.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

ImageHistory.propTypes = {
  history: PropTypes.array,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleFav: PropTypes.func,
  onClear: PropTypes.func,
}
