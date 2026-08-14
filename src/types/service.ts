export type Category = {
  id: number;
  name: string;
  description?: string | null;
};

export type Provider = {
  id: number;
  name: string;
  email: string;
};

export type Service = {
  id: number;
  title: string;
  description?: string | null;
  price: string;
  category: Category;
  provider: Provider;
  createdAt: string;
};
