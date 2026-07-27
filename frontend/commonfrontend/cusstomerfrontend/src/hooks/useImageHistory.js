import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';

export const useImageHistory = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filter, setFilter] = useState('all'); // all, favorites
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, rating

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = useCallback(() => {
    const data = storageService.getHistory();
    setHistory(data);
    applyFilters(data, filter, sortBy);
  }, [filter, sortBy]);

  const applyFilters = useCallback((data, filterType, sortType) => {
    let filtered = [...data];
    
    // Apply filter
    if (filterType === 'favorites') {
      filtered = filtered.filter(item => item.isFavorite);
    }
    
    // Apply sort
    if (sortType === 'newest') {
      filtered.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    } else if (sortType === 'oldest') {
      filtered.sort((a, b) => new Date(a.savedAt) - new Date(b.savedAt));
    }
    
    setFilteredHistory(filtered);
  }, []);

  const addToHistory = useCallback((imageData) => {
    const saved = storageService.saveToHistory(imageData);
    setHistory(prev => [saved, ...prev]);
    applyFilters([saved, ...history], filter, sortBy);
  }, [history, filter, sortBy, applyFilters]);

  const deleteFromHistory = useCallback((imageId) => {
    storageService.deleteImage(imageId);
    setHistory(prev => prev.filter(item => item.id !== imageId));
    applyFilters(history.filter(item => item.id !== imageId), filter, sortBy);
  }, [history, filter, sortBy, applyFilters]);

  const clearAllHistory = useCallback(() => {
    storageService.clearHistory();
    setHistory([]);
    setFilteredHistory([]);
  }, []);

  const toggleFavorite = useCallback((imageId) => {
    const updated = history.map(item => 
      item.id === imageId ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setHistory(updated);
    applyFilters(updated, filter, sortBy);
  }, [history, filter, sortBy, applyFilters]);

  const changeFilter = useCallback((newFilter) => {
    setFilter(newFilter);
    applyFilters(history, newFilter, sortBy);
  }, [history, sortBy, applyFilters]);

  const changeSort = useCallback((newSort) => {
    setSortBy(newSort);
    applyFilters(history, filter, newSort);
  }, [history, filter, applyFilters]);

  return {
    history,
    filteredHistory,
    filter,
    sortBy,
    loadHistory,
    addToHistory,
    deleteFromHistory,
    clearAllHistory,
    toggleFavorite,
    changeFilter,
    changeSort,
  };
};