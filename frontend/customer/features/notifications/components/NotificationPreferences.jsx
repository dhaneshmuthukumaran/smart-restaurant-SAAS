// components/NotificationPreferences.jsx

import React, { useState } from 'react';
import styles from '../styles/Notifications.module.css';

const NotificationPreferences = ({
  preferences,
  onUpdate,
  loading = false,
}) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [isSaving, setIsSaving] = useState(false);

  if (!localPreferences) {
    return (
      <div className={styles.preferencesLoading}>
        <div className={styles.loadingSpinner} />
        <p>Loading preferences...</p>
      </div>
    );
  }

  const handleToggle = (section, key) => {
    setLocalPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const handleQuietHoursChange = (field, value) => {
    setLocalPreferences((prev) => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdate?.(localPreferences);
    setIsSaving(false);
  };

  const handleReset = () => {
    setLocalPreferences(preferences);
  };

  const isChanged = JSON.stringify(localPreferences) !== JSON.stringify(preferences);

  return (
    <div className={styles.preferencesContainer}>
      <h3 className={styles.preferencesTitle}>Notification Settings</h3>

      {/* Channels */}
      <div className={styles.preferencesSection}>
        <h4 className={styles.sectionTitle}>Notification Channels</h4>
        <div className={styles.preferencesGrid}>
          <div className={styles.preferenceItem}>
            <label className={styles.toggleLabel}>
              <span className={styles.toggleIcon}>📧</span>
              Email Notifications
              <span className={styles.toggleDescription}>
                Receive notifications via email
              </span>
            </label>
            <button
              className={`${styles.toggleButton} ${
                localPreferences.channels.email ? styles.active : ''
              }`}
              onClick={() => handleToggle('channels', 'email')}
              disabled={loading}
            >
              {localPreferences.channels.email ? 'On' : 'Off'}
            </button>
          </div>

          <div className={styles.preferenceItem}>
            <label className={styles.toggleLabel}>
              <span className={styles.toggleIcon}>🔔</span>
              Push Notifications
              <span className={styles.toggleDescription}>
                Receive push notifications on your device
              </span>
            </label>
            <button
              className={`${styles.toggleButton} ${
                localPreferences.channels.push ? styles.active : ''
              }`}
              onClick={() => handleToggle('channels', 'push')}
              disabled={loading}
            >
              {localPreferences.channels.push ? 'On' : 'Off'}
            </button>
          </div>

          <div className={styles.preferenceItem}>
            <label className={styles.toggleLabel}>
              <span className={styles.toggleIcon}>📱</span>
              SMS Notifications
              <span className={styles.toggleDescription}>
                Receive notifications via SMS
              </span>
            </label>
            <button
              className={`${styles.toggleButton} ${
                localPreferences.channels.sms ? styles.active : ''
              }`}
              onClick={() => handleToggle('channels', 'sms')}
              disabled={loading}
            >
              {localPreferences.channels.sms ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className={styles.preferencesSection}>
        <h4 className={styles.sectionTitle}>Notification Categories</h4>
        <div className={styles.preferencesGrid}>
          <div className={styles.preferenceItem}>
            <label className={styles.toggleLabel}>
              <span className={styles.toggleIcon}>📦</span>
              Order Updates
              <span className={styles.toggleDescription}>
                Order status changes and updates
              </span>
            </label>
            <button
              className={`${styles.toggleButton} ${
                localPreferences.categories.orderUpdates ? styles.active : ''
              }`}
              onClick={() => handleToggle('categories', 'orderUpdates')}
              disabled={loading}
            >
              {localPreferences.categories.orderUpdates ? 'On' : 'Off'}
            </button>
          </div>

          <div className={styles.preferenceItem}>
            <label className={styles.toggleLabel}>
              <span className={styles.toggleIcon}>🎉</span>
              Promotions
              <span className={styles.toggleDescription}>
                Special offers and promotions
              </span>
            </label>
            <button
              className={`${styles.toggleButton} ${
                localPreferences.categories.promotions ? styles.active : ''
              }`}
              onClick={() => handleToggle('categories', 'promotions')}
              disabled={loading}
            >
              {localPreferences.categories.promotions ? 'On' : 'Off'}
            </button>
          </div>

          <div className={styles.preferenceItem}>
            <label className={styles.toggleLabel}>
              <span className={styles.toggleIcon}>💬</span>
              Review Replies
              <span className={styles.toggleDescription}>
                Responses from restaurants
              </span>
            </label>
            <button
              className={`${styles.toggleButton} ${
                localPreferences.categories.reviews ? styles.active : ''
              }`}
              onClick={() => handleToggle('categories', 'reviews')}
              disabled={loading}
            >
              {localPreferences.categories.reviews ? 'On' : 'Off'}
            </button>
          </div>

          <div className={styles.preferenceItem}>
            <label className={styles.toggleLabel}>
              <span className={styles.toggleIcon}>⏰</span>
              Reminders
              <span className={styles.toggleDescription}>
                Booking reminders and alerts
              </span>
            </label>
            <button
              className={`${styles.toggleButton} ${
                localPreferences.categories.reminders ? styles.active : ''
              }`}
              onClick={() => handleToggle('categories', 'reminders')}
              disabled={loading}
            >
              {localPreferences.categories.reminders ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className={styles.preferencesSection}>
        <h4 className={styles.sectionTitle}>Quiet Hours</h4>
        <div className={styles.quietHoursContainer}>
          <div className={styles.preferenceItem}>
            <label className={styles.toggleLabel}>
              <span className={styles.toggleIcon}>🌙</span>
              Enable Quiet Hours
              <span className={styles.toggleDescription}>
                Silence notifications during specific hours
              </span>
            </label>
            <button
              className={`${styles.toggleButton} ${
                localPreferences.quietHours.enabled ? styles.active : ''
              }`}
              onClick={() => handleToggle('quietHours', 'enabled')}
              disabled={loading}
            >
              {localPreferences.quietHours.enabled ? 'On' : 'Off'}
            </button>
          </div>

          {localPreferences.quietHours.enabled && (
            <div className={styles.quietHoursTime}>
              <div className={styles.timeInput}>
                <label>Start Time</label>
                <input
                  type="time"
                  value={localPreferences.quietHours.start}
                  onChange={(e) =>
                    handleQuietHoursChange('start', e.target.value)
                  }
                />
              </div>
              <span className={styles.timeSeparator}>to</span>
              <div className={styles.timeInput}>
                <label>End Time</label>
                <input
                  type="time"
                  value={localPreferences.quietHours.end}
                  onChange={(e) =>
                    handleQuietHoursChange('end', e.target.value)
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.preferencesActions}>
        <button
          className={styles.resetButton}
          onClick={handleReset}
          disabled={!isChanged || isSaving}
        >
          Reset
        </button>
        <button
          className={styles.saveButton}
          onClick={handleSave}
          disabled={!isChanged || isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;