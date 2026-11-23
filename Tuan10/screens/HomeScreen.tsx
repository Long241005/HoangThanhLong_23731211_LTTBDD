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
