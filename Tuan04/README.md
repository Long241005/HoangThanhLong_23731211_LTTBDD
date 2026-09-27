# Tuần 4 – Layout với Flexbox – BookStore Online

## 1. Cài đặt (làm 1 lần)

1. Kiểm tra máy đã có Node.js chưa (mở PowerShell, gõ):
   ```
   node -v
   npm -v
   ```
   Nếu báo lỗi "not recognized" thì máy trường chưa có Node — báo kỹ thuật/giảng viên cài Node.js LTS (không cần quyền admin nếu dùng bản portable/nvm).

2. Trong VS Code, mở Terminal, `cd` vào đúng thư mục `Tuan04` (đang trống):
   ```
   cd Tuan04
   ```

3. Khởi tạo dự án Expo **ngay trong thư mục này** (dấu `.` ở cuối là bắt buộc):
   ```
   npx create-expo-app@latest .
   ```
   Lệnh này tự tải các gói cần thiết, không cần cài Android Studio/Xcode.

4. Chép các file trong thư mục `src/` (đính kèm) và file `App.js` (đính kèm) vào đè lên các file mặc định mà lệnh trên vừa tạo trong `Tuan04`.

## 2. Chạy thử

```
npx expo start
```

- Nhấn `w` để mở trên trình duyệt (nhanh nhất, phù hợp máy trường không cài được app điện thoại).
- Hoặc quét mã QR bằng app **Expo Go** trên điện thoại (điện thoại và máy tính phải cùng mạng Wi-Fi). Nếu mạng trường chặn, dùng chế độ tunnel:
  ```
  npx expo start --tunnel
  ```

## 3. Cấu trúc bài làm (map với file trong đề bài)

| Yêu cầu trong đề | File tương ứng |
|---|---|
| Buổi 1 – Bài tập 1: Trang chủ (Header + Chips + Grid + Floating Cart) | `src/screens/HomeScreen.js` |
| Buổi 1 – Bài tập 2: Chi tiết sách | `src/screens/BookDetailScreen.js` |
| Buổi 2 – Bài tập 1: Tab Bar dưới cùng (tĩnh) | `src/components/TabBar.js` |
| Buổi 2 – Bài tập 2: Giỏ hàng | `src/screens/CartScreen.js` |
| Ghép toàn app | `App.js` (chuyển màn hình bằng `useState`, không dùng thư viện navigation thật) |

Mỗi file đều có comment giải thích rõ **vì sao** đặt cấu trúc View/ScrollView như vậy (đúng các "Yêu cầu kỹ thuật" trong đề), đặc biệt:
- `FloatingCartButton.js`: giải thích vì sao phải nằm ngoài ScrollView.
- `TabBar.js`: so sánh 2 cách cố định Tab Bar (absolute vs. sibling ngoài ScrollView) và khi nào nên dùng cách nào — đây là phần "so sánh 2 cách và nêu khi nào dùng" mà đề bài yêu cầu.
- `CartScreen.js`: giải thích cách chia 3 vùng (cuộn / tổng tiền cố định / tab bar) không chồng lấp nhau.

## 4. Gợi ý khi báo cáo / nộp bài

Có thể chụp màn hình 4 trạng thái: Trang chủ (cuộn danh sách), Chi tiết sách, Tab Bar chuyển giữa các mục, Giỏ hàng — để minh họa các yêu cầu kỹ thuật đã đạt.
