export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  categoryId: number;
  stock: number;
  description: string;
  emoji: string;
  color: string;
}

export interface Category {
  id: number;
  name: string;
  emoji: string;
}

export interface CartItem {
  bookId: number;
  title: string;
  price: number;
  emoji: string;
  color: string;
  stock: number;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}
