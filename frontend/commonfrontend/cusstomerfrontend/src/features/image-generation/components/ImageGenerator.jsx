import React, { useState } from 'react'
import ImagePromptInput from './ImagePromptInput'
import ImagePreview from './ImagePreview'
import ImageControls from './ImageControls'
import ImageHistory from './ImageHistory'
import DishVisualizer from './DishVisualizer'
import ImageGallery from './ImageGallery'
import styles from '../styles/ImageGeneration.module.css'
import useImageGeneration from '../hooks/useImageGeneration'
import useImageStyles from '../hooks/useImageStyles'

export default function ImageGenerator() {
  const { isGenerating, generatedImage, error, history, generateImage, loadHistory, clearHistory, deleteImage, toggleFavorite } = useImageGeneration()
  const { styles: stylePresets, currentStyleId, selectStyle } = useImageStyles()

  const [prompt, setPrompt] = useState('')
  const [options, setOptions] = useState({ styleId: currentStyleId })
  const [showGallery, setShowGallery] = useState(false)

  function handleGenerate(p = prompt) {
    generateImage(p, options).catch(() => {})
  }

  return (
    <div className={`${styles['image-generator']} dark-theme`}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>AI Image Generator</h2>
        <div>
          <button onClick={() => setShowGallery((s) => !s)}>{showGallery ? 'Close Gallery' : 'Open Gallery'}</button>
        </div>
      </header>

      <div className={styles.controlsRow}>
        <div style={{ flex: 1 }}>
          <ImagePromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={() => handleGenerate(prompt)}
          />
          <div style={{ marginTop: 8 }}>
            <ImageControls
              options={options}
              setOptions={(o) => setOptions(o)}
              styles={stylePresets}
              currentStyleId={currentStyleId}
              onSelectStyle={(id) => {
                selectStyle(id)
                setOptions((prev) => ({ ...prev, styleId: id }))
              }}
              onGenerate={() => handleGenerate(prompt)}
            />
          </div>
        </div>

        <div style={{ width: 480 }}>
          <ImagePreview
            image={generatedImage}
            loading={isGenerating}
            error={error}
            onDownload={(img) => {}}
            onFavorite={(img) => toggleFavorite(img)}
            onDelete={(img) => deleteImage(img.id)}
          />
        </div>
      </div>

      <div className={styles.mainRow}>
        <div style={{ flex: 1 }}>
          <ImageHistory
            history={history}
            onSelect={(it) => setPrompt(it.prompt)}
            onDelete={(id) => deleteImage(id)}
            onToggleFav={(it) => toggleFavorite(it)}
            onClear={() => clearHistory()}
          />
        </div>

        <aside className={styles.sideColumn}>
          <DishVisualizer onSelectPrompt={(p) => setPrompt(p)} />
        </aside>
      </div>

      {showGallery && (
        <div style={{ marginTop: 12 }}>
          <ImageGallery />
        </div>
      )}
    </div>
  )
}

