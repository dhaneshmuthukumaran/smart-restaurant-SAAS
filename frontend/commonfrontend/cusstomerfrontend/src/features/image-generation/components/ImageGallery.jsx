import React, { useState, useEffect, useCallback } from 'react'
import styles from '../styles/ImageGeneration.module.css'
import * as imageService from '../services/imageGenerationService'

export default function ImageGallery() {
  const [filter, setFilter] = useState('all')
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
    <div className={styles['image-gallery']}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <button onClick={() => setFilter('all')}>All</button>
        </div>
        <div>
          <label>Sort</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
        {items.map((it) => (
          <div key={it.id || it.url} style={{ cursor: 'pointer' }} onClick={() => setModal(it)}>
            <img src={it.url} alt={it.prompt} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
            <div style={{ fontSize: 12, marginTop: 4 }}>{it.prompt}</div>
          </div>
        ))}
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setModal(null)}>
          <div style={{ maxWidth: '90%', maxHeight: '90%' }}>
            <img src={modal.url} alt={modal.prompt} style={{ width: '100%', height: 'auto' }} />
            <div style={{ color: '#fff' }}>{modal.prompt}</div>
          </div>
        </div>
      )}
    </div>
  )
}
