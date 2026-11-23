# ALL_IN_ONE — Buổi 10 BookStore (toàn bộ mã nguồn trong một tài liệu)

Chép từng mục vào đúng file trên Snack theo đường dẫn ghi ở tiêu đề mỗi mục.
Snack tạo sẵn `App.js`: tạo `App.tsx`, dán nội dung vào, rồi xóa `App.js`.
Thư viện cần thêm trên Snack: `react-native-safe-area-context`, `react-native-screens`,
`@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`,
`@reduxjs/toolkit`, `react-redux`.

## App.tsx

```tsx
import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./store";
import { RootNavigator } from "./navigation";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
```

## config.ts

```ts
// Cấu hình cho Bài 10.11 (Bonus, không bắt buộc).
// USE_API = false: đọc dữ liệu từ mảng trong data/books.ts (mặc định của bài thực hành).
// USE_API = true : gọi json-server qua fetch.
export const USE_API = false;

// Trình duyệt chạy cùng máy với json-server: dùng localhost.
// Điện thoại hoặc Expo Go: thay localhost bằng IP LAN của máy chạy json-server, ví dụ "http://192.168.1.10:3000".
export const API_URL = "http://localhost:3000";
```

## types.ts

```ts
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number; // thang 0 đến 10
  category: string;
  inStock: boolean;
  description: string;
  cover: string; // URL ảnh bìa
}

export interface CartItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}
```

## theme.ts

```ts
export const colors = {
  navy: "#0B1F5C",
  indigo: "#3B3FD8",
  background: "#F4F6FB",
  line: "#E2E8F0",
  muted: "#64748B",
  text: "#0F172A",
};
```

## utils.ts

```ts
export const formatPrice = (n: number) =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " \u0111";

// Bo dau tieng Viet de "nha gia" tim ra "Nha Gia Kim"
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0111/g, "d")
    .replace(/\u0110/g, "D")
    .toLowerCase()
    .trim();
```

## data/books.ts

```ts
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
```

## components/BookCard.tsx

```tsx
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Book } from "../types";
import { formatPrice } from "../utils";
import { colors } from "../theme";

export interface BookCardProps {
  book: Book;
  layout?: "row" | "tile"; // 1 component, 2 kiểu bố cục
  onSelect: (id: string) => void;
}

function BookCard({ book, layout = "row", onSelect }: BookCardProps) {
  const isTile = layout === "tile";
  return (
    <TouchableOpacity
      testID={`book-${book.id}`}
      activeOpacity={0.8}
      onPress={() => onSelect(book.id)}
      style={[styles.card, isTile && styles.cardTile]} // ghép style theo điều kiện
    >
      <View style={[styles.coverBox, isTile && styles.coverBoxTile]}>
        <Image source={{ uri: book.cover }} style={styles.cover} resizeMode="cover" />
        {isTile && <Text style={styles.ratingBadge}>⭐ {book.rating.toFixed(1)}</Text>}
      </View>
      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={isTile ? 1 : 2}>
          {book.title}
        </Text>
        {!isTile && (
          <Text style={styles.sub}>
            {book.author} · {book.category}
          </Text>
        )}
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(book.price)}</Text>
          {!isTile && <Text style={styles.sub}>⭐ {book.rating.toFixed(1)}</Text>}
          <Text>{book.inStock ? "✅" : "❌"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// React.memo: chỉ render lại khi props thay đổi
export default React.memo(BookCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 12,
  },
  cardTile: { flexDirection: "column", width: "48%", gap: 8 },
  coverBox: {
    width: 70,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.indigo,
  },
  coverBoxTile: { width: "100%", height: "auto", aspectRatio: 2 / 3 }, // height "auto" để aspectRatio có hiệu lực
  cover: { width: "100%", height: "100%" },
  ratingBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.65)",
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: "hidden",
  },
  info: { flex: 1, gap: 4, justifyContent: "center" },
  infoTile: { flexGrow: 0, flexBasis: "auto" }, // không co về 0, để tên sách hiện đủ
  title: { fontSize: 15, fontWeight: "700", color: colors.text },
  sub: { fontSize: 13, color: colors.muted },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  price: { fontSize: 14, fontWeight: "700", color: colors.indigo },
});
```

## navigation.tsx

```tsx
import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAppSelector } from "./store/hooks";
import { selectCartCount } from "./store/cartSlice";
import { colors } from "./theme";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import CartScreen from "./screens/CartScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

export type RootStackParamList = {
  Tabs: undefined;
  Detail: { id: string };
};

export type TabParamList = { Home: undefined; Cart: undefined; Favorites: undefined };

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  const count = useAppSelector(selectCartCount); // badge đọc thẳng từ store
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.indigo }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Sách", tabBarIcon: () => <Text>📚</Text> }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Giỏ hàng",
          tabBarIcon: () => <Text>🛒</Text>,
          tabBarBadge: count > 0 ? count : undefined, // undefined thì ẩn badge
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Yêu thích", tabBarIcon: () => <Text>♥</Text> }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: colors.navy }, headerTintColor: "#fff" }}
    >
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Chi tiết sách" }} />
    </Stack.Navigator>
  );
}
```

## store/index.ts

```ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import booksReducer from "./booksSlice";

export const store = configureStore({
  reducer: { cart: cartReducer, favorites: favoritesReducer, books: booksReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## store/hooks.ts

```ts
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## store/cartSlice.ts

```ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, CartItem } from "../types";
import type { RootState } from "./index";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Pick<Book, "id" | "title" | "price">>) {
      const { id, title, price } = action.payload;
      const found = state.items.find((i) => i.bookId === id);
      if (found) found.quantity += 1; // Immer cho phép viết như sửa trực tiếp
      else state.items.push({ bookId: id, title, price, quantity: 1 });
    },
    decrease(state, action: PayloadAction<string>) {
      const found = state.items.find((i) => i.bookId === action.payload);
      if (!found) return;
      if (found.quantity > 1) found.quantity -= 1;
      else state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
  },
});

export const { addToCart, decrease } = cartSlice.actions;

export const selectCartItems = (s: RootState) => s.cart.items;
export const selectCartCount = (s: RootState) =>
  s.cart.items.reduce((n, i) => n + i.quantity, 0);
export const selectCartTotal = (s: RootState) =>
  s.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export default cartSlice.reducer;
```

## store/favoritesSlice.ts

```ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface FavoritesState {
  ids: string[];
}

const initialState: FavoritesState = { ids: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const index = state.ids.indexOf(action.payload);
      if (index >= 0) state.ids.splice(index, 1); // có rồi thì bỏ ra
      else state.ids.push(action.payload); // chưa có thì thêm vào
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectFavoriteIds = (s: RootState) => s.favorites.ids;
// Selector trả về selector: nhận id, trả về hàm đọc state
export const selectIsFavorite = (id: string) => (s: RootState) =>
  s.favorites.ids.includes(id);

export default favoritesSlice.reducer;
```

## store/booksSlice.ts

```ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Book } from "../types";
import { API_URL } from "../config";
import type { RootState } from "./index";

type Status = "idle" | "loading" | "succeeded" | "failed";

interface BooksState {
  items: Book[];
  status: Status;
  error: string | null;
}

const initialState: BooksState = {
  items: [] as Book[],
  status: "idle" as Status,
  error: null as string | null,
};

export const fetchBooks = createAsyncThunk<Book[], void, { rejectValue: string }>(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/books`);
      if (!res.ok) return rejectWithValue(`Máy chủ trả về lỗi ${res.status}`);
      return (await res.json()) as Book[];
    } catch {
      return rejectWithValue(`Không kết nối được tới ${API_URL}`);
    }
  },
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Không tải được dữ liệu";
      });
  },
});

export default booksSlice.reducer;

export const selectBooksState = (s: RootState) => s.books;
```

## screens/HomeScreen.tsx

```tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation";
import type { Book } from "../types";
import { loadBooks } from "../data/books";
import BookCard from "../components/BookCard";
import { colors } from "../theme";
import { normalize } from "../utils";
import { USE_API } from "../config";
import { fetchBooks, selectBooksState } from "../store/booksSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type HomeNav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNav>();
  const dispatch = useAppDispatch();
  const api = useAppSelector(selectBooksState); // Bài 10.11: dữ liệu từ API nằm trong store

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [isTile, setIsTile] = useState(false); // Switch "Dạng lưới"
  const [useArray, setUseArray] = useState(!USE_API); // true: đọc mảng; false: đọc từ store (API)
  const [onlyInStock, setOnlyInStock] = useState(false); // Thử thách T1: chỉ còn hàng
  const [sortAsc, setSortAsc] = useState(false); // Thử thách T2: giá tăng dần

  // Tải mảng (có độ trễ giả lập) rồi tắt ActivityIndicator
  const loadFromArray = useCallback(() => {
    setLoading(true);
    loadBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  // Lần đầu: USE_API bật thì gọi thunk, ngược lại đọc mảng
  useEffect(() => {
    if (USE_API) dispatch(fetchBooks());
    else loadFromArray();
  }, [dispatch, loadFromArray]);

  // Kéo để làm mới: tải lại từ nguồn đang dùng, giữ nguyên chế độ 1 hoặc 2 cột đang chọn
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (useArray) setBooks(await loadBooks());
    else await dispatch(fetchBooks());
    setRefreshing(false);
  }, [dispatch, useArray]);

  // Bonus: API lỗi thì cho phép quay về dữ liệu mảng
  const switchToArray = useCallback(() => {
    setUseArray(true);
    loadFromArray();
  }, [loadFromArray]);

  const sourceBooks = useArray ? books : api.items;
  const isLoading = useArray
    ? loading
    : api.status === "idle" || (api.status === "loading" && api.items.length === 0);
  const apiFailed = !useArray && api.status === "failed";

  const categories = useMemo(
    () => Array.from(new Set(sourceBooks.map((b) => b.category))),
    [sourceBooks],
  );

  // Lọc theo thể loại + từ khóa (không dấu), kết hợp T1 và sắp xếp T2
  const visible = useMemo(() => {
    const k = normalize(keyword);
    const filtered = sourceBooks.filter(
      (b) =>
        (category === null || b.category === category) &&
        (k === "" || normalize(b.title).includes(k) || normalize(b.author).includes(k)) &&
        (!onlyInStock || b.inStock),
    );
    // T2: sắp xếp một bản sao, không sắp xếp trực tiếp trên state
    return sortAsc ? [...filtered].sort((a, b) => a.price - b.price) : filtered;
  }, [sourceBooks, keyword, category, onlyInStock, sortAsc]);

  const numColumns = isTile ? 2 : 1; // Bài 10.5a
  const onSelect = useCallback(
    (id: string) => navigation.navigate("Detail", { id }),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 BookStore</Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Tìm theo tên hoặc tác giả…"
        value={keyword}
        onChangeText={setKeyword}
      />

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Dạng lưới</Text>
        <Switch value={isTile} onValueChange={setIsTile} testID="grid-switch" />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Chỉ còn hàng</Text>
        <Switch value={onlyInStock} onValueChange={setOnlyInStock} testID="in-stock-switch" />
      </View>

      <View style={styles.chipsRow}>
        {[null, ...categories].map((c) => (
          <TouchableOpacity
            key={c ?? "all"}
            style={[styles.chip, category === c && styles.chipOn]}
            onPress={() => setCategory(c)}
            testID={`chip-${c ?? "all"}`}
          >
            <Text style={[styles.chipText, category === c && styles.chipTextOn]}>
              {c ?? "Tất cả"}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.chip, sortAsc && styles.chipOn]}
          onPress={() => setSortAsc((v) => !v)}
          testID="chip-sort-price"
        >
          <Text style={[styles.chipText, sortAsc && styles.chipTextOn]}>Giá tăng dần</Text>
        </TouchableOpacity>
      </View>

      {apiFailed && sourceBooks.length === 0 ? (
        <View style={styles.center} testID="api-error">
          <Text style={styles.errorTitle}>Không tải được danh sách sách</Text>
          <Text style={styles.errorText}>{api.error}</Text>
          <View style={styles.errorActions}>
            <TouchableOpacity
              style={styles.errBtn}
              onPress={() => dispatch(fetchBooks())}
              testID="retry"
            >
              <Text style={styles.errBtnText}>Thử lại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.errBtn, styles.errBtnAlt]}
              onPress={switchToArray}
              testID="use-array"
            >
              <Text style={[styles.errBtnText, { color: colors.indigo }]}>Dùng dữ liệu mảng</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.indigo} testID="loading" />
          <Text style={styles.empty}>Đang tải sách…</Text>
        </View>
      ) : (
        <FlatList
          key={String(numColumns)} // đổi số cột thì phải đổi key
          data={visible}
          keyExtractor={(b) => b.id}
          numColumns={numColumns}
          columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
          renderItem={({ item }) => (
            <BookCard book={item} layout={isTile ? "tile" : "row"} onSelect={onSelect} />
          )}
          contentContainerStyle={{ padding: 14, paddingBottom: 30 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListHeaderComponent={
            apiFailed ? (
              <Text style={styles.banner} testID="api-banner">
                Không làm mới được: {api.error}
              </Text>
            ) : null
          }
          ListEmptyComponent={
            <Text style={styles.empty}>Không tìm thấy sách phù hợp.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { backgroundColor: colors.navy, padding: 14 },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  search: {
    backgroundColor: "#fff",
    margin: 12,
    marginBottom: 0,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  switchLabel: { fontSize: 14, color: colors.text },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  chip: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipOn: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  chipText: { color: colors.text },
  chipTextOn: { color: "#fff" },
  columnWrapper: { justifyContent: "space-between" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  empty: { color: colors.muted, textAlign: "center", padding: 16 },
  errorTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  errorText: { color: colors.muted, textAlign: "center", paddingHorizontal: 24 },
  errorActions: { flexDirection: "row", gap: 10, marginTop: 6 },
  errBtn: {
    backgroundColor: colors.indigo,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.indigo,
  },
  errBtnAlt: { backgroundColor: "#fff" },
  errBtnText: { color: "#fff", fontWeight: "700" },
  banner: { color: "#B42318", marginBottom: 8, textAlign: "center" },
});
```

## screens/DetailScreen.tsx

```tsx
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation";
import { getBookById } from "../data/books";
import { formatPrice } from "../utils";
import { colors } from "../theme";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart } from "../store/cartSlice";
import { selectIsFavorite, toggleFavorite } from "../store/favoritesSlice";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function DetailScreen({ route }: Props) {
  const { id } = route.params;
  const dispatch = useAppDispatch();
  const favorite = useAppSelector(selectIsFavorite(id));
  const book = getBookById(id); // đọc từ mảng, ở cả hai chế độ USE_API

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Không tìm thấy sách.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <Image source={{ uri: book.cover }} style={styles.cover} resizeMode="cover" />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.sub}>
        {book.author} · {book.category}
      </Text>
      <View style={styles.row}>
        <Text style={styles.price}>{formatPrice(book.price)}</Text>
        <Text style={styles.sub}>⭐ {book.rating.toFixed(1)}</Text>
        <Text>{book.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}</Text>
      </View>
      <Text style={styles.desc}>{book.description}</Text>
      <TouchableOpacity
        testID="add-cart"
        style={[styles.btn, !book.inStock && styles.btnDisabled]}
        disabled={!book.inStock}
        onPress={() => dispatch(addToCart(book))}
      >
        <Text style={styles.btnText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="toggle-fav"
        style={[styles.favBtn, favorite && styles.favBtnOn]}
        onPress={() => dispatch(toggleFavorite(book.id))}
      >
        <Text style={[styles.favText, favorite && styles.favTextOn]}>
          {favorite ? "♥ Đã yêu thích" : "♡ Yêu thích"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, gap: 10 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: { color: colors.muted, textAlign: "center", padding: 16 },
  cover: {
    width: "100%",
    height: 300,
    borderRadius: 14,
    backgroundColor: colors.indigo,
  },
  title: { fontSize: 20, fontWeight: "700", color: colors.text },
  sub: { fontSize: 14, color: colors.muted },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  price: { fontSize: 18, fontWeight: "700", color: colors.indigo },
  desc: { fontSize: 14, color: colors.text, lineHeight: 20 },
  btn: {
    backgroundColor: colors.indigo,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  favBtn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.line,
  },
  favBtnOn: { borderColor: "#DC2626" },
  favText: { color: colors.text, fontWeight: "700", fontSize: 15 },
  favTextOn: { color: "#DC2626" },
});
```

## screens/CartScreen.tsx

```tsx
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addToCart,
  decrease,
  selectCartItems,
  selectCartTotal,
} from "../store/cartSlice";
import { formatPrice } from "../utils";
import { colors } from "../theme";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.root} edges={["top"]}>
        <View style={styles.center}>
          <Text style={styles.empty}>Giỏ hàng trống.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.bookId}
        contentContainerStyle={{ padding: 14 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sub}>{formatPrice(item.price)}</Text>
            </View>
            <TouchableOpacity
              testID={`dec-${item.bookId}`}
              style={styles.qtyBtn}
              onPress={() => dispatch(decrease(item.bookId))}
            >
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{item.quantity}</Text>
            <TouchableOpacity
              testID={`inc-${item.bookId}`}
              style={styles.qtyBtn}
              onPress={() =>
                dispatch(
                  addToCart({ id: item.bookId, title: item.title, price: item.price }),
                )
              }
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.lineTotal}>{formatPrice(item.price * item.quantity)}</Text>
          </View>
        )}
        ListFooterComponent={
          <Text style={styles.total}>Tổng tiền: {formatPrice(total)}</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: { color: colors.muted, textAlign: "center", padding: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  title: { fontSize: 15, fontWeight: "700", color: colors.text },
  sub: { fontSize: 13, color: colors.muted },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
  },
  qtyText: { fontSize: 16, fontWeight: "700", color: colors.text },
  qty: { fontSize: 15, fontWeight: "700", color: colors.text, minWidth: 20, textAlign: "center" },
  lineTotal: { fontSize: 14, fontWeight: "700", color: colors.indigo, minWidth: 80, textAlign: "right" },
  total: { fontSize: 17, fontWeight: "700", color: colors.text, textAlign: "right", marginTop: 6 },
});
```

## screens/FavoritesScreen.tsx

```tsx
import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation";
import { BOOKS } from "../data/books";
import BookCard from "../components/BookCard";
import { useAppSelector } from "../store/hooks";
import { selectFavoriteIds } from "../store/favoritesSlice";
import { colors } from "../theme";

export default function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const ids = useAppSelector(selectFavoriteIds);
  const favorites = BOOKS.filter((b) => ids.includes(b.id));
  const onSelect = useCallback(
    (id: string) => navigation.navigate("Detail", { id }),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <FlatList
        data={favorites}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: 14 }}
        renderItem={({ item }) => (
          <BookCard book={item} layout="row" onSelect={onSelect} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Chưa có sách yêu thích.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  empty: { color: colors.muted, textAlign: "center", padding: 16 },
});
```
