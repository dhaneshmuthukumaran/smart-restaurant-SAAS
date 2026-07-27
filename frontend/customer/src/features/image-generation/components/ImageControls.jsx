import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/ImageGeneration.module.css'
import imageStyles from '../constants/imageStyles'
import { QUALITY_OPTIONS, ASPECT_RATIOS, LIGHTING_OPTIONS } from '../constants/config'

export default function ImageControls({ options = {}, setOptions = () => {}, styles: stylePresets = imageStyles, currentStyleId = null, onSelectStyle = () => {}, onGenerate = () => {} }) {
  const set = (k, v) => setOptions({ ...options, [k]: v })

  return (
    <div>
      {/* Style Presets */}
      <div style={{ marginTop: '1.5rem' }}>
        <label className={styles.suggestionLabel}>Style presets</label>
        <div className={styles.stylePresets}>
          {stylePresets.map((s) => (
            <button
              key={s.id}
              className={`${styles.stylePreset} ${s.id === currentStyleId ? styles.active : ''}`}
              onClick={() => onSelectStyle(s.id)}
              title={s.description}
            >
              <span className={styles.preview}>{s.icon}</span>
              <span className={styles.name}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Controls Grid */}
      <div className={styles.controlsGrid}>
        <div className={styles.controlGroup}>
          <label>Quality</label>
          <select value={options.quality || QUALITY_OPTIONS[1]} onChange={(e) => set('quality', e.target.value)}>
            {QUALITY_OPTIONS.map((q) => (
              <option key={q} value={q}>{q.charAt(0).toUpperCase() + q.slice(1)}</option>
            ))}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label>Aspect Ratio</label>
          <select value={options.aspectRatio || ASPECT_RATIOS[2]} onChange={(e) => set('aspectRatio', e.target.value)}>
            {ASPECT_RATIOS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label>Lighting</label>
          <select value={options.lighting || LIGHTING_OPTIONS[0]} onChange={(e) => set('lighting', e.target.value)}>
            {LIGHTING_OPTIONS.map((l) => (
              <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

ImageControls.propTypes = {
  options: PropTypes.object,
  setOptions: PropTypes.func,
  styles: PropTypes.array,
  currentStyleId: PropTypes.string,
  onSelectStyle: PropTypes.func,
  onGenerate: PropTypes.func,
}
