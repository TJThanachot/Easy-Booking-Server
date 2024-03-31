export const mapRoomtype = (roomType: string): number => {
  const roomTypes = {
    Deluxe: 2,
    Suite: 1,
    Economic: 3,
  } as any;
  return roomTypes[roomType];
};

export const calTotalPrice = (
  checkIn: Date,
  checkOut: Date,
  pricePerNight: number,
): number => {
  return Math.abs(
    ((new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24)) *
      pricePerNight,
  );
};
