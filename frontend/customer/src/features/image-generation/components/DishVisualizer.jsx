import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DISH_PROMPTS, BEVERAGE_PROMPTS, DESSERT_PROMPTS } from '../constants/prompts'
import styles from '../styles/ImageGeneration.module.css'

const CATEGORIES = [
  { id: 'dishes', label: '🍽️ Dishes' },
  { id: 'beverages', label: '🥤 Beverages' },
  { id: 'desserts', label: '🍰 Desserts' },
]

export default function DishVisualizer({ onSelectPrompt = () => {} }) {
  const [category, setCategory] = useState('dishes')

  const items = category === 'dishes' ? DISH_PROMPTS : category === 'beverages' ? BEVERAGE_PROMPTS : DESSERT_PROMPTS

  return (
    <div className={styles.inputPanel}>
      <h3 className={styles.historyTitle} style={{ marginBottom: '1rem' }}>Menu Visualizer</h3>

      <div className={styles.historyFilters} style={{ marginBottom: '1rem' }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`${styles.filterBtn} ${c.id === category ? styles.active : ''}`}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {items.map((it) => (
          <div
            key={it.id}
            className={styles.historyItem}
            onClick={() => onSelectPrompt(it.prompt)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ padding: '1rem', display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.8rem' }}>{it.emoji}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#e5e5e5', marginBottom: '0.3rem' }}>{it.label}</div>
                <div style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.5 }}>{it.prompt}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

DishVisualizer.propTypes = {
  onSelectPrompt: PropTypes.func,
}
