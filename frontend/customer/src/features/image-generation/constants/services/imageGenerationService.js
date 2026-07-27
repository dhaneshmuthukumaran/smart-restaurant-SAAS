import { IMAGE_CONFIG } from '../constants/config';

// Main service for image generation API calls
export const imageGenerationService = {
  // Generate image from prompt
  generateImage: async (params) => {
    try {
      // Try calling the mock backend generate endpoint
      const res = await fetch('http://localhost:4000/api/images/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
      if (res.ok) {
        const json = await res.json()
        return json.data
      }

      // Fallback to client-side mock when backend is unavailable
      console.warn('Backend generate failed, falling back to client mock')
      console.log('Generating image with params:', params)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return {
        id: `img_${Date.now()}`,
        url: createMockImage(params.prompt, params.style),
        prompt: params.prompt,
        style: params.style,
        quality: params.quality,
        aspect: params.aspect,
        createdAt: new Date().toISOString(),
      }
    } catch (error) {
      console.error('Error generating image:', error)
      throw error
    }
  },
  
  // Get image history
  getHistory: async (userId) => {
    try {
      // Try backend first
      const res = await fetch('http://localhost:4000/api/images')
      if (res.ok) {
        const json = await res.json()
        return json.data || []
      }

      // Fallback to localStorage
      return JSON.parse(localStorage.getItem(IMAGE_CONFIG.STORAGE_KEYS.HISTORY) || '[]')
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  },
  
  // Delete image from history
  deleteImage: async (imageId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/images/${imageId}`, { method: 'DELETE' })
      if (res.ok) return { success: true }

      // Fallback local delete
      const history = JSON.parse(localStorage.getItem(IMAGE_CONFIG.STORAGE_KEYS.HISTORY) || '[]')
      const updated = history.filter((item) => item.id !== imageId)
      localStorage.setItem(IMAGE_CONFIG.STORAGE_KEYS.HISTORY, JSON.stringify(updated))
      return { success: true }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },
  
  // Toggle favorite status
  toggleFavorite: async (imageId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/images/${imageId}/favorite`, { method: 'POST' })
      if (res.ok) {
        const json = await res.json()
        return json
      }

      // Fallback local toggle
      const history = JSON.parse(localStorage.getItem(IMAGE_CONFIG.STORAGE_KEYS.HISTORY) || '[]')
      const item = history.find((i) => i.id === imageId)
      if (item) {
        item.isFavorite = !item.isFavorite
        localStorage.setItem(IMAGE_CONFIG.STORAGE_KEYS.HISTORY, JSON.stringify(history))
      }
      return { success: true, data: item }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  },
};

// Helper: Create mock image for demo
function createMockImage(prompt, style) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  
  // Background based on style
  const gradients = {
    realistic: ['#1a1a2e', '#16213e'],
    cinematic: ['#2c1810', '#4a2c1a'],
    minimalist: ['#f5f5f0', '#e8e6e0'],
    rustic: ['#3d2b1f', '#6b4423'],
    vibrant: ['#ff6b6b', '#ffd93d'],
    monochrome: ['#2d2d2d', '#555555'],
  };
  
  const colors = gradients[style] || gradients.realistic;
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(1, colors[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Decorative elements based on prompt
  const keywords = prompt.toLowerCase();
  let emoji = '🍽️';
  if (keywords.includes('steak') || keywords.includes('burger')) emoji = '🥩';
  else if (keywords.includes('sushi') || keywords.includes('fish')) emoji = '🍣';
  else if (keywords.includes('pasta') || keywords.includes('spaghetti')) emoji = '🍝';
  else if (keywords.includes('cake') || keywords.includes('tiramisu')) emoji = '🍰';
  else if (keywords.includes('salad')) emoji = '🥗';
  else if (keywords.includes('coffee') || keywords.includes('espresso')) emoji = '☕';
  else if (keywords.includes('cocktail')) emoji = '🍸';
  
  // Draw decorative circles
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 5 + Math.random() * 30;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.1})`;
    ctx.fill();
  }
  
  // Display emoji
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '120px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, canvas.width / 2, canvas.height / 2 - 20);
  
  // Style label
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.font = '16px Inter, sans-serif';
  ctx.fillText(`✨ ${style} · ${prompt.substring(0, 50)}...`, canvas.width / 2, canvas.height - 40);
  
  return canvas.toDataURL('image/png');
}