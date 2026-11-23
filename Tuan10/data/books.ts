import type { Book } from "../types";

// Dữ liệu cho sẵn: một mảng, không gọi API.
// 9 tựa sách lấy từ danh sách buổi 9 (Tuan09); "Atomic Habits" là tựa bắt buộc
// theo đề buổi 10 (hết hàng) nên được thêm vào thay cho một tựa khác.
export const BOOKS: Book[] = [
  {
    id: "1",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 89000,
    rating: 9.0,
    category: "Văn học",
    inStock: true,
    description:
      "Câu chuyện về cậu bé chăn cừu Santiago đi tìm kho báu và đi tìm chính mình. Một cuốn sách nhẹ nhàng nhưng khiến người đọc suy nghĩ lâu về ước mơ và hành trình theo đuổi ước mơ.",
    cover: "https://picsum.photos/seed/bookstore1/200/300",
  },
  {
    id: "2",
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 99000,
    rating: 8.8,
    category: "Kỹ năng sống",
    inStock: true,
    description:
      "Cuốn sách kinh điển về nghệ thuật giao tiếp và thuyết phục: lắng nghe, khen ngợi chân thành và đặt mình vào vị trí của người khác.",
    cover: "https://picsum.photos/seed/bookstore2/200/300",
  },
  {
    id: "3",
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 389000,
    rating: 9.1,
    category: "Lập trình",
    inStock: true,
    description:
      "Sách về cách viết code sạch, dễ đọc, dễ bảo trì: đặt tên có ý nghĩa, hàm ngắn gọn, tránh trùng lặp và viết kiểm thử.",
    cover: "https://picsum.photos/seed/bookstore3/200/300",
  },
  {
    id: "4",
    title: "React Native in Action",
    author: "Nader Dabit",
    price: 299000,
    rating: 8.6,
    category: "Lập trình",
    inStock: false,
    description:
      "Hướng dẫn xây dựng ứng dụng di động đa nền tảng bằng React Native, từ component cơ bản tới điều hướng và gọi API.",
    cover: "https://picsum.photos/seed/bookstore4/200/300",
  },
  {
    id: "5",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    author: "Rosie Nguyễn",
    price: 85000,
    rating: 8.5,
    category: "Kỹ năng sống",
    inStock: true,
    description:
      "Những chia sẻ và trải nghiệm về tuổi trẻ: học tập, đi, đọc sách và tìm ra điều mình thực sự muốn làm.",
    cover: "https://picsum.photos/seed/bookstore5/200/300",
  },
  {
    id: "6",
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    price: 65000,
    rating: 8.7,
    category: "Văn học",
    inStock: true,
    description:
      "Cuộc phiêu lưu của chú dế mèn qua nhiều vùng đất, gặp gỡ nhiều nhân vật và trưởng thành qua từng chuyến đi.",
    cover: "https://picsum.photos/seed/bookstore6/200/300",
  },
  {
    id: "7",
    title: "Khởi Nghiệp Tinh Gọn",
    author: "Eric Ries",
    price: 149000,
    rating: 8.6,
    category: "Kinh doanh",
    inStock: true,
    description:
      "Phương pháp khởi nghiệp tinh gọn: xây dựng sản phẩm tối thiểu, đo lường phản hồi của khách hàng và học hỏi để điều chỉnh.",
    cover: "https://picsum.photos/seed/bookstore7/200/300",
  },
  {
    id: "8",
    title: "Tư Duy Nhanh Và Chậm",
    author: "Daniel Kahneman",
    price: 219000,
    rating: 9.0,
    category: "Kỹ năng sống",
    inStock: true,
    description:
      "Hai hệ thống tư duy của con người: tư duy nhanh theo trực giác và tư duy chậm có phân tích, cùng những thiên kiến thường gặp.",
    cover: "https://picsum.photos/seed/bookstore8/200/300",
  },
  {
    id: "9",
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    price: 249000,
    rating: 9.2,
    category: "Khoa học",
    inStock: true,
    description:
      "Lược sử loài người từ thời săn bắn hái lượm tới xã hội hiện đại: cách Homo sapiens trở thành loài thống trị hành tinh.",
    cover: "https://picsum.photos/seed/bookstore9/200/300",
  },
  {
    id: "10",
    title: "Atomic Habits",
    author: "James Clear",
    price: 139000,
    rating: 9.0,
    category: "Kỹ năng sống",
    inStock: false,
    description:
      "Thói quen nhỏ tạo ra thay đổi lớn: cách xây dựng thói quen tốt và phá bỏ thói quen xấu bằng những bước nhỏ mỗi ngày.",
    cover: "https://picsum.photos/seed/bookstore10/200/300",
  },
];

// Giả lập tải dữ liệu: trả mảng sau 700 ms để thấy ActivityIndicator và RefreshControl. Không truy cập mạng.
export function loadBooks(delay = 700): Promise<Book[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...BOOKS]), delay));
}

// Màn Chi tiết và Yêu thích luôn đọc từ mảng (id trong db.json trùng với mảng).
export function getBookById(id: string): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}
