export function formatPrice(price: number): string {
  return `${price.toLocaleString("vi-VN")} đ`;
}

// "2026-10-22T15:05:00.000Z" -> "22/10/2026 15:05" (giờ địa phương của máy).
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const p = (n: number): string => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(
    d.getMinutes(),
  )}`;
}
