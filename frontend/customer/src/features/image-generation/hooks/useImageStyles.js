import { useState, useEffect, useCallback } from 'react'
import styles, { getStyleById } from '../constants/imageStyles'
import * as storage from '../services/storageService'

const SETTINGS_KEY = 'imagegen:settings'

export default function useImageStyles() {
  const [currentStyleId, setCurrentStyleId] = useState(null)

  useEffect(() => {
    try {
      const s = storage.getSettings() || {}
      if (s && s.styleId) setCurrentStyleId(s.styleId)
      else if (styles && styles.length) setCurrentStyleId(styles[0].id)
    } catch (e) {
      setCurrentStyleId(styles[0]?.id || null)
    }
  }, [])

  const selectStyle = useCallback((id) => {
    setCurrentStyleId(id)
    try {
      const s = storage.getSettings() || {}
      storage.saveSettings({ ...s, styleId: id })
    } catch (e) {
      console.error('save style failed', e)
    }
  }, [])

  const getStyle = useCallback((id) => getStyleById(id), [])

  const currentStyle = getStyleById(currentStyleId)

  return { styles, currentStyleId, currentStyle, selectStyle, getStyle }
}
