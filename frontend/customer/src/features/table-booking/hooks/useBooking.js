import { useMemo, useState } from 'react';
import { getAvailability, submitBooking } from '../services/bookingService';

export const useBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [formValues, setFormValues] = useState({ name: '', phone: '', notes: '' });
  const [availability, setAvailability] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const loadAvailability = async () => {
    const data = await getAvailability();
    setAvailability(data);
  };

  const handleSubmit = async (event) => {
    event?.preventDefault?.();
    setIsSubmitting(true);

    const result = await submitBooking({
      selectedDate,
      selectedTime,
      partySize,
      ...formValues,
    });

    setConfirmation(result);
    setIsSubmitting(false);
  };

  const selectedSlotOptions = useMemo(() => {
    const match = availability.find((item) => item.date === selectedDate);
    return match?.slots ?? [];
  }, [availability, selectedDate]);

  return {
    availability,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    partySize,
    setPartySize,
    formValues,
    setFormValues,
    selectedSlotOptions,
    loadAvailability,
    isSubmitting,
    confirmation,
    handleSubmit,
  };
};
