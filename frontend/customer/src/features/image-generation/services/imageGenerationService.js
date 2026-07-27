import { IMAGE_API_URL, DEFAULT_OPTIONS, MAX_PROMPT_LENGTH } from '../constants/config'

async function requestJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(body || `Request failed: ${res.status}`)
  }

  const json = await res.json()
  if (!json || json.success === false) {
    throw new Error(json?.message || 'API error')
  }

  return json.data
}

export async function generateImage(prompt, options = {}) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Invalid prompt')
  }
  if (prompt.length > MAX_PROMPT_LENGTH) {
    throw new Error('Prompt too long')
  }

  const merged = { ...DEFAULT_OPTIONS, ...options }
  const payload = {
    prompt,
    style: merged.styleId || merged.style || merged.lighting || merged.quality,
  }

  const data = await requestJson(`${IMAGE_API_URL}/generate`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return {
    ...data,
    prompt,
    options: merged,
  }
}

export async function getHistory() {
  try {
    return await requestJson(IMAGE_API_URL)
  } catch (e) {
    console.error('getHistory failed', e)
    return []
  }
}

export async function deleteImage(id) {
  if (!id) throw new Error('Image id required')
  await requestJson(`${IMAGE_API_URL}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
  return true
}

export async function toggleFavorite(item) {
  const id = typeof item === 'string' ? item : item?.id
  if (!id) throw new Error('Image id required')
  const data = await requestJson(`${IMAGE_API_URL}/${encodeURIComponent(id)}/favorite`, {
    method: 'POST',
  })
  return data
}

export default { generateImage, getHistory, deleteImage, toggleFavorite }
