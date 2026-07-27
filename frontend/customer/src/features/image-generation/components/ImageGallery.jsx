import React, { useState, useEffect, useCallback } from 'react'
import styles from '../styles/ImageGeneration.module.css'
import * as imageService from '../services/imageGenerationService'

export default function ImageGallery() {
  const [sort, setSort] = useState('newest')
  const [modal, setModal] = useState(null)
  const [items, setItems] = useState([])

  const loadFavorites = useCallback(async () => {
    try {
      const history = await imageService.getHistory()
      setItems((history || []).filter((item) => item.isFavorite))
    } catch (e) {
      console.error('failed to load favorites', e)
      setItems([])
    }
  }, [])

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  const sorted = items.slice().sort((a, b) =>
    sort === 'newest'
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  )

  return (
    <div>
      <div className={styles.historyHeader}>
        <h3 className={styles.historyTitle}>⭐ Favorites Gallery</h3>
        <div className={styles.historyFilters}>
          <div className={styles.controlGroup} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ margin: 0 }}>Sort</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className={styles.historyEmpty}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>⭐</span>
          No favorites yet — favorite an image to see it here
        </div>
      ) : (
        <div className={styles.historyGrid}>
          {sorted.map((it) => (
            <div key={it.id || it.url} className={styles.historyItem} onClick={() => setModal(it)}>
              <img src={it.url} alt={it.prompt} />
              <div className="info">
                <div className="promptPreview">{it.prompt}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}
          onClick={() => setModal(null)}
        >
          <div
            style={{ maxWidth: '800px', width: '100%', background: '#141414', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid #252525' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={modal.url} alt={modal.prompt} style={{ width: '100%', height: 'auto', display: 'block' }} />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ color: '#e5e5e5', fontSize: '1rem', lineHeight: 1.6 }}>{modal.prompt}</div>
              <button
                className={styles.btnOutlined}
                style={{ marginTop: '1rem' }}
                onClick={() => setModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
