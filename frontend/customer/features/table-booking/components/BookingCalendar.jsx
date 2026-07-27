// components/BookingCalendar.jsx

import React, { useState, useCallback } from 'react';

const BookingCalendar = ({
  selectedDate,
  onDateSelect,
  availableDates = [],
  blockedDates = [],
  minDate,
  maxDate,
  isLoading = false,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const getDaysInMonth = useCallback((year, month) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((year, month) => {
    return new Date(year, month, 1).getDay();
  }, []);

  const isDateAvailable = useCallback((dateStr) => {
    if (availableDates.length > 0) {
      return availableDates.includes(dateStr);
    }
    return !blockedDates.includes(dateStr);
  }, [availableDates, blockedDates]);

  const isDateInPast = useCallback((dateStr) => {
    return dateStr < todayStr;
  }, [todayStr]);

  const isDateInRange = useCallback((dateStr) => {
    if (minDate && dateStr < minDate) return false;
    if (maxDate && dateStr > maxDate) return false;
    return true;
  }, [minDate, maxDate]);

  const isDateSelected = useCallback((dateStr) => {
    return dateStr === selectedDate;
  }, [selectedDate]);

  const handleDateClick = useCallback((dateStr) => {
    if (!isDateAvailable(dateStr)) return;
    if (isDateInPast(dateStr)) return;
    if (!isDateInRange(dateStr)) return;
    onDateSelect(dateStr);
  }, [isDateAvailable, isDateInPast, isDateInRange, onDateSelect]);

  const previousMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }, [currentMonth, currentYear]);

  const nextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }, [currentMonth, currentYear]);

  const generateCalendarDays = useCallback(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isAvailable = isDateAvailable(dateStr);
      const isPast = isDateInPast(dateStr);
      const isInRange = isDateInRange(dateStr);
      const isSelected = isDateSelected(dateStr);
      const isToday = dateStr === todayStr;

      days.push({
        day,
        dateStr,
        isAvailable,
        isPast,
        isInRange,
        isSelected,
        isToday,
        isBlocked: !isAvailable || isPast || !isInRange,
      });
    }

    return days;
  }, [
    currentYear,
    currentMonth,
    getDaysInMonth,
    getFirstDayOfMonth,
    isDateAvailable,
    isDateInPast,
    isDateInRange,
    isDateSelected,
    todayStr,
  ]);

  const days = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (isLoading) {
    return (
      <div style={{
        padding: '1rem',
        background: '#fff',
        borderRadius: '0.9rem',
        border: '1px solid #e5e7eb',
      }}>
        <div style={{ height: '2rem', background: '#f3f4f6', borderRadius: '0.25rem', marginBottom: '1rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem' }}>
          {[...Array(35)].map((_, i) => (
            <div key={i} style={{ paddingTop: '100%', background: '#f3f4f6', borderRadius: '0.25rem' }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '1rem',
      background: '#fff',
      borderRadius: '0.9rem',
      border: '1px solid #e5e7eb',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}>
        <button
          onClick={previousMonth}
          style={{
            padding: '0.25rem 0.75rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.25rem',
            background: '#fff',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
          ‹
        </button>
        <span style={{ fontWeight: '600', fontSize: '1rem' }}>
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          onClick={nextMonth}
          style={{
            padding: '0.25rem 0.75rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.25rem',
            background: '#fff',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
          ›
        </button>
      </div>

      {/* Week days */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.25rem',
        marginBottom: '0.5rem',
      }}>
        {weekDays.map((day) => (
          <div key={day} style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#6b7280',
          }}>
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '0.25rem',
      }}>
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} style={{ paddingTop: '100%' }} />;
          }

          return (
            <button
              key={day.dateStr}
              onClick={() => handleDateClick(day.dateStr)}
              disabled={day.isBlocked}
              style={{
                paddingTop: '100%',
                position: 'relative',
                border: day.isSelected ? '2px solid #f1c40f' : '1px solid transparent',
                borderRadius: '0.25rem',
                background: day.isSelected ? '#fefce8' : 'transparent',
                cursor: day.isBlocked ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '0.85rem',
                color: day.isBlocked ? '#d1d5db' : '#111827',
                fontWeight: day.isSelected ? '600' : '400',
              }}>
                {day.day}
              </span>
              {day.isToday && (
                <span style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#f1c40f',
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingCalendar;