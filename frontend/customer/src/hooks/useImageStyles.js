import { useState, useCallback } from 'react';
import { IMAGE_STYLES, getStyleOptions } from '../constants/imageStyles';
import { storageService } from '../services/storageService';

export const useImageStyles = () => {
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [styles] = useState(getStyleOptions());
  
  // Load saved style preference
  useState(() => {
    const settings = storageService.getSettings();
    if (settings?.preferredStyle) {
      setSelectedStyle(settings.preferredStyle);
    }
  }, []);

  const selectStyle = useCallback((styleId) => {
    if (IMAGE_STYLES[styleId]) {
      setSelectedStyle(styleId);
      
      // Save preference
      const settings = storageService.getSettings() || {};
      settings.preferredStyle = styleId;
      storageService.saveSettings(settings);
      
      return true;
    }
    return false;
  }, []);

  const getStyle = useCallback((styleId) => {
    return IMAGE_STYLES[styleId] || IMAGE_STYLES.realistic;
  }, []);

  const getCurrentStyle = useCallback(() => {
    return IMAGE_STYLES[selectedStyle] || IMAGE_STYLES.realistic;
  }, [selectedStyle]);

  return {
    styles,
    selectedStyle,
    selectStyle,
    getStyle,
    getCurrentStyle,
  };
};