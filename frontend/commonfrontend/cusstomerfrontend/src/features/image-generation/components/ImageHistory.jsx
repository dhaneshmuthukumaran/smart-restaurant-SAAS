import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/ImageGeneration.module.css'

export default function ImageHistory({ history = [], onSelect = () => {}, onDelete = () => {}, onToggleFav = () => {}, onClear = () => {} }) {
  return (
    <div className={styles['image-history']}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>History</h4>
        <div>
          <button onClick={onClear}>Clear</button>
        </div>
      </div>

      {history.length === 0 && <div className={styles.muted}>No history yet</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {history.map((h) => (
          <div key={h.id || h.url} style={{ background: '#0b0c0f', padding: 8, borderRadius: 6 }}>
            <div style={{ height: 120, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={h.url} alt={h.prompt} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <div style={{ marginTop: 6 }}>
              <div style={{ fontSize: 13 }}>{h.prompt}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <div style={{ fontSize: 12, color: '#888' }}>{new Date(h.createdAt).toLocaleString()}</div>
                <div>
                  <button onClick={() => onToggleFav(h)} style={{ marginRight: 6 }}>{h.isFavorite ? '★' : '☆'}</button>
                  <button onClick={() => onSelect(h)} style={{ marginRight: 6 }}>Open</button>
                  <button onClick={() => onDelete(h.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
