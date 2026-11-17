import type { Book } from "../types";

export type PriceRange = "lt100" | "100to300" | "gt300" | null;

export interface BookFilter {
  keyword: string;
  categoryId: number | null;
  priceRange: PriceRange;
}

// Bỏ dấu tiếng Việt: NFD tách dấu, xóa dấu, đ/Đ đổi thành d/D, về chữ thường, cắt khoảng trắng thừa.
export const normalize = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

export const inRange = (price: number, range: PriceRange): boolean => {
  if (range === null) return true;
  if (range === "lt100") return price < 100000;
  if (range === "100to300") return price >= 100000 && price <= 300000;
  return price > 300000;
};

// Các điều kiện kết hợp bằng AND: từ khóa (title hoặc author) + danh mục + khoảng giá.
// Từ khóa rỗng và categoryId null đều giữ tất cả, nên chưa chọn gì thì vẫn thấy đủ 12 sách.
export function filterBooks(books: Book[], f: BookFilter): Book[] {
  const k = normalize(f.keyword);
  return books.filter(
    (b) =>
      (k === "" || normalize(b.title).includes(k) || normalize(b.author).includes(k)) &&
      (f.categoryId === null || b.categoryId === f.categoryId) &&
      inRange(b.price, f.priceRange),
  );
}
