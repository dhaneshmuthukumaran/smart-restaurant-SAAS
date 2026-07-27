// hooks/useBookingForm.js

import { useState, useCallback } from 'react';

export const useBookingForm = (initialValues = {}, onSubmit, validate) => {
  const [values, setValues] = useState({
    customer: {
      name: '',
      email: '',
      phone: '',
      preferences: {
        dietary: '',
        seating: '',
        specialOccasion: '',
        notes: '',
      },
    },
    partySize: 2,
    date: '',
    time: '',
    tableId: '',
    duration: 90,
    ...initialValues,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = useCallback((field, value) => {
    setValues((prev) => {
      const newValues = { ...prev };
      
      if (field.includes('.')) {
        const parts = field.split('.');
        let current = newValues;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) {
            current[parts[i]] = {};
          }
          current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
      } else {
        newValues[field] = value;
      }
      
      return newValues;
    });

    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  }, [touched]);

  const handleBlur = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    if (validate) {
      const validationErrors = validate(values);
      if (validationErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
      }
    }
  }, [values, validate]);

  const validateForm = useCallback(() => {
    if (!validate) return true;
    
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    const allTouched = {};
    Object.keys(values).forEach((key) => {
      allTouched[key] = true;
    });
    if (values.customer) {
      Object.keys(values.customer).forEach((key) => {
        allTouched[`customer.${key}`] = true;
        if (key === 'preferences' && values.customer.preferences) {
          Object.keys(values.customer.preferences).forEach((subKey) => {
            allTouched[`customer.preferences.${subKey}`] = true;
          });
        }
      });
    }
    setTouched(allTouched);
    
    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();
    
    setSubmitError(null);
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(values);
      }
    } catch (error) {
      setSubmitError(error.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }, [values, onSubmit, validateForm]);

  const resetForm = useCallback(() => {
    setValues({
      customer: {
        name: '',
        email: '',
        phone: '',
        preferences: {
          dietary: '',
          seating: '',
          specialOccasion: '',
          notes: '',
        },
      },
      partySize: 2,
      date: '',
      time: '',
      tableId: '',
      duration: 90,
      ...initialValues,
    });
    setErrors({});
    setTouched({});
    setSubmitError(null);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    isValid: Object.keys(errors).length === 0,
    isDirty: Object.keys(touched).length > 0,
    handleChange,
    handleBlur,
    handleSubmit,
    validateForm,
    resetForm,
    setValues,
  };
};

export default useBookingForm;