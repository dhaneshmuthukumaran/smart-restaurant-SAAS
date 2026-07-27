import React from 'react';
import styles from '../styles/Booking.module.css';

export const BookingConfirmation = ({ confirmation }) => {
  if (!confirmation) return null;

  return (
    <div className={styles.confirmation}>
      <h3>Booking confirmed</h3>
      <p>Your reservation request has been received.</p>
      <p>Booking ID: {confirmation.bookingId}</p>
      <p>For {confirmation.partySize} guests at {confirmation.selectedTime} on {confirmation.selectedDate}.</p>
    </div>
  );
};
