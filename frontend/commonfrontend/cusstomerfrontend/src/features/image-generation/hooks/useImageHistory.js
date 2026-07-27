import { useState, useEffect, useCallback, useMemo } from 'react'
import * as storage from '../services/storageService'

export default function useImageHistory() {
  const [history, setHistory] = useState([])
  const [filter, setFilter] = useState('all') // 'all'|'favorites'
  const [sort, setSort] = useState('newest') // 'newest'|'oldest'

  const load = useCallback(() => {
    try {
      const h = storage.loadHistory() || []
      setHistory(h)
      return h
    } catch (e) {
      console.error('load history', e)
      setHistory([])
      return []
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const add = useCallback((item) => {
    storage.addHistoryItem(item)
    load()
  }, [load])

  const remove = useCallback((id) => {
    storage.saveHistory((storage.loadHistory() || []).filter((i) => i.id !== id))
    load()
  }, [load])

  const toggleFav = useCallback((item) => {
    const now = storage.toggleFavorite(item)
    // no need to reload history for favorites toggle, but do it to sync UI
    load()
    return now
  }, [load])

  const clearAll = useCallback(() => {
    storage.clearHistory()
    setHistory([])
  }, [])

  const filtered = useMemo(() => {
    let list = history.slice()
    if (filter === 'favorites') {
      const fav = storage.loadFavorites()
      const favUrls = new Set(fav.map((f) => f.id || f.url))
      list = list.filter((i) => favUrls.has(i.id || i.url))
    }
    if (sort === 'newest') list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    else list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    return list
  }, [history, filter, sort])

  return {
    history: filtered,
    rawHistory: history,
    loadHistory: load,
    addToHistory: add,
    deleteImage: remove,
    toggleFavorite: toggleFav,
    clearHistory: clearAll,
    setFilter,
    setSort,
    filter,
    sort,
  }
}
