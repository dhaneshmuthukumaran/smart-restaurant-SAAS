export function saveImageToLocal(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    // ignore
  }
}

export function loadImageFromLocal(key) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : null
  } catch (e) {
    return null
  }
}

export default { saveImageToLocal, loadImageFromLocal }

// History & favorites helpers
const HISTORY_KEY = 'imagegen:history'
const FAV_KEY = 'imagegen:favorites'
const SETTINGS_KEY = 'imagegen:settings'

export function loadHistory() {
  return loadImageFromLocal(HISTORY_KEY) || []
}

export function saveHistory(history) {
  saveImageToLocal(HISTORY_KEY, history)
}

export function addHistoryItem(item) {
  try {
    const h = loadHistory()
    h.unshift(item)
    saveHistory(h.slice(0, 200))
  } catch (e) {
    console.error('save history failed', e)
  }
}

export function clearHistory() {
  try {
    saveHistory([])
  } catch (e) {
    console.error('clear history failed', e)
  }
}

export function loadFavorites() {
  return loadImageFromLocal(FAV_KEY) || []
}

export function saveFavorites(list) {
  saveImageToLocal(FAV_KEY, list)
}

export function toggleFavorite(item) {
  try {
    const fav = loadFavorites()
    const exists = fav.find((f) => f.id === item.id || f.url === item.url)
    if (exists) {
      const next = fav.filter((f) => !(f.id === item.id || f.url === item.url))
      saveFavorites(next)
      return false
    }
    saveFavorites([item, ...fav])
    return true
  } catch (e) {
    console.error('toggleFavorite failed', e)
    return false
  }
}

export function isFavorite(item) {
  try {
    return loadFavorites().some((f) => f.id === item.id || f.url === item.url)
  } catch (e) {
    return false
  }
}

export function saveSettings(obj) {
  try {
    saveImageToLocal(SETTINGS_KEY, obj)
  } catch (e) {
    console.error('saveSettings failed', e)
  }
}

export function getSettings() {
  try {
    return loadImageFromLocal(SETTINGS_KEY) || {}
  } catch (e) {
    return {}
  }
}

// Backwards compatible exports
export { addHistoryItem as saveToHistory, loadHistory as getHistory }

