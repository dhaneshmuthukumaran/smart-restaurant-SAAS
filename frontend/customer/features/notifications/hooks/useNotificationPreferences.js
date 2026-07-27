// hooks/useNotificationPreferences.js

import { useState, useEffect, useCallback } from 'react';
import notificationsService from '../services/notificationsService';
import { NotificationPreferences } from '../types/notifications.types';

export const useNotificationPreferences = (userId) => {
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Load preferences
   */
  const loadPreferences = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const prefs = await notificationsService.getPreferences(userId);
      setPreferences(prefs);
    } catch (err) {
      setError(err.message || 'Failed to load preferences');
      console.error('Failed to load preferences:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Update preferences
   */
  const updatePreferences = useCallback(async (newPreferences) => {
    if (!userId) return;

    setIsSaving(true);
    setError(null);

    try {
      const updated = await notificationsService.updatePreferences(
        userId,
        newPreferences
      );
      setPreferences(updated);
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update preferences');
      console.error('Failed to update preferences:', err);
      return null;
    } finally {
      setIsSaving(false);
    }
  }, [userId]);

  /**
   * Toggle channel preference
   */
  const toggleChannel = useCallback(async (channel) => {
    if (!preferences) return;

    const newPreferences = {
      ...preferences,
      channels: {
        ...preferences.channels,
        [channel]: !preferences.channels[channel],
      },
    };
    return await updatePreferences(newPreferences);
  }, [preferences, updatePreferences]);

  /**
   * Toggle category preference
   */
  const toggleCategory = useCallback(async (category) => {
    if (!preferences) return;

    const newPreferences = {
      ...preferences,
      categories: {
        ...preferences.categories,
        [category]: !preferences.categories[category],
      },
    };
    return await updatePreferences(newPreferences);
  }, [preferences, updatePreferences]);

  /**
   * Update quiet hours
   */
  const updateQuietHours = useCallback(async (quietHours) => {
    if (!preferences) return;

    const newPreferences = {
      ...preferences,
      quietHours: {
        ...preferences.quietHours,
        ...quietHours,
      },
    };
    return await updatePreferences(newPreferences);
  }, [preferences, updatePreferences]);

  /**
   * Toggle quiet hours
   */
  const toggleQuietHours = useCallback(async () => {
    if (!preferences) return;

    const newPreferences = {
      ...preferences,
      quietHours: {
        ...preferences.quietHours,
        enabled: !preferences.quietHours.enabled,
      },
    };
    return await updatePreferences(newPreferences);
  }, [preferences, updatePreferences]);

  /**
   * Reset preferences to default
   */
  const resetPreferences = useCallback(async () => {
    const defaultPrefs = new NotificationPreferences();
    return await updatePreferences(defaultPrefs);
  }, [updatePreferences]);

  /**
   * Check if channel is enabled
   */
  const isChannelEnabled = useCallback((channel) => {
    return preferences?.isChannelEnabled(channel) || false;
  }, [preferences]);

  /**
   * Check if category is enabled
   */
  const isCategoryEnabled = useCallback((category) => {
    return preferences?.isCategoryEnabled(category) || false;
  }, [preferences]);

  /**
   * Check if in quiet hours
   */
  const isInQuietHours = useCallback(() => {
    return preferences?.isInQuietHours() || false;
  }, [preferences]);

  // Load preferences on mount
  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  return {
    preferences,
    loading,
    error,
    isSaving,
    loadPreferences,
    updatePreferences,
    toggleChannel,
    toggleCategory,
    updateQuietHours,
    toggleQuietHours,
    resetPreferences,
    isChannelEnabled,
    isCategoryEnabled,
    isInQuietHours,
  };
};

export default useNotificationPreferences;