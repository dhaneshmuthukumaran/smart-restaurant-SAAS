import { useState, useCallback } from 'react';

const initialForm = {
  author: '',
  rating: 0,
  comment: '',
};

export const useReviewForm = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setError('');
  }, []);

  const validateForm = useCallback(() => {
    if (!form.author.trim()) {
      setError('Please enter your name.');
      return false;
    }

    if (!form.rating || form.rating < 1) {
      setError('Please select a rating.');
      return false;
    }

    if (!form.comment.trim()) {
      setError('Please leave a review comment.');
      return false;
    }

    setError('');
    return true;
  }, [form]);

  const submitReview = useCallback(async (onSubmit) => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(form);
      resetForm();
      return true;
    } catch (submitError) {
      setError(submitError.message || 'Unable to submit review');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [form, resetForm, validateForm]);

  return {
    form,
    error,
    isSubmitting,
    updateField,
    submitReview,
    resetForm,
  };
};

export default useReviewForm;
