import { useState, useEffect, useCallback } from 'react'
import * as imageService from '../services/imageGenerationService'
import * as promptService from '../services/promptService'

export default function useImageGeneration() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])

  const loadHistory = useCallback(async () => {
    try {
      const h = await imageService.getHistory()
      setHistory(h || [])
      return h
    } catch (e) {
      console.error('loadHistory', e)
      setHistory([])
      return []
    }
  }, [])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const clearHistory = useCallback(async () => {
    try {
      const existing = await imageService.getHistory()
      await Promise.all((existing || []).map((item) => imageService.deleteImage(item.id)))
      setHistory([])
      return true
    } catch (e) {
      console.error('clearHistory failed', e)
      return false
    }
  }, [])

  const deleteImage = useCallback(
    async (id) => {
      try {
        await imageService.deleteImage(id)
        await loadHistory()
        return true
      } catch (e) {
        console.error('deleteImage failed', e)
        return false
      }
    },
    [loadHistory]
  )

  const toggleFavorite = useCallback(
    async (item) => {
      try {
        await imageService.toggleFavorite(item.id || item)
        await loadHistory()
        return true
      } catch (e) {
        console.error('toggleFavorite failed', e)
        return false
      }
    },
    [loadHistory]
  )

  const generate = useCallback(
    async (prompt, options = {}) => {
      setError(null)
      try {
        const validation = promptService.validatePrompt(prompt)
        if (!validation.valid) throw new Error(validation.reason || 'Invalid prompt')

        const enhanced = promptService.enhancePrompt(prompt, {
          styleId: options.styleId,
          lighting: options.lighting,
        })

        setIsGenerating(true)
        const result = await imageService.generateImage(enhanced, options)
        setGeneratedImage(result)
        await loadHistory()
        return result
      } catch (e) {
        setError(e)
        throw e
      } finally {
        setIsGenerating(false)
      }
    },
    [loadHistory]
  )

  return {
    isGenerating,
    generatedImage,
    error,
    history,
    generateImage: generate,
    loadHistory,
    clearHistory,
    deleteImage,
    toggleFavorite,
  }
}
