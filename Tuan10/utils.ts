export const formatPrice = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " \u0111";

// Bo dau tieng Viet de "nha gia" tim ra "Nha Gia Kim"
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0111/g, "d")
    .replace(/\u0110/g, "D")
    .toLowerCase()
    .trim();
