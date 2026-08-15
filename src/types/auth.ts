export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  phone?: string | null;
  createdAt?: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};
