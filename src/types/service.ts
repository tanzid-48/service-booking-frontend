export type Category = {
  id: number;
  name: string;
  description?: string | null;
};

export type ServiceProvider = {
  id: number;
  name: string;
  email: string;
};

export type Review = {
  id: number;
  rating: number;
  comment?: string | null;
  createdAt: string;
  customer?: { id: number; name: string };
};

export type Service = {
  id: number;
  title: string;
  description?: string | null;
  price: string;
  categoryId: number;
  providerId: number;
  category?: Category;
  provider?: ServiceProvider;
  reviews?: Review[];
  createdAt: string;
};

export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export type Booking = {
  id: number;
  bookingDate: string;
  status: BookingStatus;
  serviceId: number;
  customerId: number;
  service?: Service;
  customer?: { id: number; name: string; email: string };
  createdAt: string;
};
