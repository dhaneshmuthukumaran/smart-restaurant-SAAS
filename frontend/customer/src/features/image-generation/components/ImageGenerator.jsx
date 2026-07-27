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
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>
            AI <span className={styles.gradient}>Image Generator</span>
          </h2>
          <p className={styles.subtitle}>
            Create stunning food visuals with AI — choose a style, describe your dish, and generate.
          </p>
        </div>
        <button
          className={styles.btnOutlined}
          onClick={() => setShowGallery((s) => !s)}
        >
          {showGallery ? '✕ Close' : '🖼 Gallery'}
        </button>
      </header>

      <div className={styles.grid}>
        {/* Left: Input Panel */}
        <div className={styles.inputPanel}>
          <ImagePromptInput
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={() => handleGenerate(prompt)}
          />
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

        {/* Right: Output Panel */}
        <div className={styles.outputPanel}>
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

      {/* History + Dish Visualizer */}
      <div className={styles.historySection}>
        <div className={styles.grid}>
          <ImageHistory
            history={history}
            onSelect={(it) => setPrompt(it.prompt)}
            onDelete={(id) => deleteImage(id)}
            onToggleFav={(it) => toggleFavorite(it)}
            onClear={() => clearHistory()}
          />
          <DishVisualizer onSelectPrompt={(p) => setPrompt(p)} />
        </div>
      </div>

      {showGallery && (
        <div className={styles.historySection}>
          <ImageGallery />
        </div>
      )}
    </div>
  )
}
