import React from 'react';
import styles from '../styles/Booking.module.css';

export const BookingForm = ({ formValues, onChange, onSubmit, isSubmitting, onReset, children }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formRow}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={formValues.name} onChange={onChange} required />
      </div>

      <div className={styles.formRow}>
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" value={formValues.phone} onChange={onChange} required />
      </div>

      {children}

      <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Booking...' : 'Reserve table'}
      </button>

      <button className={styles.secondaryAction} type="button" onClick={onReset}>
        Start over
      </button>
    </form>
  );
};
