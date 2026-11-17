# Trả lời câu hỏi bổ sung — Buổi 9 BookStore (Thanh toán, Đơn hàng & Thông báo)

Sinh viên: Hoàng Thanh Long — MSSV: 23731211

## 1. Giá trị dẫn xuất

Ở Checkout, `errors` và `valid` được tính trực tiếp mỗi lần render mà không dùng `useState` riêng, vì chúng chỉ là kết quả suy ra từ `name`, `phone`, `address` và `items` — mỗi lần người dùng gõ một ký tự thì render lại, giá trị dẫn xuất tự khớp với dữ liệu mới nhất. Nếu lưu bằng `useState` thì phải nhớ cập nhật ở mọi chỗ `setName`, `setPhone`, `setAddress` và cả khi giỏ đổi; quên một chỗ là lỗi hiện sai (ví dụ đã sửa đúng số điện thoại mà lỗi vẫn còn) hoặc nút mở sai lúc. Tính trực tiếp thì không có trạng thái nào để lệch nhau.

## 2. Thứ tự gọi

Trong `submit`, nếu để `clear()` chạy trước `await createOrder(…)` thì khi mất mạng giỏ đã trống mà đơn chưa được tạo: người dùng mất toàn bộ hàng đã chọn và phải thêm lại từ đầu, dù họ không làm gì sai. Đặt `clear()` ngay sau `createOrder` là đúng vì chỉ khi server đã nhận đơn (trả về thành công) mới được xoá giỏ; còn khi `createOrder` ném lỗi thì `catch` giữ nguyên giỏ và hiện lỗi đỏ để người dùng bấm thử lại.

## 3. PUT hay PATCH

Nếu dùng `PUT /users/1` với `{ name, phone }` thì json-server sẽ thay cả object của user đó bằng đúng dữ liệu được gửi, nên user chỉ còn lại `{ id, name, phone }` và mất `email` cùng `password` — tài khoản đó coi như hỏng, không đăng nhập lại được. Bài này chọn `PATCH` vì PATCH chỉ đổi các trường được gửi (`name`, `phone`) và giữ nguyên mọi trường còn lại, đúng với form chỉ sửa một phần hồ sơ.

## 4. Cập nhật lạc quan

Ở màn Thông báo, nếu bỏ đoạn hoàn lại `read: false` trong `catch` thì khi mất mạng giao diện vẫn báo đã đọc trong khi server vẫn lưu là chưa đọc; mở lại màn (hoặc mở trên máy khác) thì thông báo quay về chưa đọc, người dùng thấy trạng thái nhảy lung tung và không tin vào giao diện nữa. Một chức năng khác nên dùng cách này là thả tim / lưu yêu thích, vì thao tác nhẹ, sai thì hoàn lại cũng không gây hậu quả. Thanh toán thì không nên dùng, vì phải chắc server đã nhận đơn mới được báo thành công — báo thành công trước rồi mới biết là lỗi sẽ khiến người dùng tưởng đã đặt hàng trong khi đơn chưa hề được tạo.

## 5. Code bổ sung — Bộ lọc trạng thái ở màn Đơn hàng (đã làm thật trong OrdersScreen)

Bộ lọc đã được làm thật, không chỉ viết trên giấy: `OrdersScreen` có thêm state `status` (`"all" | OrderStatus`, mặc định `"all"`) và một hàng chip chọn trạng thái (Tất cả / Chờ xác nhận / Đang giao / Hoàn tất / Đã huỷ). Chỗ sửa duy nhất trong dữ liệu truyền cho `FlatList` là `data` không còn là `orders` mà là danh sách đã lọc: `orders.filter(o => status === "all" || o.status === status)`. Cách kiểm tra: đăng nhập tài khoản demo (có 3 đơn mẫu ở 3 trạng thái khác nhau), bấm chip "Chờ xác nhận" thì chỉ còn đơn #3, bấm "Hoàn tất" thì chỉ còn đơn #1 và hiện nút "Mua lại", bấm "Tất cả" thì về đủ 3 đơn, đơn mới nhất vẫn ở trên cùng.

```tsx
type StatusFilter = "all" | OrderStatus;
const [status, setStatus] = useState<StatusFilter>("all");

// Một chỗ sửa trong dữ liệu truyền cho FlatList:
const visibleOrders = useMemo(
  () => (status === "all" ? orders : orders.filter((o) => o.status === status)),
  [orders, status],
);

<FlatList data={visibleOrders} /* ... */ />
```

## Ghi chú thêm — Thử thách BT9.C1 (đã làm)

Nút "Mua lại" đã làm thật ở đơn có trạng thái "Hoàn tất" trong `OrdersScreen`: bấm nút thì gọi `getBooks()` để lấy giá và tồn kho mới nhất (vì giá trong đơn cũ có thể đã khác), thêm lại toàn bộ sản phẩm của đơn vào giỏ hiện tại (cùng sách thì cộng số lượng, `setQty` tự chặn ở tồn kho nên không vượt quá số lượng còn lại), rồi chuyển sang tab Giỏ.
