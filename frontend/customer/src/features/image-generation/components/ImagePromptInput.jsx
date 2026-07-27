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
    <div className={styles.promptInput}>
      <div className={styles.inputWrapper}>
        <textarea
          className={styles.textarea}
          value={local}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Describe the dish image you want (e.g., 'golden-brown burger, studio lighting')..."
          rows={4}
        />
        {local && (
          <button className={styles.clearBtn} onClick={clear} title="Clear">✕</button>
        )}
      </div>

      <div className={styles.suggestions}>
        <span className={styles.suggestionLabel}>Quick prompts</span>
        <div className={styles.suggestionChips}>
          {PRE_BUILT_PROMPTS.slice(0, 6).map((p) => (
            <button
              key={p.id}
              type="button"
              className={styles.chip}
              onClick={() => handleChange(p.prompt)}
              disabled={local === p.prompt}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.promptActions}>
        <span className={styles.charCount}>{local.length}/{MAX_PROMPT_LENGTH}</span>
        <button
          className={styles.generateBtn}
          onClick={() => onSubmit()}
          disabled={!local.trim()}
        >
          ✨ Generate
        </button>
      </div>
    </div>
  )
}

ImagePromptInput.propTypes = {
  prompt: PropTypes.string,
  setPrompt: PropTypes.func,
  onSubmit: PropTypes.func,
}
