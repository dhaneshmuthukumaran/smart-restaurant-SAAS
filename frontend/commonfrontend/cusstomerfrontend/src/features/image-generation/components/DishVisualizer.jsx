import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { DISH_PROMPTS, BEVERAGE_PROMPTS, DESSERT_PROMPTS } from '../constants/prompts'
import styles from '../styles/ImageGeneration.module.css'

const CATEGORIES = [
  { id: 'dishes', label: 'Dishes' },
  { id: 'beverages', label: 'Beverages' },
  { id: 'desserts', label: 'Desserts' },
]

export default function DishVisualizer({ onSelectPrompt = () => {} }) {
  const [category, setCategory] = useState('dishes')

  const items = category === 'dishes' ? DISH_PROMPTS : category === 'beverages' ? BEVERAGE_PROMPTS : DESSERT_PROMPTS

  return (
    <div className={styles['dish-visualizer']}>
      <h4>Menu Visualizer</h4>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setCategory(c.id)} style={{ background: c.id === category ? '#1f2937' : 'transparent' }}>{c.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {items.map((it) => (
          <div key={it.id} className={styles.dish} onClick={() => onSelectPrompt(it.prompt)}>
            <div className="dish-thumb" style={{ background: '#222', color: '#fff', padding: 8 }}>{it.emoji} {it.label}</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>{it.prompt}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

DishVisualizer.propTypes = {
  onSelectPrompt: PropTypes.func,
}
