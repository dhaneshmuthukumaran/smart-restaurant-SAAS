const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// API endpoint used by the feature (replace with your backend endpoint)
export const IMAGE_API_URL = `${API_BASE}/api/images`

// Quality, aspect and lighting options presented to users
export const QUALITY_OPTIONS = ['low', 'medium', 'high']
export const ASPECT_RATIOS = ['1:1', '4:3', '16:9']
export const LIGHTING_OPTIONS = ['natural', 'studio', 'dramatic']

// Default generation options
export const DEFAULT_OPTIONS = {
	quality: 'medium',
	aspectRatio: '16:9',
	lighting: 'natural',
}

// Limits and storage keys
export const MAX_PROMPT_LENGTH = 400

export const STORAGE_KEYS = {
	HISTORY: 'imagegen:history',
	FAVORITES: 'imagegen:favorites',
}

export default {
	IMAGE_API_URL,
	QUALITY_OPTIONS,
	ASPECT_RATIOS,
	LIGHTING_OPTIONS,
	DEFAULT_OPTIONS,
	MAX_PROMPT_LENGTH,
	STORAGE_KEYS,
}
