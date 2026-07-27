import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/ImageGeneration.module.css'
import { getAllPrompts } from '../constants/prompts'
import { MAX_PROMPT_LENGTH } from '../constants/config'

const PRE_BUILT_PROMPTS = getAllPrompts()

export default function ImagePromptInput({ prompt = '', setPrompt = () => {}, onSubmit = () => {} }) {
  const [local, setLocal] = useState(prompt || '')

  const handleChange = useCallback((v) => {
    if (v.length > MAX_PROMPT_LENGTH) return
    setLocal(v)
    setPrompt(v)
  }, [setPrompt])

  const handleKey = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onSubmit()
    }
  }

  const clear = () => {
    setLocal('')
    setPrompt('')
  }

  return (
    <div className={styles['image-prompt-input']}>
      <textarea
        value={local}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Describe the image you want (e.g., 'golden-brown burger, studio lighting')"
        rows={4}
        style={{ width: '100%' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <div className="chips">
          {PRE_BUILT_PROMPTS.slice(0, 6).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                handleChange(p.prompt)
              }}
              style={{ marginRight: 6 }}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>

        <div>
          <small>{local.length}/{MAX_PROMPT_LENGTH}</small>
          <button onClick={clear} style={{ marginLeft: 8 }}>Clear</button>
          <button onClick={() => onSubmit()} style={{ marginLeft: 8 }}>Generate</button>
        </div>
      </div>
    </div>
  )
}

ImagePromptInput.propTypes = {
  prompt: PropTypes.string,
  setPrompt: PropTypes.func,
  onSubmit: PropTypes.func,
}
