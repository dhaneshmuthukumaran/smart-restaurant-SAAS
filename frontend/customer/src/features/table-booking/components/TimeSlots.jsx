import React from 'react';
import styles from '../styles/Booking.module.css';

export const TimeSlots = ({ slots, selectedTime, onSelectTime }) => {
  if (!slots.length) {
    return <p>Select a date to see available times.</p>;
  }

  return (
    <div>
      <h3>Choose a time</h3>
      <div className={styles.slotGroup}>
        {slots.map((slot) => (
          <button
            key={slot}
            type="button"
            className={`${styles.timeButton} ${selectedTime === slot ? styles.timeButtonActive : ''}`}
            onClick={() => onSelectTime(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};
