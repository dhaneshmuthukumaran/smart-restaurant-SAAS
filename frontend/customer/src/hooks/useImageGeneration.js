import { useState, useCallback } from 'react';
import { imageGenerationService } from '../services/imageGenerationService';
import { promptService } from '../services/promptService';
import { storageService } from '../services/storageService';

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Generate image
  const generateImage = useCallback(async (params) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Validate prompt
      const validation = promptService.validatePrompt(params.prompt);
      if (!validation.valid) {
        setError(validation.error);
        setIsGenerating(false);
        return null;
      }
      
      // Enhance prompt with style and lighting
      const enhancedPrompt = promptService.enhancePrompt(
        params.prompt,
        params.style || 'realistic',
        params.lighting || 'studio'
      );
      
      // Call API
      const response = await imageGenerationService.generateImage({
        ...params,
        prompt: enhancedPrompt,
      });
      
      if (response.success) {
        const imageData = response.data;
        setGeneratedImage(imageData);
        
        // Save to history
        const saved = storageService.saveToHistory(imageData);
        setHistory(prev => [saved, ...prev]);
        
        return imageData;
      } else {
        setError('Failed to generate image');
        return null;
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Load history
  const loadHistory = useCallback(() => {
    const historyData = storageService.getHistory();
    setHistory(historyData);
    return historyData;
  }, []);

  // Clear history
  const clearHistory = useCallback(() => {
    storageService.clearHistory();
    setHistory([]);
  }, []);

  // Delete specific image
  const deleteImage = useCallback(async (imageId) => {
    try {
      await imageGenerationService.deleteImage(imageId);
      setHistory(prev => prev.filter(item => item.id !== imageId));
      if (generatedImage?.id === imageId) {
        setGeneratedImage(null);
      }
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [generatedImage]);

  // Toggle favorite
  const toggleFavorite = useCallback(async (imageId) => {
    try {
      const result = await imageGenerationService.toggleFavorite(imageId);
      if (result.success) {
        setHistory(prev => 
          prev.map(item => 
            item.id === imageId 
              ? { ...item, isFavorite: !item.isFavorite }
              : item
          )
        );
        if (generatedImage?.id === imageId) {
          setGeneratedImage(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
        }
        return true;
      }
      return false;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [generatedImage]);

  return {
    isGenerating,
    generatedImage,
    error,
    history,
    generateImage,
    loadHistory,
    clearHistory,
    deleteImage,
    toggleFavorite,
    setError,
  };
};