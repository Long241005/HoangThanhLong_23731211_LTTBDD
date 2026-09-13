// data.ts
// Dữ liệu giả lập (mock data) cho toàn bộ app BookStore.
// Dùng chung cho cả 3 project gio1 / gio2 / gio3 và bài tổng hợp.
// Lưu ý: đây CHỈ là dữ liệu tĩnh, chưa gọi API — đúng phạm vi bài học (layout thuần).

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number; // đơn vị: VNĐ
  cover: string; // URL ảnh bìa
  discountPercent?: number; // có thì hiển thị badge giảm giá, ví dụ 20 => "-20%"
  isNew?: boolean; // true thì hiển thị badge "Mới" thay vì badge giảm giá
}

export interface Category {
  id: string;
  name: string;
}

export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Văn học' },
  { id: 'cat-2', name: 'Kinh tế' },
  { id: 'cat-3', name: 'Thiếu nhi' },
  { id: 'cat-4', name: 'Kỹ năng sống' },
  { id: 'cat-5', name: 'Truyện tranh' },
  { id: 'cat-6', name: 'Ngoại ngữ' },
  { id: 'cat-7', name: 'Lịch sử' },
];

export const BOOKS: Book[] = [
  {
    id: 'book-1',
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    price: 79000,
    cover: 'https://picsum.photos/seed/book1/300/400',
    discountPercent: 20,
  },
  {
    id: 'book-2',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: 86000,
    cover: 'https://picsum.photos/seed/book2/300/400',
    isNew: true,
  },
  {
    id: 'book-3',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    price: 68000,
    cover: 'https://picsum.photos/seed/book3/300/400',
  },
  {
    id: 'book-4',
    title: 'Sapiens: Lược Sử Loài Người',
    author: 'Yuval Noah Harari',
    price: 189000,
    cover: 'https://picsum.photos/seed/book4/300/400',
    discountPercent: 15,
  },
  {
    id: 'book-5',
    title: 'Doraemon Tập 1',
    author: 'Fujiko F. Fujio',
    price: 15000,
    cover: 'https://picsum.photos/seed/book5/300/400',
    isNew: true,
  },
  {
    id: 'book-6',
    title: 'Cách Nghĩ Để Thành Công',
    author: 'Napoleon Hill',
    price: 99000,
    cover: 'https://picsum.photos/seed/book6/300/400',
  },
];
