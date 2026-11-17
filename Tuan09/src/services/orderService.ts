import { api } from "../api/client";
import type { Order } from "../types";

export interface NewOrder {
  userId: number;
  items: Order["items"];
  total: number;
  address: Order["address"];
  paymentMethod: Order["paymentMethod"];
}

// Bài 9.2: POST /orders, json-server tự cấp id và ghi vào db.json.
export async function createOrder(payload: NewOrder): Promise<Order> {
  const res = await api.post<Order>("/orders", {
    ...payload,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
  return res.data;
}

// Bài 9.3: đơn của một user, mới nhất lên đầu.
export async function getOrdersByUser(userId: number): Promise<Order[]> {
  const res = await api.get<Order[]>("/orders", {
    params: { userId, _sort: "createdAt", _order: "desc" },
  });
  return res.data;
}
