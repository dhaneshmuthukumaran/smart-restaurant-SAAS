import { MAX_PROMPT_LENGTH } from '../constants/config'
import styles, { getStyleById } from '../constants/imageStyles'
import { getAllPrompts, getPromptById } from '../constants/prompts'

export function enhancePrompt(basePrompt, { styleId = null, lighting = null } = {}) {
  try {
    let prompt = String(basePrompt || '').trim()
    if (styleId) {
      const st = getStyleById(styleId)
      if (st && st.promptSuffix) prompt = `${prompt} ${st.promptSuffix}`
    }
    if (lighting) prompt = `${prompt}, ${lighting} lighting`
    return prompt
  } catch (e) {
    console.error('enhancePrompt failed', e)
    return basePrompt
  }
}

export function validatePrompt(prompt) {
  try {
    if (!prompt || !String(prompt).trim()) return { valid: false, reason: 'Prompt is empty' }
    if (String(prompt).length > MAX_PROMPT_LENGTH) return { valid: false, reason: 'Prompt exceeds maximum length' }
    // basic blacklist check
    const bad = ['<script>', 'eval(', 'DROP TABLE']
    for (const b of bad) if (String(prompt).includes(b)) return { valid: false, reason: 'Prompt contains disallowed content' }
    return { valid: true }
  } catch (e) {
    return { valid: false, reason: 'Validation error' }
  }
}

export function generateDishPrompt(dishId) {
  try {
    const p = getPromptById(dishId)
    if (!p) return null
    return p.prompt
  } catch (e) {
    console.error('generateDishPrompt failed', e)
    return null
  }
}

export function getSuggestions(q = '') {
  try {
    const all = getAllPrompts()
    const term = String(q || '').toLowerCase()
    if (!term) return all.slice(0, 10)
    return all.filter((p) => p.label.toLowerCase().includes(term) || p.prompt.toLowerCase().includes(term))
  } catch (e) {
    console.error('getSuggestions failed', e)
    return []
  }
}

export default { enhancePrompt, validatePrompt, generateDishPrompt, getSuggestions }
