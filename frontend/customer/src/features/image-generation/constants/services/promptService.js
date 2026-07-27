import { IMAGE_STYLES } from '../constants/imageStyles';
import { IMAGE_CONFIG } from '../constants/config';

export const promptService = {
  // Enhance prompt with style and lighting
  enhancePrompt: (basePrompt, style, lighting) => {
    const styleData = IMAGE_STYLES[style] || IMAGE_STYLES.realistic;
    const lightingMap = {
      natural: 'natural daylight, soft shadows',
      studio: 'studio lighting, soft box, professional photography',
      dramatic: 'dramatic lighting, high contrast, moody atmosphere',
      warm: 'warm golden hour lighting, cozy atmosphere',
    };
    
    const lightingDesc = lightingMap[lighting] || lightingMap.studio;
    
    return `${basePrompt}, ${styleData.promptSuffix}, ${lightingDesc}, high quality, food photography, detailed, sharp focus`;
  },
  
  // Validate prompt length
  validatePrompt: (prompt) => {
    if (!prompt || prompt.trim().length === 0) {
      return { valid: false, error: 'Please describe what you want to see' };
    }
    if (prompt.length > IMAGE_CONFIG.MAX_PROMPT_LENGTH) {
      return { 
        valid: false, 
        error: `Prompt is too long (${prompt.length}/${IMAGE_CONFIG.MAX_PROMPT_LENGTH} characters)` 
      };
    }
    return { valid: true };
  },
  
  // Generate prompt from dish selection
  generateDishPrompt: (dishName, dishDescription) => {
    return `${dishDescription} - ${dishName} plated beautifully`;
  },
  
  // Get prompt suggestions
  getSuggestions: (query) => {
    const suggestions = [
      'A juicy wagyu steak with truffle butter',
      'Creamy pasta with black truffle',
      'Fresh sushi platter with salmon',
      'Elegant tiramisu dessert',
      'Mediterranean salad with feta',
      'Perfectly seared scallops',
      'Gourmet burger with cheese',
      'Colorful vegetable risotto',
      'Decadent chocolate cake',
      'Fresh seafood paella',
    ];
    
    if (!query) return suggestions.slice(0, 5);
    
    const lowerQuery = query.toLowerCase();
    return suggestions.filter(s => 
      s.toLowerCase().includes(lowerQuery)
    ).slice(0, 5);
  },
};