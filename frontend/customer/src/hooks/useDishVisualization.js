import { useState, useCallback } from 'react';
import { PRE_BUILT_PROMPTS } from '../constants/prompts';
import { useImageGeneration } from './useImageGeneration';

export const useDishVisualization = () => {
  const [selectedDish, setSelectedDish] = useState(null);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const { generateImage, generatedImage, isGenerating } = useImageGeneration();

  const visualizeDish = useCallback(async (dishId, style = 'realistic') => {
    const allDishes = [
      ...PRE_BUILT_PROMPTS.dishes,
      ...PRE_BUILT_PROMPTS.beverages,
      ...PRE_BUILT_PROMPTS.desserts,
    ];
    
    const dish = allDishes.find(d => d.id === dishId);
    if (!dish) {
      console.error('Dish not found');
      return null;
    }

    setSelectedDish(dish);
    setIsVisualizing(true);

    const result = await generateImage({
      prompt: dish.prompt,
      style: style,
      quality: 'high',
      aspect: '4:3',
      lighting: 'studio',
    });

    setIsVisualizing(false);
    return result;
  }, [generateImage]);

  const getDishPrompts = useCallback(() => {
    return {
      dishes: PRE_BUILT_PROMPTS.dishes,
      beverages: PRE_BUILT_PROMPTS.beverages,
      desserts: PRE_BUILT_PROMPTS.desserts,
    };
  }, []);

  const getAllDishes = useCallback(() => {
    return [
      ...PRE_BUILT_PROMPTS.dishes,
      ...PRE_BUILT_PROMPTS.beverages,
      ...PRE_BUILT_PROMPTS.desserts,
    ];
  }, []);

  return {
    selectedDish,
    isVisualizing,
    generatedImage,
    isGenerating,
    visualizeDish,
    getDishPrompts,
    getAllDishes,
  };
};