import { IMAGE_CONFIG } from '../constants/config';

export const storageService = {
  // Save image to history
  saveToHistory: (imageData) => {
    try {
      const history = JSON.parse(localStorage.getItem(IMAGE_CONFIG.STORAGE_KEYS.HISTORY) || '[]');
      const newEntry = {
        ...imageData,
        id: imageData.id || `img_${Date.now()}`,
        savedAt: new Date().toISOString(),
        isFavorite: false,
      };
      
      // Add to beginning of array (newest first)
      history.unshift(newEntry);
      
      // Limit history to 100 items
      if (history.length > 100) {
        history.length = 100;
      }
      
      localStorage.setItem(IMAGE_CONFIG.STORAGE_KEYS.HISTORY, JSON.stringify(history));
      return newEntry;
    } catch (error) {
      console.error('Error saving to history:', error);
      return null;
    }
  },
  
  // Get history
  getHistory: () => {
    try {
      return JSON.parse(localStorage.getItem(IMAGE_CONFIG.STORAGE_KEYS.HISTORY) || '[]');
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  },
  
  // Clear history
  clearHistory: () => {
    try {
      localStorage.removeItem(IMAGE_CONFIG.STORAGE_KEYS.HISTORY);
      return true;
    } catch (error) {
      console.error('Error clearing history:', error);
      return false;
    }
  },
  
  // Get favorites
  getFavorites: () => {
    try {
      const history = storageService.getHistory();
      return history.filter(item => item.isFavorite);
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },
  
  // Save user settings
  saveSettings: (settings) => {
    try {
      localStorage.setItem(IMAGE_CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },
  
  // Get user settings
  getSettings: () => {
    try {
      const settings = localStorage.getItem(IMAGE_CONFIG.STORAGE_KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  },
};