import { useEffect } from "react";
import { saveJSON } from "../utils/storage";

// Hook chung: mỗi khi value đổi (và đã nạp xong dữ liệu cũ) thì tự ghi vào AsyncStorage.
// Vì giỏ hàng dùng hook này, chỉ cần clear() trong store là AsyncStorage cũng được xoá theo.
export function useAutoPersist<T>(key: string, value: T, ready: boolean): void {
  useEffect(() => {
    if (ready) {
      void saveJSON(key, value);
    }
  }, [key, value, ready]);
}
