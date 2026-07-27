// types/booking.types.js

export const bookingTypes = {};

/**
 * @typedef {Object} Booking
 * @property {number|string} id - Unique booking identifier
 * @property {string} userId - User who made the booking
 * @property {string} branchId - Branch where booking is made
 * @property {string} restaurantId - Restaurant ID
 * @property {string} date - Booking date (YYYY-MM-DD)
 * @property {string} time - Booking time (HH:MM)
 * @property {number} partySize - Number of guests
 * @property {string} status - Booking status
 * @property {Object} customer - Customer details
 * @property {string} customer.name - Customer name
 * @property {string} customer.email - Customer email
 * @property {string} customer.phone - Customer phone
 * @property {Object} customer.preferences - Special preferences
 * @property {string} customer.preferences.dietary - Dietary restrictions
 * @property {string} customer.preferences.seating - Seating preference
 * @property {string} customer.preferences.specialOccasion - Special occasion
 * @property {string} customer.preferences.notes - Additional notes
 * @property {Object} table - Table details
 * @property {string} table.id - Table ID
 * @property {string} table.name - Table name/number
 * @property {number} table.capacity - Table capacity
 * @property {number} table.duration - Booking duration in minutes
 */

export const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CHECKED_IN: 'checked_in',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
};

export const BookingStatusLabels = {
  [BookingStatus.PENDING]: 'Pending',
  [BookingStatus.CONFIRMED]: 'Confirmed',
  [BookingStatus.CHECKED_IN]: 'Checked In',
  [BookingStatus.COMPLETED]: 'Completed',
  [BookingStatus.CANCELLED]: 'Cancelled',
  [BookingStatus.NO_SHOW]: 'No Show',
};

export const BookingStatusColors = {
  [BookingStatus.PENDING]: '#f39c12',
  [BookingStatus.CONFIRMED]: '#2ecc71',
  [BookingStatus.CHECKED_IN]: '#3498db',
  [BookingStatus.COMPLETED]: '#95a5a6',
  [BookingStatus.CANCELLED]: '#e74c3c',
  [BookingStatus.NO_SHOW]: '#c0392b',
};

export class Booking {
  constructor(data) {
    this.id = data.id || '';
    this.userId = data.userId || '';
    this.branchId = data.branchId || '';
    this.restaurantId = data.restaurantId || '';
    this.date = data.date || '';
    this.time = data.time || '';
    this.partySize = data.partySize || 2;
    this.status = data.status || BookingStatus.PENDING;
    this.customer = {
      name: data.customer?.name || '',
      email: data.customer?.email || '',
      phone: data.customer?.phone || '',
      preferences: {
        dietary: data.customer?.preferences?.dietary || '',
        seating: data.customer?.preferences?.seating || '',
        specialOccasion: data.customer?.preferences?.specialOccasion || '',
        notes: data.customer?.preferences?.notes || '',
      },
    };
    this.table = {
      id: data.table?.id || '',
      name: data.table?.name || '',
      capacity: data.table?.capacity || 0,
      duration: data.table?.duration || 90,
    };
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();
    this.confirmedAt = data.confirmedAt ? new Date(data.confirmedAt) : null;
    this.cancelledAt = data.cancelledAt ? new Date(data.cancelledAt) : null;
  }

  getFormattedDate() {
    if (!this.date) return '';
    const d = new Date(this.date);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  getFormattedTime() {
    if (!this.time) return '';
    const [hours, minutes] = this.time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  }

  getStatusLabel() {
    return BookingStatusLabels[this.status] || this.status;
  }

  getStatusColor() {
    return BookingStatusColors[this.status] || '#95a5a6';
  }

  isUpcoming() {
    if (this.status === BookingStatus.CANCELLED || this.status === BookingStatus.COMPLETED) return false;
    const bookingDate = new Date(`${this.date}T${this.time}`);
    return bookingDate > new Date();
  }

  isToday() {
    const today = new Date().toISOString().split('T')[0];
    return this.date === today;
  }

  canCancel() {
    if (this.status === BookingStatus.CANCELLED || this.status === BookingStatus.COMPLETED) return false;
    const bookingDate = new Date(`${this.date}T${this.time}`);
    const now = new Date();
    const diffMs = bookingDate - now;
    const diffMin = diffMs / (1000 * 60);
    return diffMin > 60;
  }
}

export class AvailabilitySlot {
  constructor(data) {
    this.time = data.time || '';
    this.timeLabel = data.timeLabel || '';
    this.availableTables = data.availableTables || 0;
    this.tables = data.tables || [];
    this.isAvailable = data.isAvailable || false;
    this.status = data.status || 'unavailable';
  }

  getStatusLabel() {
    const labels = {
      available: 'Available',
      limited: 'Limited',
      unavailable: 'Unavailable',
    };
    return labels[this.status] || 'Unavailable';
  }

  getStatusColor() {
    const colors = {
      available: '#2ecc71',
      limited: '#f39c12',
      unavailable: '#e74c3c',
    };
    return colors[this.status] || '#95a5a6';
  }
}