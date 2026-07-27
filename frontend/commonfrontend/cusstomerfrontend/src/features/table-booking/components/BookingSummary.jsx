import React from 'react';
import styles from '../styles/Booking.module.css';

export const BookingSummary = ({ booking }) => {
  if (!booking) return null;

  return (
    <div className={styles.confirmation}>
      <h3>Reservation summary</h3>
      <p><strong>Date:</strong> {booking.selectedDate}</p>
      <p><strong>Time:</strong> {booking.selectedTime}</p>
      <p><strong>Party size:</strong> {booking.partySize}</p>
      <p><strong>Guest:</strong> {booking.name}</p>
      {booking.notes ? <p><strong>Notes:</strong> {booking.notes}</p> : null}
    </div>
  );
};
