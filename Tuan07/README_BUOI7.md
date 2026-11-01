# BookStore — Buổi 7: Điều hướng, Redux, API & Tìm kiếm

Sinh viên: Hoàng Thanh Long — MSSV: 23731211

## Lưu ý quan trọng: đây là bản dựng lại từ đề bài, không phải starter gốc của thầy

Lúc làm bài này, chỉ có file đề `BaiThucHanh_Buoi7_BookStore_DieuHuong_API_TimKiem.docx`,
không có file `BookStore_Buoi7_Starter.zip` gốc trong tay, nên bản này được dựng lại
hoàn chỉnh từ đề bài, đúng cấu trúc thư mục trong đề: `App.tsx`, `db.json`,
`src/api`, `src/components`, `src/navigation`, `src/screens`, `src/services`,
`src/store`, `src/hooks`, `src/utils`. Các component giao diện `TabBar`, `BookCard`,
`BookGrid`, `SearchBar`, `EmptyState`, `LoadingView`, `ErrorView`,
`FloatingCartButton`, `PriceFilter` được viết lại theo mô tả trong đề (màu navy
`#0B1F5C` cho header, indigo `#3B3FD8` cho nút chính và giá, cyan `#00B8D9`
cho nút giỏ nổi, nền `#F4F6FB`, thẻ trắng bo góc 16), không phải là code gốc
từ starter của thầy. Toàn bộ 8 bài đã làm xong, không còn khung TodoBox hay
dòng TODO BT7 nào trong `src/`.

## Cách chạy (Node 20+; máy trường đã lên Node 26)

Terminal 1 — chạy API giả:

```bash
npm install
npm run api
```

Terminal 2 — chạy app (mở terminal mới, cùng thư mục project):

```bash
npx expo start
```

Sau đó nhấn `w` để mở bản web, hoặc quét QR bằng Expo Go trên điện thoại
(máy tính và điện thoại phải cùng Wi-Fi). Kiểm tra kiểu trước khi nộp:

```bash
npx tsc --noEmit
```

API chạy ở `http://localhost:3000`. Thử trên trình duyệt: `/books` phải thấy
12 cuốn, `/books/3` là Clean Code, `/categories` phải thấy 5 danh mục.
Trên điện thoại thật, nếu không gọi được API thì chạy:

```bash
EXPO_PUBLIC_API_URL=http://<IP-máy-tính>:3000 npx expo start -c
```

Tài khoản demo: `demo@bookstore.vn` / `123456`. Đăng nhập trong buổi này là
giả lập: ở tab Tài khoản, bấm "Đăng nhập thử" là vào bằng tài khoản demo,
bấm "Đăng xuất" là quay lại màn khóa.

## Đã làm đủ 8 bài + 2 thử thách + câu 5

- **7.1:** Native Stack ngoài (Tabs → BookDetail → Checkout) + Bottom Tab trong
  Tabs (Home, Danh mục, Giỏ hàng, Tài khoản), tab bar tự dựng qua `CustomTabBar`
  (state.routes → TabItem, emit tabPress, navigate nếu chưa focus), không dùng
  tab bar mặc định. BookDetail đăng ký ở Stack, title "Chi tiết sách".
- **7.2:** Home bấm sách → `navigate("BookDetail", { bookId })`; Giỏ bấm Thanh
  toán → `navigate("Checkout", { total })`; hai màn nhận đúng qua `route.params`.
- **7.3:** Redux Toolkit `cartSlice` (add trùng thì tăng số lượng, kẹp ≤ stock;
  remove, setQuantity kẹp 1..stock, clear), `useCart` tính tổng bằng useMemo +
  reduce, badge tab Giỏ và nút giỏ nổi đều hiện tổng số lượng, Giỏ trống hiện
  "Giỏ hàng trống".
- **7.4:** `authSlice` setCredentials/logout, `useAuth` có
  `isLoggedIn = !!token && !!user`, tab Tài khoản có 2 nhánh chưa/đã đăng nhập.
- **7.5:** `bookService` qua axios instance chung, Home gọi song song
  `Promise.all([getBooks(), getCategories()])`, đủ 3 trạng thái Loading/Error
  (nút Thử lại)/dữ liệu; Chi tiết gọi `getBookById(bookId)`.
- **7.6:** `categoryService` + tab Danh mục đủ 3 trạng thái, hiện đủ 5 danh mục.
- **7.7:** `useDebounce` 400ms (setTimeout + clearTimeout ở hàm dọn dẹp),
  `normalize` bỏ dấu, `filterBooks` lọc theo từ khóa ở title hoặc author,
  EmptyState + nút "Xóa bộ lọc" khi không có kết quả.
- **7.8:** Lọc AND theo danh mục + từ khóa + giá; bấm danh mục ở tab Danh mục
  → về Home đã lọc, Home xóa params bằng `setParams` để không áp lại.
- **C1:** `wishlistSlice` toggleWishlist + nút ♡/♥ ở Chi tiết qua `useWishlist()`.
- **C2:** Lọc khoảng giá `inRange` + `PriceFilter` 3 nút (bấm lần nữa để bỏ
  chọn), dùng chung với danh mục và từ khóa.
- **Câu 5:** Sắp xếp "Giá tăng dần / giảm dần" làm thật trong Home (state `sort`
  + sắp xếp bản sao trong `useMemo` của `visibleBooks`), xem chi tiết trong
  `TraLoi.md`.

## Cách kiểm tra từng bài

- **Lỗi mạng:** tắt json-server (Ctrl+C ở terminal API) rồi mở lại app: phải
  thấy câu báo lỗi tiếng Việt và nút "Thử lại". Bật server lại, bấm "Thử lại"
  thì dữ liệu hiện ra.
- **Tìm kiếm không dấu:** gõ `nha gia` phải ra "Nhà Giả Kim"; gõ `DAC NHAN`
  (không dấu, viết hoa) phải ra "Đắc Nhân Tâm". Gõ nhanh nhiều ký tự thì danh
  sách chỉ lọc một lần sau khi ngừng gõ 400ms.
- **Lọc danh mục:** ở tab Danh mục, bấm "Lập trình" thì về Home, chip "Lập
  trình" sáng lên; gõ thêm `react` thì chỉ còn "React Native in Action".
- **Giỏ hàng:** thêm "Clean Code" 2 lần (stock 5) và một sách 389.000đ, kiểm tra
  tổng tiền bằng phép tính tay; thêm quá stock thì số lượng dừng ở stock.
- **Tài khoản:** bấm "Đăng nhập thử" thì hiện tên và email, bấm "Đăng xuất"
  thì quay lại màn khóa.
