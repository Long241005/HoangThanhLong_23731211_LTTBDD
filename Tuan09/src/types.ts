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
  // Chỉ có trong dữ liệu trả về từ API (đăng nhập giả lập so sánh ngay trên app).
  // Không bao giờ lưu password vào Redux store.
  password?: string;
}

// ---- Buổi 9: thanh toán / đơn hàng / thông báo ----

export type PaymentMethod = "cod" | "bank";

export type OrderStatus = "pending" | "shipping" | "completed" | "cancelled";

export interface OrderItem {
  bookId: number;
  title: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  address: ShippingAddress;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string; // dạng ISO
}

export interface AppNotification {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  target?: { screen: "Orders" | "BookDetail"; bookId?: number };
}

export const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  cod: "Thanh toán khi nhận hàng (COD)",
  bank: "Chuyển khoản ngân hàng",
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Chờ xác nhận",
  shipping: "Đang giao",
  completed: "Hoàn tất",
  cancelled: "Đã huỷ",
};
