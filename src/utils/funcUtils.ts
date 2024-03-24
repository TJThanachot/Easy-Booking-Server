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
  return (
    Math.abs(new Date(checkOut).getDate() - new Date(checkIn).getDate()) *
    pricePerNight
  );
};
