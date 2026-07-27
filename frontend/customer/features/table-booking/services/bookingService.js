// services/bookingService.js

const mockBookings = [
  {
    id: 1,
    userId: 'user1',
    branchId: 'branch1',
    restaurantId: 'rest1',
    date: '2026-07-26',
    time: '19:00',
    partySize: 4,
    status: 'confirmed',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 555-123-4567',
      preferences: {
        dietary: 'Vegetarian',
        seating: 'Window',
        specialOccasion: 'Birthday',
        notes: 'Bring cake',
      },
    },
    table: {
      id: 't1',
      name: 'Table 4',
      capacity: 4,
      duration: 90,
    },
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-20T10:00:00Z',
  },
];

const mockAvailability = {
  date: '2026-07-26',
  slots: [
    { time: '18:00', timeLabel: '6:00 PM', availableTables: 3, isAvailable: true, status: 'available' },
    { time: '18:30', timeLabel: '6:30 PM', availableTables: 2, isAvailable: true, status: 'available' },
    { time: '19:00', timeLabel: '7:00 PM', availableTables: 1, isAvailable: true, status: 'limited' },
    { time: '19:30', timeLabel: '7:30 PM', availableTables: 0, isAvailable: false, status: 'unavailable' },
    { time: '20:00', timeLabel: '8:00 PM', availableTables: 2, isAvailable: true, status: 'available' },
    { time: '20:30', timeLabel: '8:30 PM', availableTables: 0, isAvailable: false, status: 'unavailable' },
    { time: '21:00', timeLabel: '9:00 PM', availableTables: 1, isAvailable: true, status: 'limited' },
  ],
  branch: {
    id: 'branch1',
    name: 'Downtown Flagship',
    address: '123 Main St, New York, NY 10001',
  },
  partySize: 2,
};

const bookingService = {
  async getAvailability(params = {}) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let slots = [...mockAvailability.slots];
    if ((params.partySize || 2) > 4) {
      slots = slots.map((slot) => ({
        ...slot,
        isAvailable: slot.availableTables >= Math.ceil((params.partySize || 2) / 2),
        status: slot.availableTables >= Math.ceil((params.partySize || 2) / 2) ? 'available' : 'unavailable',
      }));
    }

    return {
      date: params.date || mockAvailability.date,
      slots,
      branch: mockAvailability.branch,
      partySize: params.partySize || mockAvailability.partySize,
    };
  },

  async createBooking(bookingData) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newBooking = {
      id: Date.now(),
      userId: 'user1',
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      table: {
        id: 't1',
        name: 'Table 4',
        capacity: bookingData.partySize,
        duration: 90,
      },
    };
    mockBookings.push(newBooking);
    return newBooking;
  },

  async getBooking(id) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const booking = mockBookings.find((b) => b.id === Number(id));
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  },

  async getUserBookings(params = {}) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let filtered = [...mockBookings];
    if (params.status) {
      filtered = filtered.filter((b) => b.status === params.status);
    }
    const page = params.page || 1;
    const limit = params.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      bookings: filtered.slice(start, end),
      total: filtered.length,
      page,
      limit,
      pages: Math.ceil(filtered.length / limit),
    };
  },

  async confirmBooking(id) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const booking = mockBookings.find((b) => b.id === Number(id));
    if (booking) {
      booking.status = 'confirmed';
      booking.confirmedAt = new Date().toISOString();
    }
    return booking;
  },

  async cancelBooking(id, reason = '') {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const booking = mockBookings.find((b) => b.id === Number(id));
    if (booking) {
      booking.status = 'cancelled';
      booking.cancelledAt = new Date().toISOString();
      booking.cancellationReason = reason;
    }
    return booking;
  },

  async checkInBooking(id) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const booking = mockBookings.find((b) => b.id === Number(id));
    if (booking) {
      booking.status = 'checked_in';
    }
    return booking;
  },
};

export const getAvailability = bookingService.getAvailability;
export const submitBooking = bookingService.createBooking;
export default bookingService;