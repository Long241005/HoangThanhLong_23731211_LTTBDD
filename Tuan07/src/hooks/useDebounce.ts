import { useEffect, useState } from "react";

// Chỉ trả giá trị mới sau khi người dùng ngừng gõ đủ `delay` ms.
// Mỗi lần value đổi, timer cũ bị hủy ở hàm dọn dẹp nên chỉ lần gõ cuối cùng được áp dụng.
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
