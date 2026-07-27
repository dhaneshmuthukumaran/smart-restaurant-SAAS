const mockAvailability = [
  { date: '2026-07-25', slots: ['18:00', '19:00', '20:30'] },
  { date: '2026-07-26', slots: ['17:30', '19:30', '21:00'] },
  { date: '2026-07-27', slots: ['18:30', '20:00', '21:30'] },
];

export const getAvailability = async () => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return mockAvailability;
};

export const submitBooking = async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return {
    success: true,
    bookingId: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    ...payload,
  };
};
