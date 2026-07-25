import React from 'react';
import styles from '../styles/Booking.module.css';

export const SpecialRequests = ({ value, onChange }) => {
  return (
    <div className={styles.formRow}>
      <label htmlFor="special-requests">Special requests</label>
      <textarea
        id="special-requests"
        name="notes"
        rows="3"
        value={value}
        onChange={onChange}
        placeholder="Allergies, seating preference, celebration..."
      />
    </div>
  );
};
