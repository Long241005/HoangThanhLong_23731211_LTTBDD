# Trả lời câu hỏi bổ sung — Buổi 10

## Câu 1. Vì sao khi đổi numColumns của FlatList phải đổi cả key? Bỏ key thì chuyện gì xảy ra?

FlatList dựng cách xếp hàng theo số cột ngay từ lúc tạo nên không cho đổi
numColumns khi đang chạy. Đổi key làm React hủy FlatList cũ và dựng một cái
mới với numColumns mới. Bỏ key thì khi bật Switch sẽ báo lỗi "Changing
numColumns on the fly is not supported" và bố cục không đổi.

## Câu 2. Dữ liệu nào nên để trong useState của màn hình, dữ liệu nào nên đưa vào Redux? Lấy ví dụ từ BookStore.

Dữ liệu chỉ một màn hình dùng và mất đi khi rời màn thì để trong useState:
từ khóa tìm kiếm, thể loại đang chọn, chế độ lưới (keyword, category, isTile).
Dữ liệu nhiều màn hình cùng đọc và ghi thì đưa vào Redux: giỏ hàng (Chi tiết
thêm, Giỏ hàng hiển thị, tab badge đếm) và danh sách yêu thích (Chi tiết đổi,
tab Yêu thích hiển thị).

## Câu 3. Trong createSlice được viết state.items.push(…) và found.quantity += 1. Vì sao viết như vậy được, trong khi ở component bình thường không được sửa trực tiếp state?

Redux Toolkit dùng Immer. Immer đưa vào reducer một bản nháp của state, các
thao tác sửa trên bản nháp được ghi lại rồi tạo ra state mới, state cũ không
bị đổi. Ở component bình thường không có Immer, sửa trực tiếp state làm React
không nhận ra thay đổi nên giao diện không cập nhật.

## Câu 4. selectIsFavorite(id) trả về một hàm. Vì sao viết như vậy? Danh sách yêu thích chỉ lưu id mà không lưu cả đối tượng sách thì có lợi gì?

selectIsFavorite(id) nhận id rồi trả về hàm đọc state, vừa khớp kiểu mà
useSelector yêu cầu, vừa giữ được tham số id. Chỉ lưu id thì không bị lệch
dữ liệu: tên, giá, rating luôn lấy từ một nguồn là mảng sách, nên khi sách
đổi thì danh sách yêu thích tự đúng theo, và state cũng gọn nhẹ hơn.

## Câu 5. BookCard dùng React.memo, còn onSelect ở Home được bọc bằng useCallback. Nếu bỏ useCallback thì React.memo còn tác dụng không? Giải thích.

Không còn tác dụng. Không bọc useCallback thì mỗi lần Home render, onSelect
là một hàm mới, props của BookCard đổi nên React.memo coi như props khác và
vẽ lại tất cả thẻ. React.memo chỉ giúp khi props giữ nguyên tham chiếu giữa
các lần render.

## Câu 6 (Bonus). Một createAsyncThunk có ba hành động pending, fulfilled, rejected. Mỗi hành động làm thay đổi những trường nào của state trong booksSlice?

pending: status thành "loading", error thành null. fulfilled: status thành
"succeeded", items thành dữ liệu nhận được. rejected: status thành "failed",
error thành thông báo từ rejectWithValue, hoặc thông báo mặc định nếu không có.
