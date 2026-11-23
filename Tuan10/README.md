# Buổi 10 — BookStore với React Navigation và Redux Toolkit

> Bản dựng lại từ đề buổi 10 (`BaiThucHanh_Buoi10_BookStore_ReduxToolkit_Snack.docx`)
> và đáp án trong phụ lục đề. Không có file starter gốc nào được gửi kèm,
> nên đây là bản dựng lại hoàn chỉnh, không phải starter gốc.
> 9 tựa sách lấy từ danh sách buổi 9 (Tuan09); "Atomic Habits" là tựa bắt
> buộc theo đề buổi 10 nên được thêm vào thay cho một tựa khác.
> Dữ liệu mặc định đọc từ mảng trong `data/books.ts` (`USE_API = false`).

## Nội dung đã làm

| Bài | Nội dung | File chính |
| --- | --- | --- |
| 10.1 | Khung ứng dụng, tiêu đề | `App.tsx`, `screens/HomeScreen.tsx` |
| 10.2 | Danh sách sách từ mảng, ActivityIndicator | `screens/HomeScreen.tsx` |
| 10.3 | Component BookCard, React.memo | `components/BookCard.tsx` |
| 10.4 | Hai kiểu row và tile trong cùng một component | `components/BookCard.tsx` |
| 10.5 | Dạng lưới (Switch, numColumns, key) và kéo-để-làm-mới | `screens/HomeScreen.tsx` |
| 10.6 | Tìm kiếm không dấu và lọc theo thể loại (useMemo) | `screens/HomeScreen.tsx` |
| 10.7 | React Navigation: Stack + Bottom Tabs, Detail theo id | `navigation.tsx` |
| 10.8 | Redux Toolkit: store, cartSlice, Provider | `store/`, `App.tsx` |
| 10.9 | Thêm vào giỏ, tăng/giảm, badge trên tab | `screens/DetailScreen.tsx`, `screens/CartScreen.tsx` |
| 10.10 | Yêu thích (chỉ lưu id) | `store/favoritesSlice.ts`, `screens/FavoritesScreen.tsx` |
| 10.11 | Bonus: fetch API bằng createAsyncThunk | `store/booksSlice.ts`, `config.ts` |
| T1 | Thử thách: Switch "Chỉ còn hàng" (kết hợp với tìm kiếm + thể loại) | `screens/HomeScreen.tsx` |
| T2 | Thử thách: chip "Giá tăng dần" (sắp xếp bản sao, không sửa state) | `screens/HomeScreen.tsx` |

## Cách dùng trên Snack (snack.expo.dev)

1. Mở https://snack.expo.dev. Snack tạo sẵn `App.js` — tạo file `App.tsx` bằng
   nút `+` ở khung Files, dán nội dung vào, rồi xóa `App.js` để tránh hai file
   App trùng nhau. Các file còn lại dùng đuôi `.ts` hoặc `.tsx`.
2. Tạo file theo đường dẫn: nhấn `+`, gõ đường dẫn đầy đủ, ví dụ
   `screens/HomeScreen.tsx`. Thư mục được tạo theo đường dẫn đó.
3. Mở `ALL_IN_ONE.md`, chép từng mục vào đúng file.
4. Thêm thư viện ở mục Dependencies (7 gói, xem dưới). Dán code có dòng import
   thì Snack cũng hiện hộp thoại đề nghị thêm gói, chọn Add dependency.
5. Chọn tab Web hoặc Preview ở khung bên phải để xem kết quả. Màn hình trắng
   thì nhấn Reload hoặc tải lại trang.

### Thư viện cần thêm trên Snack (7 gói)

`react-native-safe-area-context`, `react-native-screens`,
`@react-navigation/native`, `@react-navigation/native-stack`,
`@react-navigation/bottom-tabs`, `@reduxjs/toolkit`, `react-redux`

Expo SDK đã có sẵn `react-native` và `expo`, không cần thêm.

## Cách chạy trên máy (bản local, để kiểm chứng)

```bash
npm install
npm run typecheck   # tsc --noEmit, chạy trước khi nộp
npx expo start      # quét QR bằng Expo Go, hoặc nhấn w để mở bản web
```

Chỉ dùng json-server khi làm bài 10.11: mở một terminal khác và chạy
`npm run api`, rồi đổi `USE_API` trong `config.ts` thành `true`.
**Trước khi nộp phải trả `USE_API` về `false`** để bài chạy được mà không
cần json-server. Điện thoại hoặc Expo Go thì thay `localhost` trong `API_URL`
bằng IP LAN của máy chạy json-server, ví dụ `http://192.168.1.10:3000`.

## Luồng demo

Home (tìm kiếm, lọc, đổi dạng lưới) → bấm một thẻ sách → Chi tiết (thêm vào
giỏ, yêu thích) → tab Giỏ hàng (tăng/giảm, tổng tiền, badge) → tab Yêu thích.

## Chụp ảnh minh chứng

Chụp toàn màn hình, thấy cả khung code lẫn khung Web preview của Snack và
đồng hồ hệ thống, ngay sau khi làm xong từng bài, không chụp gộp ở cuối.
Đặt tên theo bài: `10.1.png`, `10.2.png`, … `10.10.png`; bài 10.11 (nếu làm)
nộp hai ảnh `10.11a.png` và `10.11b.png`.

## Lưu ý

- Kéo-để-làm-mới (RefreshControl) chỉ kiểm tra được trên điện thoại/giả lập
  hoặc Preview của Snack; bản web không có cử chỉ kéo.
- Ảnh bìa lấy từ picsum.photos qua mạng; mạng chậm thì ảnh hiện muộn nhưng
  không ảnh hưởng chức năng.
- `db.json` chỉ dùng cho bài 10.11, không dán vào Snack.
- `ALL_IN_ONE.md` là toàn bộ mã nguồn gộp trong một tài liệu, để chép từng
  mục vào Snack cho nhanh.
