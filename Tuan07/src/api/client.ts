import axios from "axios";
import { API_URL } from "./config";

let currentToken: string | null = null;
export function setApiToken(token: string | null): void {
  currentToken = token;
}
export function tokenProvider(): string | null {
  return currentToken;
}

// Một instance axios dùng chung cho mọi service trong app.
export const api = axios.create({ baseURL: API_URL, timeout: 8000 });

api.interceptors.request.use((config) => {
  const token = tokenProvider();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    let message = "Đã có lỗi xảy ra. Vui lòng thử lại.";
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        message = "Không kết nối được máy chủ. Hãy kiểm tra json-server đã chạy ở cổng 3000 chưa.";
      } else if (error.response.status === 404) {
        message = "Không tìm thấy dữ liệu.";
      } else if (error.response.status >= 500) {
        message = "Máy chủ đang gặp sự cố.";
      }
    }
    return Promise.reject(new Error(message));
  },
);

export const getErrorMessage = (e: unknown): string =>
  e instanceof Error ? e.message : "Đã có lỗi xảy ra.";
