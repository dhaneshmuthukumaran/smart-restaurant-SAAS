const styles = [
  {
    id: 'realistic',
    label: 'Realistic',
    icon: '📷',
    description: 'High-fidelity, photorealistic rendering with accurate textures and lighting.',
    promptSuffix: 'in a photorealistic style, ultra-detailed, natural lighting, sharp texture',
  },
  {
    id: 'cinematic',
    label: 'Cinematic',
    icon: '🎬',
    description: 'Dramatic lighting, film-like color grading and shallow depth of field.',
    promptSuffix: 'cinematic lighting, dramatic contrast, shallow depth of field, film grain',
  },
  {
    id: 'minimalist',
    label: 'Minimalist',
    icon: '⚪️',
    description: 'Clean compositions, muted palettes, lots of negative space.',
    promptSuffix: 'minimal composition, simple background, muted color palette, plenty of negative space',
  },
  {
    id: 'rustic',
    label: 'Rustic',
    icon: '🪵',
    description: 'Warm tones, textured surfaces, and cozy natural materials.',
    promptSuffix: 'warm tones, textured surfaces, wooden table, rustic styling',
  },
  {
    id: 'vibrant',
    label: 'Vibrant',
    icon: '🌈',
    description: 'Bold saturated colors and punchy contrast for eye-catching images.',
    promptSuffix: 'vibrant colors, high saturation, punchy contrast, energetic feel',
  },
  {
    id: 'monochrome',
    label: 'Monochrome',
    icon: '⚫️',
    description: 'Black-and-white or limited-tone renders with strong tonal contrast.',
    promptSuffix: 'black and white, high contrast, strong tonal range, timeless feel',
  },
]

export function getStyleById(id) {
  return styles.find((s) => s.id === id) || null
}

export function getStyleOptions() {
  return styles.map((s) => ({ value: s.id, label: s.label, icon: s.icon }))
}

export default styles
