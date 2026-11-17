import { api } from "../api/client";
import type { User } from "../types";

// Bài 9.4: PATCH /users/:id chỉ với { name, phone }.
// json-server trả cả password nên phải bỏ nó đi trước khi return.
export async function updateProfile(
  id: number,
  data: Pick<User, "name" | "phone">,
): Promise<User> {
  const res = await api.patch<User & { password?: string }>(`/users/${id}`, data);
  const { password: _pw, ...user } = res.data;
  return user;
}

// Đăng nhập giả lập theo đề buổi 9: tìm user theo email rồi so sánh mật khẩu
// ngay trên app. Tài khoản demo: demo@bookstore.vn / 123456.
export async function login(email: string, password: string): Promise<User> {
  const res = await api.get<Array<User & { password?: string }>>("/users", {
    params: { email: email.trim().toLowerCase() },
  });
  const found = res.data[0];
  if (!found || found.password !== password) {
    throw new Error("Email hoặc mật khẩu không đúng. Thử tài khoản demo: demo@bookstore.vn / 123456.");
  }
  const { password: _pw, ...user } = found;
  return user;
}
