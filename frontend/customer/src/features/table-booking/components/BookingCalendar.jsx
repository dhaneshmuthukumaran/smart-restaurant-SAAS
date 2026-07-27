import React from 'react';
import styles from '../styles/Booking.module.css';

export const BookingCalendar = ({ availability, selectedDate, onSelectDate }) => {
  const dates = availability.map((item) => item.date);

  return (
    <div>
      <h3>Select a date</h3>
      <div className={styles.calendar}>
        {dates.map((date) => (
          <button
            key={date}
            type="button"
            className={`${styles.calendarButton} ${selectedDate === date ? styles.calendarButtonActive : ''}`}
            onClick={() => onSelectDate(date)}
          >
            <span>{new Date(`${date}T00:00:00`).toLocaleDateString('en', { weekday: 'short' })}</span>
            <strong>{new Date(`${date}T00:00:00`).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</strong>
          </button>
        ))}
      </div>
    </div>
  );
};
