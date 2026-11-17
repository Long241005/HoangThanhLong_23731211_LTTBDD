# BookStore — Buổi 9: Thanh toán, Đơn hàng & Thông báo

Sinh viên: Hoàng Thanh Long — MSSV: 23731211

> **Lưu ý về nguồn gốc:** project này được **dựng lại từ code buổi 7 (thư mục `Tuan07`) + đề bài buổi 9**, vì thầy/cậu **không gửi file starter gốc `BookStore_Buoi9_Starter.zip`**. Toàn bộ màn hình, service và component của buổi 9 dưới đây được viết mới theo đúng mô tả và đáp án trong file đề `BaiThucHanh_Buoi9_BookStore_ThanhToan_DonHang_ThongBao.docx`, khớp với code buổi 7 đã có (cùng `api` client, Redux store, navigation, `BookGrid`, `EmptyState`…). Đây không phải starter gốc của thầy.

## Tài khoản demo

- Email: `demo@bookstore.vn`
- Mật khẩu: `123456`
- Tài khoản này đã có sẵn 3 đơn mẫu (Chờ xác nhận / Đang giao / Hoàn tất), 4 thông báo mẫu và số điện thoại `0900000000`.

## Cách chạy

Cần Node.js 20+.

```bash
npm install
```

**Terminal 1 — API (json-server ở http://localhost:3000):**

```bash
npm run api
```

**Terminal 2 — App:**

```bash
npx expo start        # quét QR bằng Expo Go, hoặc nhấn w để mở bản web
```

**Kiểm tra kiểu dữ liệu trước khi nộp:**

```bash
npm run typecheck     # tsc --noEmit
```

Điện thoại thật: máy tính và điện thoại dùng chung Wi-Fi. Nếu app không gọi được API thì chạy:

```bash
EXPO_PUBLIC_API_URL=http://<IP-máy-tính>:3000 npx expo start -c
```

Lưu ý: json-server ghi thẳng vào `db.json`. Đặt thử vài đơn xong muốn trả dữ liệu về ban đầu thì giải nén lại file zip này.

## Đã làm gì theo từng bài

| Bài | Nội dung | File chính |
| --- | --- | --- |
| 9.1 | Form thanh toán + validate: `errors`/`valid` tính mỗi lần render, 3 ô `FormField` (họ tên, SĐT, địa chỉ), 2 `PaymentOption` COD/Chuyển khoản, nút mờ khi form chưa hợp lệ, lỗi chỉ hiện sau khi bấm gửi (`touched`) | `src/screens/CheckoutScreen.tsx`, `src/components/FormField.tsx`, `src/components/PaymentOption.tsx`, `src/utils/validators.ts` |
| 9.2 | Gửi đơn `POST /orders`: thành công thì báo thành công, xoá giỏ (store + AsyncStorage) rồi về Home; lỗi thì giữ nguyên giỏ, hiện lỗi đỏ phía trên nút | `src/services/orderService.ts`, `src/screens/CheckoutScreen.tsx` |
| 9.3 | Đơn hàng của tôi: `GET /orders?userId&_sort=createdAt&_order=desc` + sắp xếp lại ở client, thẻ mở rộng chi tiết ngay trong thẻ, `StatusBadge`, trạng thái rỗng; menu "Đơn hàng của tôi" ở tab Tài khoản | `src/screens/OrdersScreen.tsx`, `src/components/StatusBadge.tsx` |
| 9.4 | Xem và sửa hồ sơ: `PATCH /users/:id` chỉ gửi `{ name, phone }`, bỏ `password` khỏi dữ liệu trả về, `patchUser(updated)` cập nhật store để Tài khoản hiện tên mới ngay; tab Tài khoản hiện SĐT + nút "✎ Chỉnh sửa" | `src/services/userService.ts`, `src/screens/EditProfileScreen.tsx`, `src/screens/AccountScreen.tsx` |
| 9.5 | Thông báo: `GET /notifications` + `PATCH /notifications/:id` (`read: true`), cập nhật lạc quan (đổi giao diện ngay, lỗi thì hoàn lại `read: false`), bấm vào thì chuyển màn theo `target` (Đơn hàng / Chi tiết sách); menu "Thông báo" ở tab Tài khoản | `src/services/notificationService.ts`, `src/screens/NotificationsScreen.tsx`, `src/components/NotificationItem.tsx` |
| 9.6 | Kéo-để-làm-mới ở Home: state `refreshing` + `onRefresh` (gọi lại `getBooks`/`getCategories`, không dùng `setLoading`), truyền vào `BookGrid` (`RefreshControl`) | `src/screens/HomeScreen.tsx`, `src/components/BookGrid.tsx` |
| 9.7 | Tên, icon, splash: `app.json` khai báo `icon`, `splash` (nền navy `#0B1F5C`), `android.adaptiveIcon`; file ảnh trong `assets/` | `app.json`, `assets/icon.png`, `assets/splash.png`, `assets/adaptive-icon.png`, `assets/favicon.png` |
| 9.8 | Rà soát và demo: checklist trong đề; `npm run typecheck` không lỗi; không còn dòng `TODO BT9` hay khung cam nào | — |
| C1 (thử thách) | Nút "Mua lại" ở đơn đã hoàn tất: lấy giá/tồn kho mới nhất bằng `getBooks()`, thêm lại toàn bộ sản phẩm vào giỏ (cộng số lượng, không vượt tồn kho nhờ `setQty`), rồi sang tab Giỏ | `src/screens/OrdersScreen.tsx` |

## Thêm ngoài đề (để luồng 9.8 chạy được thật)

Buổi 7 chưa có các phần này nhưng đề buổi 9 mặc định là "đã có sẵn", nên đã bổ sung:

- `src/utils/dialog.ts` (`showMessage`: web dùng `window.alert`, điện thoại dùng `Alert.alert`).
- `src/utils/storage.ts` + `src/hooks/useAutoPersist.ts` (ghi giỏ vào AsyncStorage) và `PersistGate` trong `App.tsx`: tắt app mở lại thì vẫn đăng nhập, giỏ và yêu thích còn nguyên.
- `src/services/userService.ts` — hàm `login`: đăng nhập giả lập, tìm user theo email rồi so sánh mật khẩu ngay trên app; mật khẩu không lưu vào Redux store. Tab Tài khoản giờ có form đăng nhập thật (đã điền sẵn tài khoản demo) thay cho nút bấm một chạm của buổi 7.
- `src/components/PrimaryButton.tsx` (nút chính, có bản `outline` cho nút "Mua lại").
- `db.json`: thêm `password` cho user demo, 3 đơn mẫu, 4 thông báo mẫu, `reviews: []`.
- `package.json`: thêm `@react-native-async-storage/async-storage`; giữ nguyên các sửa lỗi buổi 7 (`web.output: "single"`, `babel-preset-expo`, `react-dom`, `react-native-web`, `@types/node`).

## Câu hỏi bổ sung

Trả lời đủ 5 câu trong file `TraLoi.md` (cùng thư mục project).

## Ảnh chụp màn hình (cần chụp trên máy chạy app)

Chưa có ảnh thật trong file zip này — cần chụp trên máy của cậu khi chạy app: Checkout, Đơn hàng, Hồ sơ, Thông báo (xem checklist nộp bài trong đề, mục 5). Không dùng ảnh mẫu.
