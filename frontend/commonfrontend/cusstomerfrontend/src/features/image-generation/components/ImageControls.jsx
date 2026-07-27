import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/ImageGeneration.module.css'
import imageStyles from '../constants/imageStyles'
import { QUALITY_OPTIONS, ASPECT_RATIOS, LIGHTING_OPTIONS } from '../constants/config'

export default function ImageControls({ options = {}, setOptions = () => {}, styles: stylePresets = imageStyles, currentStyleId = null, onSelectStyle = () => {}, onGenerate = () => {} }) {
  const set = (k, v) => setOptions({ ...options, [k]: v })

  return (
    <div className={styles['image-controls']}>
      <div>
        <label>Styles</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {stylePresets.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectStyle(s.id)}
              style={{ padding: 8, borderRadius: 6, background: s.id === currentStyleId ? '#2b6cb0' : '#111' }}
            >
              <span style={{ marginRight: 6 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label>Quality</label>
        <select value={options.quality || QUALITY_OPTIONS[1]} onChange={(e) => set('quality', e.target.value)}>
          {QUALITY_OPTIONS.map((q) => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Aspect</label>
        <select value={options.aspectRatio || ASPECT_RATIOS[2]} onChange={(e) => set('aspectRatio', e.target.value)}>
          {ASPECT_RATIOS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Lighting</label>
        <select value={options.lighting || LIGHTING_OPTIONS[0]} onChange={(e) => set('lighting', e.target.value)}>
          {LIGHTING_OPTIONS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div>
        <button onClick={onGenerate}>Generate</button>
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
