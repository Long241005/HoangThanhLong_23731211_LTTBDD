// Mỗi hàm trả về câu báo lỗi, hoặc null nếu hợp lệ.

export const validateRequired =
  (label: string) =>
  (v: string): string | null =>
    v.trim() ? null : `Vui lòng nhập ${label}`;

export const validatePhone = (v: string): string | null => {
  if (!v.trim()) return "Vui lòng nhập số điện thoại";
  return /^(0|\+84)\d{9}$/.test(v.replace(/\s/g, ""))
    ? null
    : "Số điện thoại không hợp lệ (vd 0901234567)";
};
