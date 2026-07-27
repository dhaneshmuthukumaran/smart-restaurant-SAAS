import { useState } from 'react';

export const useBookingForm = (initialValues = { name: '', phone: '', notes: '' }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setValues(initialValues);

  return { values, setValues, handleChange, reset };
};
