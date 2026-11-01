# Trả lời câu hỏi bổ sung — Buổi 7 BookStore

Sinh viên: Hoàng Thanh Long — MSSV: 23731211

## 1. Cấu trúc điều hướng

BookDetail được đăng ký ở Stack vì nó là màn chi tiết tạm thời, phủ lên toàn bộ Tab Bar và tự có nút quay lại để trở về đúng màn trước đó. Nếu đặt BookDetail vào Tab thì nó sẽ trở thành một mục tab cố định, Tab Bar vẫn hiện ở dưới màn chi tiết, người dùng không có nút quay lại rõ ràng và việc mở sách nào cũng phải đi qua một tab chung chung thay vì chồng lên trên Home.

## 2. Redux

Trong reducer viết `state.items.push(...)` mà state gốc không bị sửa trực tiếp vì Redux Toolkit dùng Immer: code của mình sửa trên một bản nháp (draft), Immer sẽ tự tạo ra state mới bất biến từ bản nháp đó. Nếu bỏ `useMemo` trong `useCart`, kết quả hiển thị vẫn đúng, chỉ là tổng tiền và tổng số lượng sẽ bị tính lại ở mỗi lần render thay vì chỉ tính lại khi `items` đổi, nên với giỏ hàng lớn hoặc render nhiều lần thì app sẽ tốn công tính toán hơn, chứ không sai kết quả.

## 3. Promise.all

Nếu `getCategories()` lỗi còn `getBooks()` thành công thì với `Promise.all` như trong bài, Home sẽ hiện màn lỗi chung và không hiện được danh sách sách, vì `Promise.all` coi cả nhóm là lỗi khi chỉ một request lỗi. Cách giữ lại được danh sách sách là dùng `Promise.allSettled`, rồi lấy kết quả thành công của từng phần riêng và chỉ báo lỗi cho phần thất bại, ví dụ vẫn hiện sách nhưng chip danh mục trống hoặc hiện thông báo riêng. Cách này phải đánh đổi ở chỗ code dài hơn, phải tự kiểm tra `status` của từng kết quả và tự quyết định khi nào thì hiện lỗi, khi nào thì hiện dữ liệu một phần, thay vì một lỗi chung đơn giản.

## 4. Debounce

Không đặt `setTimeout` thẳng trong `onChangeText` vì mỗi lần gõ sẽ tạo một timer mới mà timer cũ không bị hủy, nên cuối cùng mỗi phím vẫn gây ra một lần lọc, chỉ chậm đi chứ không gộp lại thành một lần lọc sau khi ngừng gõ. Hàm dọn dẹp `return () => clearTimeout(t)` hủy timer cũ mỗi khi giá trị đổi, nhờ đó chỉ lần gõ cuối cùng được áp dụng, đồng thời tránh cập nhật state sau khi component đã bị gỡ khỏi màn hình (unmount).

## 5. Code bổ sung — Sắp xếp "Giá tăng dần / giảm dần" (đã làm thật trong Home)

Trong project này, sắp xếp đã được làm thật, không chỉ viết trên giấy: `HomeScreen` có thêm state `sort` và trong `useMemo` của `visibleBooks`, sau khi lọc xong thì sắp xếp trên bản sao của mảng đã lọc, rồi mới trả về cho `BookGrid`. Bấm nút "Giá tăng dần ↑" một lần để bật, bấm lại để tắt; tương tự với "Giá giảm dần ↓". Sắp xếp dùng chung được với từ khóa, danh mục và khoảng giá vì nó chạy sau bước lọc.

```tsx
type SortOrder = "asc" | "desc" | null;
const [sort, setSort] = useState<SortOrder>(null);

const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, {
    keyword: debouncedKeyword,
    categoryId,
    priceRange,
  });
  if (sort === "asc") return [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "desc") return [...filtered].sort((a, b) => b.price - a.price);
  return filtered;
}, [books, debouncedKeyword, categoryId, priceRange, sort]);
```

Ghi chú: vì chưa chụp màn hình trên máy trường trong lúc dựng bản này, khi chạy app trên máy trường, hãy chụp màn hình Home sau khi bấm "Giá tăng dần" và đính kèm theo bài nộp nếu thầy yêu cầu ảnh minh họa cho câu 5.
