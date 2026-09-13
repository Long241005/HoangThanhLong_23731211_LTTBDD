# Hướng dẫn chi tiết — Layout Flexbox với BookStore Online (Week 3)

Tài liệu này dựng lại toàn bộ 6 bài tập + 1 bài tổng hợp trong đề, kèm **cây thư mục** và **code TypeScript đầy đủ** cho từng bài. Bạn có thể copy nguyên `components/` vào project Expo của mình, hoặc mở thẳng từng thư mục `gioX-...` như 1 project riêng.

## 0. Chuẩn bị môi trường (làm 1 lần)

```bash
npx create-expo-app bookstore-app -t expo-template-blank-typescript
cd bookstore-app
npx expo install @expo/vector-icons
```

Sau đó copy `data.ts` + thư mục `components/` + `App.tsx` của từng bài vào project này (ghi đè `App.tsx` gốc), rồi chạy:

```bash
npx expo start
```

> Các icon (search, cart) dùng `@expo/vector-icons` (đã có sẵn khi tạo project bằng Expo, chỉ cần cài để chắc chắn resolve đúng bản).

## 1. Cây thư mục tổng thể của gói bài tập này

```
bookstore-project/
├── README.md                          ← file bạn đang đọc
├── gio1-header-bookcard/              ← Giờ 1: Header + BookCard
│   ├── App.tsx
│   ├── data.ts
│   └── components/
│       ├── Header.tsx
│       └── BookCard.tsx
├── gio2-chips-grid/                   ← Giờ 2: CategoryChips + BookGrid
│   ├── App.tsx
│   ├── data.ts
│   └── components/
│       ├── CategoryChips.tsx
│       └── BookGrid.tsx
├── gio3-badge-floatingcart/           ← Giờ 3: DiscountBadge + FloatingCartButton
│   ├── App.tsx
│   ├── data.ts
│   └── components/
│       ├── DiscountBadge.tsx
│       └── FloatingCartButton.tsx
└── final-trangchu/                    ← Bài tổng hợp: ghép cả 3 giờ
    ├── App.tsx
    ├── data.ts
    └── components/
        ├── Header.tsx                 (copy nguyên từ gio1, không sửa)
        ├── CategoryChips.tsx          (copy nguyên từ gio2, không sửa)
        ├── BookGrid.tsx               (từ gio2, có chỉnh để gắn Badge)
        ├── DiscountBadge.tsx          (copy nguyên từ gio3, không sửa)
        └── FloatingCartButton.tsx     (copy nguyên từ gio3, không sửa)
```

Đây đúng cấu trúc mà đề bài mô tả ở phần "Việc cần làm" của bài tổng hợp: mỗi `gioX` là 1 project độc lập, cùng dùng chung 1 `data.ts`, và bài cuối chỉ **lắp ráp lại** các component đã có sẵn.

---

## GIỜ 1 — Nền tảng Flexbox & Layout đơn giản

### Bài tập 1: Header ứng dụng BookStore

**Mục tiêu:** logo bên trái, 2 icon (tìm kiếm, giỏ hàng) bên phải, tất cả căn giữa theo chiều dọc.

**Cây thư mục liên quan:**
```
gio1-header-bookcard/
├── App.tsx
└── components/Header.tsx
```

**Ý tưởng flexbox:**
- Container ngoài: `flexDirection: 'row'` (mặc định RN là `column`, phải set lại thành `row` để logo và icon nằm ngang hàng).
- `justifyContent: 'space-between'` đẩy logo về trái, cụm icon về phải.
- `alignItems: 'center'` canh giữa theo trục dọc (trục chéo khi flexDirection là row).
- 2 icon bên phải nằm trong 1 `View` con **riêng**, cũng `flexDirection: 'row'`, dùng `gap: 16` để tạo khoảng cách (nếu bản React Native cũ chưa hỗ trợ `gap`, thay bằng `marginLeft` cho icon thứ 2 — code đã để sẵn comment fallback).

**Lỗi hay gặp:** quên set `height: 56` cố định → header co giãn theo nội dung, không đúng "thanh cố định".

Xem code đầy đủ tại `gio1-header-bookcard/components/Header.tsx`.

### Bài tập 2: Thẻ sách (Book Card) đơn

**Mục tiêu:** ảnh bìa trái (cố định), thông tin phải (tên/tác giả/giá xếp cột), giá luôn nằm sát đáy.

**Ý tưởng flexbox:**
- Card ngoài: `flexDirection: 'row'`. So sánh `alignItems: 'flex-start'` (đỉnh ảnh và đỉnh chữ bằng nhau) với `alignItems: 'center'` (cột thông tin canh giữa theo chiều cao ảnh) — component `BookCard` nhận prop `align` để bạn tự bật/tắt so sánh, `App.tsx` của Giờ 1 render cả 2 kiểu cạnh nhau.
- Ảnh bìa: `width: 80, height: 110` — **cố định**, không dùng `flex`, vì ảnh không nên co giãn.
- Cột thông tin: `flex: 1` để "ăn" hết phần không gian còn lại sau ảnh, `flexDirection: 'column'`.
- Giá luôn ở đáy: cột thông tin đặt `height` bằng chiều cao ảnh (110) rồi dùng `justifyContent: 'space-between'` trên trục dọc — 3 dòng (tên, tác giả, giá) tự dãn cách đều, giá bị đẩy sát đáy.
- Tên sách dài: `numberOfLines={2}` trên `<Text>` — đây **không phải** thuộc tính flexbox nhưng bắt buộc phải có, nếu không tên sách 3-4 dòng sẽ đẩy card cao bất thường và làm lệch layout giữa các card.

Xem code đầy đủ tại `gio1-header-bookcard/components/BookCard.tsx`.

---

## GIỜ 2 — Kích thước, Wrap và Lưới sản phẩm (Grid)

### Bài tập 1: Category Chips

**Mục tiêu:** các "chip" danh mục tự xuống dòng khi tràn màn hình.

**Ý tưởng flexbox:**
- Container: `flexDirection: 'row'`, `flexWrap: 'wrap'` (bắt buộc — nếu không có, tất cả chip sẽ bị ép nằm 1 hàng và tràn màn hình), `gap: 8` tạo khoảng cách đều cả chiều ngang lẫn dọc.
- Mỗi chip: **không** set `width` cố định — để `width` tự = nội dung chữ bên trong (`auto` là hành vi mặc định khi không set). `borderRadius: 999` (lớn hơn hẳn nửa chiều cao) tạo dạng viên thuốc (pill). `borderWidth: 1, borderColor` indigo.
- `alignContent: 'flex-start'` trên container: chỉ có tác dụng khi có **từ 2 hàng trở lên** (do `flexWrap`) và container có chiều cao dư — nó quyết định các hàng dồn lên trên hay dàn đều. Thử comment dòng này lại và cho container 1 `height` cố định lớn để thấy rõ khác biệt.

Component có thêm state `selectedId` để demo hiệu ứng chọn chip (đổi màu nền) — phần này không bắt buộc theo đề nhưng giúp bạn thấy chip hoạt động thật.

Xem code đầy đủ tại `gio2-chips-grid/components/CategoryChips.tsx`.

### Bài tập 2: Book Grid 2 cột

**Mục tiêu:** lưới 2 cột thuần flexbox (chưa dùng FlatList/numColumns).

**Ý tưởng flexbox:**
- Container: `flexDirection: 'row'`, `flexWrap: 'wrap'`, `justifyContent: 'space-between'` — `space-between` là chìa khóa: nó tự tạo khoảng trống **giữa 2 item trên cùng 1 hàng** mà không cần set margin ngang thủ công.
- Mỗi item: `width: '48%'` — không phải 50% vì cần chừa ~4% làm khoảng trống ở giữa (2×48% + khoảng trống ≈ 100%). `marginBottom` tạo khoảng cách giữa các hàng.
- Ảnh trong item: `width: '100%'` (ăn theo item cha) kết hợp `aspectRatio: 3/4` thay vì `height` cố định — vì width của item giờ là % (phụ thuộc màn hình), nếu set height cố định thì tỉ lệ ảnh sẽ méo trên các kích thước màn hình khác nhau; `aspectRatio` giữ tỉ lệ luôn đúng dù width thay đổi.

Xem code đầy đủ tại `gio2-chips-grid/components/BookGrid.tsx`.

---

## GIỜ 3 — Position, AlignSelf và các lớp phủ (Overlay)

### Bài tập 1: Discount Badge

**Mục tiêu:** nhãn "-20%" hoặc "Mới" nổi ở góc trên-trái ảnh bìa, **chồng lên** ảnh chứ không đẩy layout khác.

**Ý tưởng position:**
- `View` bọc ảnh (`coverWrapper`) phải có `position: 'relative'` — đây là bước **dễ quên nhất**. Nếu thiếu dòng này, `position: 'absolute'` của badge sẽ định vị theo ancestor gần nhất có position khác `static` — có thể là tận màn hình gốc, khiến badge bay lạc ra ngoài card.
- Badge: `position: 'absolute', top: 6, left: 6` — thoát khỏi luồng layout bình thường nên không đẩy các phần tử khác, chỉ "dán" lên trên ảnh.
- Nền đỏ (`#DC2626`) cho giảm giá, cam (`#F97316`) cho nhãn Mới, `borderRadius` nhỏ + `padding` vừa đủ ôm chữ.

**Cách debug khi badge lệch vị trí:** kiểm tra ngược từ badge lên — cha trực tiếp của nó có `position: 'relative'` chưa? Nếu chưa, tiếp tục kiểm tra cha của cha, cho tới khi tìm thấy phần tử có `position` khác `static` — đó chính là nơi badge đang "bám" theo.

Xem code đầy đủ tại `gio3-badge-floatingcart/components/DiscountBadge.tsx`.

### Bài tập 2: Floating Cart Button

**Mục tiêu:** nút giỏ hàng tròn nổi góc dưới-phải, đè lên nội dung cuộn, có số lượng nhỏ ở góc.

**Ý tưởng position (containing block lồng nhau — trọng tâm của bài):**
- Nút tròn: `position: 'absolute', bottom: 24, right: 20` — định vị theo màn hình, vì `View` cha ngoài cùng của cả app (`screen`) có `flex: 1` và position mặc định (`relative`).
- Hình tròn hoàn hảo: `width === height` (56×56) và `borderRadius: width / 2`.
- Badge số lượng: cũng `position: 'absolute'`, nhưng đặt `top: -4, right: -4` — nó định vị theo **chính nút tròn** (vì nút tròn, dù bản thân đang `position: absolute`, vẫn tạo ra 1 containing block mới cho các con bên trong nó). Đây là ví dụ "containing block lồng nhau": badge số lượng bám theo nút tròn, nút tròn bám theo màn hình.

Xem code đầy đủ tại `gio3-badge-floatingcart/components/FloatingCartButton.tsx`.

---

## BÀI TỔNG HỢP — Trang chủ hoàn chỉnh

**Cây thư mục:**
```
final-trangchu/
├── App.tsx
├── data.ts
└── components/
    ├── Header.tsx
    ├── CategoryChips.tsx
    ├── BookGrid.tsx              ← có sửa: dùng DiscountBadgeCover thay Image thường
    ├── DiscountBadge.tsx
    └── FloatingCartButton.tsx
```

**Thứ tự lắp ráp trong `App.tsx`** (đúng khung đề bài cho sẵn):

```tsx
<View style={styles.screen}>
  {/* 1. Header cố định trên cùng, NGOÀI ScrollView */}
  <Header />

  {/* 2. ScrollView chứa Chips + Grid */}
  <ScrollView contentContainerStyle={styles.content}>
    <CategoryChips />
    <BookGrid books={BOOKS} />
  </ScrollView>

  {/* 3. Nút giỏ nổi, NGOÀI ScrollView */}
  <FloatingCartButton count={cartCount} onPress={...} />
</View>
```

**3 điểm mấu chốt để checklist ở cuối đề bài "pass":**

1. **Header đứng yên khi cuộn** → vì `Header` nằm ở cùng cấp với `ScrollView` (là anh em, không phải con của `ScrollView`), nên khi `ScrollView` cuộn, `Header` không bị ảnh hưởng.
2. **Nút giỏ luôn nổi, không trôi theo cuộn** → tương tự, `FloatingCartButton` cũng nằm ngoài `ScrollView`, và dùng `position: 'absolute'` định vị theo `screen` (container ngoài cùng có `flex: 1`).
3. **Badge dính đúng góc ảnh trong lưới** → file `BookGrid.tsx` ở bản tổng hợp đã được sửa để dùng lại `DiscountBadgeCover` (từ Giờ 3) làm ảnh bìa, thay vì `<Image>` trơn như bản Giờ 2 — nhờ vậy mỗi ô trong lưới vừa có layout 2 cột (Giờ 2) vừa có badge overlay (Giờ 3) cùng lúc.
4. `paddingBottom: 100` trong `content` của `ScrollView` đảm bảo cuốn xuống cuối vẫn thấy hết sách, không bị nút giỏ che mất item cuối.

Xem code đầy đủ tại `final-trangchu/App.tsx` và `final-trangchu/components/`.

---

## Checklist tự kiểm tra (theo đúng đề bài)

- [ ] Cuộn danh sách sách xuống, Header đứng yên, không cuộn theo.
- [ ] Nút giỏ hàng tròn luôn nổi ở góc, không bị cuộn trôi mất.
- [ ] Mỗi ô sách có đúng badge `-x%` hoặc `Mới` dính sát góc ảnh (không lệch).
- [ ] `npx tsc --noEmit` không báo lỗi nào (đảm bảo cài `typescript` và `@types/react` qua `npx expo install`).

## Ghi chú chung cho toàn bộ 3 buổi

- Ảnh bìa sách trong `data.ts` dùng URL tạm từ `picsum.photos` — khi triển khai thật, thay bằng ảnh thật của sách (local asset hoặc CDN).
- Toàn bộ bài tập **cố ý không** đụng tới `useState` cho dữ liệu sách, gọi API, hay `navigation` — đúng phạm vi "chỉ luyện layout tĩnh" mà đề bài yêu cầu. `useState` duy nhất xuất hiện là `cartCount` (đếm số lượng giỏ hàng) và `selectedId` (chip đang chọn) — chỉ để demo tương tác, không phải trọng tâm bài học.
- Toàn bộ màu sắc dùng chung 1 tông indigo/navy (`#312E81`, `#4F46E5`) đúng "bảng màu chung của khóa học" được nhắc ở Bài 1 - Giờ 1.
