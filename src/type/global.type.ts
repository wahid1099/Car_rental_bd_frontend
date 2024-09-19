export type TCar = {
  _id: string;
  key: string;
  carName: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  isDelete: boolean;
  pricePerHour: number;
  status: string;
  carImgUrl: string[];
  vehicleSpecification: string;
  maxSeats: number;
  rating: number;
  gearType: string;
  fuelType: string;
  carType: string;
  location: string;
};
export type TCarBooking = {
  _id: string;

  user: TUser;
  car: TCar;
  dropOffDate: string;
  paymentStatus: string;
  totalCost: number;
  status: string;
  identity: string;
  identityNo: string;
  drivingLicenseNo: string;
  isDeleted: boolean;
  pickUpDate: string;
  createdAt: string;
  updatedAt: string;
  pickTime: string;
  dropTime: string;
};
export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export const carFeatures = [
  { value: "sunroof", label: "Sunroof" },
  { value: "navigation", label: "Navigation System" },
  { value: "bluetooth", label: "Bluetooth Connectivity" },
  { value: "backupCamera", label: "Backup Camera" },
  { value: "heatedSeats", label: "Heated Seats" },
  { value: "leatherSeats", label: "Leather Seats" },
  { value: "blindSpotMonitor", label: "Blind Spot Monitor" },
  { value: "adaptiveCruiseControl", label: "Adaptive Cruise Control" },
  { value: "remoteStart", label: "Remote Start" },
  { value: "allWheelDrive", label: "All-Wheel Drive" },
  { value: "powerLiftgate", label: "Power Liftgate" },
  { value: "appleCarPlay", label: "Apple CarPlay" },
  { value: "androidAuto", label: "Android Auto" },
  { value: "ventilatedSeats", label: "Ventilated Seats" },
  { value: "laneDepartureWarning", label: "Lane Departure Warning" },
];
export const vehicleSpecifications = [
  { value: "engineType", label: "Engine Type" },
  { value: "horsepower", label: "Horsepower" },
  { value: "torque", label: "Torque" },
  { value: "0to60", label: "0-60 mph Time" },
  { value: "topSpeed", label: "Top Speed" },
  { value: "fuelEconomy", label: "Fuel Economy (mpg)" },
  { value: "transmission", label: "Transmission" },
  { value: "driveType", label: "Drive Type" },
  { value: "length", label: "Length (inches)" },
  { value: "width", label: "Width (inches)" },
  { value: "height", label: "Height (inches)" },
  { value: "wheelbase", label: "Wheelbase (inches)" },
  { value: "curbWeight", label: "Curb Weight (lbs)" },
  { value: "cargoVolume", label: "Cargo Volume (cu ft)" },
  { value: "seatingCapacity", label: "Seating Capacity" },
];
