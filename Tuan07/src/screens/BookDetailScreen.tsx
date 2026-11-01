import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import type { RootScreenProps } from "../navigation/types";
import { getBookById } from "../services/bookService";
import { useCart, useWishlist } from "../store/hooks";
import type { Book } from "../types";
import { formatPrice } from "../utils/format";

export function BookDetailScreen({ route }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { add } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBookById(bookId);
      setBook(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    load();
  }, [load]);

  // Kiểm tra loading/error trước khi render, tránh đọc book.title khi book còn null.
  if (loading) return <LoadingView label="Đang tải chi tiết…" />;
  if (error || !book) {
    return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;
  }

  const wished = isWishlisted(book.id);
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.coverEmoji}>{book.emoji}</Text>
      </View>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>Còn {book.stock} cuốn trong kho</Text>
      <Text style={styles.desc}>{book.description}</Text>
      <Pressable
        style={styles.addBtn}
        onPress={() =>
          add({
            bookId: book.id,
            title: book.title,
            price: book.price,
            emoji: book.emoji,
            color: book.color,
            stock: book.stock,
          })
        }
      >
        <Text style={styles.addBtnText}>🛒 Thêm vào giỏ</Text>
      </Pressable>
      <Pressable style={styles.wishBtn} onPress={() => toggle(book.id)}>
        <Text style={styles.wishText}>{wished ? "♥ Đã lưu vào yêu thích" : "♡ Lưu vào yêu thích"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addBtn: { backgroundColor: "#3B3FD8", borderRadius: 12, marginTop: 16, paddingVertical: 14 },
  addBtnText: { color: "#fff", fontSize: 16, fontWeight: "700", textAlign: "center" },
  author: { color: "#6B7280", fontSize: 15, marginTop: 4 },
  container: { backgroundColor: "#F4F6FB", flex: 1 },
  cover: { alignItems: "center", borderRadius: 16, justifyContent: "center", paddingVertical: 40 },
  coverEmoji: { fontSize: 64 },
  desc: { color: "#374151", lineHeight: 22, marginTop: 12 },
  price: { color: "#3B3FD8", fontSize: 20, fontWeight: "800", marginTop: 10 },
  stock: { color: "#6B7280", marginTop: 4 },
  title: { fontSize: 22, fontWeight: "800", marginTop: 16 },
  wishBtn: {
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 10,
    paddingVertical: 12,
  },
  wishText: { color: "#DC2626", fontWeight: "700", textAlign: "center" },
});
