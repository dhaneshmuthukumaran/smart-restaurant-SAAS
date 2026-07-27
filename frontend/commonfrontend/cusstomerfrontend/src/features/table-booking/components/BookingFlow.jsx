import React, { useEffect } from 'react';
import { BookingCalendar } from './BookingCalendar';
import { BookingConfirmation } from './BookingConfirmation';
import { BookingForm } from './BookingForm';
import { PartySizeSelector } from './PartySizeSelector';
import { SpecialRequests } from './SpecialRequests';
import { TimeSlots } from './TimeSlots';
import { BookingSkeleton } from './BookingSkeleton';
import { BookingSummary } from './BookingSummary';
import { useBooking } from '../hooks/useBooking';
import { useAvailability } from '../hooks/useAvailability';
import { useBookingForm } from '../hooks/useBookingForm';
import styles from '../styles/Booking.module.css';

const BookingFlow = () => {
  const { availability, loading } = useAvailability();
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    partySize,
    setPartySize,
    selectedSlotOptions,
    loadAvailability,
    isSubmitting,
    confirmation,
    handleSubmit,
  } = useBooking();
  const { values: formValues, handleChange, reset: resetForm } = useBookingForm();

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability]);

  const handleFormChange = (event) => {
    handleChange(event);
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime('');
    setPartySize(2);
    resetForm();
  };

  if (loading && !availability.length) {
    return <BookingSkeleton />;
  }

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h2>Reserve your table</h2>
        <p>Book a cozy place for your next visit in just a few steps.</p>
      </section>

      <div className={styles.layout}>
        <div className={styles.card}>
          <BookingCalendar availability={availability} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          <TimeSlots slots={selectedSlotOptions} selectedTime={selectedTime} onSelectTime={setSelectedTime} />
          <PartySizeSelector partySize={partySize} onSelectSize={setPartySize} />
        </div>

        <div className={styles.card}>
          <BookingForm
            formValues={formValues}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onReset={resetBooking}
          >
            <SpecialRequests value={formValues.notes} onChange={handleFormChange} />
          </BookingForm>
          {confirmation ? <BookingSummary booking={confirmation} /> : null}
          <BookingConfirmation confirmation={confirmation} />
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
