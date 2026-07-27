import { useState, useCallback } from 'react'
import * as promptService from '../services/promptService'
import * as imageService from '../services/imageGenerationService'

export default function useDishVisualization() {
  const [selectedDish, setSelectedDish] = useState(null)
  const [isVisualizing, setIsVisualizing] = useState(false)
  const [error, setError] = useState(null)

  const getDishPrompt = useCallback((dishId) => {
    return promptService.generateDishPrompt(dishId)
  }, [])

  const getAllDishes = useCallback(() => {
    try {
      return promptService.getSuggestions('')
    } catch (e) {
      return []
    }
  }, [])

  const visualizeDish = useCallback(
    async (dishId, options = {}) => {
      setError(null)
      try {
        const prompt = promptService.generateDishPrompt(dishId)
        if (!prompt) throw new Error('Dish prompt not found')
        setIsVisualizing(true)
        const img = await imageService.generateImage(prompt, options)
        setSelectedDish(img)
        return img
      } catch (e) {
        setError(e)
        throw e
      } finally {
        setIsVisualizing(false)
      }
    },
    []
  )

  return { selectedDish, isVisualizing, error, visualizeDish, getDishPrompt, getAllDishes }
}
