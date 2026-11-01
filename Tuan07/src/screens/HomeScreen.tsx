import { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDebounce } from "../hooks/useDebounce";
import type { TabScreenProps } from "../navigation/types";
import { getErrorMessage } from "../api/client";
import { BookGrid } from "../components/BookGrid";
import { EmptyState } from "../components/EmptyState";
import { ErrorView } from "../components/ErrorView";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { LoadingView } from "../components/LoadingView";
import { PriceFilter } from "../components/PriceFilter";
import { SearchBar } from "../components/SearchBar";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { useCart } from "../store/hooks";
import type { Book, Category } from "../types";
import { filterBooks, type PriceRange } from "../utils/filters";

type SortOrder = "asc" | "desc" | null;

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sort, setSort] = useState<SortOrder>(null);
  const { totalQuantity } = useCart();

  // Hai API độc lập nên gọi song song bằng Promise.all.
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, c] = await Promise.all([getBooks(), getCategories()]);
      setBooks(b);
      setCategories(c);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Bài 7.8: nhận categoryId từ tab Danh mục, áp dụng một lần rồi xóa params
  // để quay lại tab Danh mục chọn mục khác vẫn lọc đúng, không bị áp lại.
  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  // Bài 7.7: chỉ lọc sau khi ngừng gõ 400ms.
  const debouncedKeyword = useDebounce(keyword, 400);

  // Bài 7.7 + 7.8 + C2 + câu 5: lọc AND (từ khóa, danh mục, giá) rồi mới sắp xếp
  // trên bản sao, không sắp xếp trực tiếp mảng gốc.
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

  const hasFilter = keyword !== "" || categoryId !== null || priceRange !== null || sort !== null;
  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
    setSort(null);
  };

  if (loading) return <LoadingView label="Đang tải sách…" />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      <BookGrid
        data={visibleBooks}
        onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })}
        ListEmptyComponent={
          <EmptyState
            emoji="🔎"
            title="Không tìm thấy sách phù hợp"
            message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
            actionLabel="Xóa bộ lọc"
            onAction={clearFilters}
          />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>📚 BookStore</Text>
            <SearchBar value={keyword} onChangeText={setKeyword} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
              <Pressable
                style={[styles.chip, categoryId === null && styles.chipActive]}
                onPress={() => setCategoryId(null)}
              >
                <Text style={[styles.chipText, categoryId === null && styles.chipTextActive]}>Tất cả</Text>
              </Pressable>
              {categories.map((c) => {
                const active = categoryId === c.id;
                return (
                  <Pressable
                    key={c.id}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => setCategoryId(c.id)}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {c.emoji} {c.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <PriceFilter value={priceRange} onChange={setPriceRange} />
            <View style={styles.sortRow}>
              <Pressable
                style={[styles.sortBtn, sort === "asc" && styles.sortBtnActive]}
                onPress={() => setSort(sort === "asc" ? null : "asc")}
              >
                <Text style={[styles.sortText, sort === "asc" && styles.sortTextActive]}>Giá tăng dần ↑</Text>
              </Pressable>
              <Pressable
                style={[styles.sortBtn, sort === "desc" && styles.sortBtnActive]}
                onPress={() => setSort(sort === "desc" ? null : "desc")}
              >
                <Text style={[styles.sortText, sort === "desc" && styles.sortTextActive]}>Giá giảm dần ↓</Text>
              </Pressable>
              {hasFilter ? (
                <Pressable onPress={clearFilters}>
                  <Text style={styles.clear}>✕ Xóa bộ lọc</Text>
                </Pressable>
              ) : null}
            </View>
            <Text style={styles.count}>{visibleBooks.length} cuốn sách</Text>
          </View>
        }
      />
      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipActive: { backgroundColor: "#3B3FD8", borderColor: "#3B3FD8" },
  chipText: { color: "#374151", fontSize: 13 },
  chipTextActive: { color: "#fff", fontWeight: "700" },
  chips: { marginTop: 10 },
  clear: { color: "#DC2626", fontWeight: "700" },
  container: { backgroundColor: "#F4F6FB", flex: 1 },
  count: { color: "#6B7280", marginTop: 10 },
  header: { padding: 12 },
  sortBtn: {
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sortBtnActive: { backgroundColor: "#0B1F5C", borderColor: "#0B1F5C" },
  sortRow: { alignItems: "center", flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  sortText: { color: "#374151", fontSize: 13 },
  sortTextActive: { color: "#fff", fontWeight: "700" },
  title: { color: "#0B1F5C", fontSize: 22, fontWeight: "800", marginBottom: 10 },
});
