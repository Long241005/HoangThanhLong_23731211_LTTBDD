import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Book } from "../types";
import { formatPrice } from "../utils/format";

interface Props {
  book: Book;
  onPress: () => void;
}

export function BookCard({ book, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.coverEmoji}>{book.emoji}</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {book.title}
      </Text>
      <Text style={styles.author} numberOfLines={1}>
        {book.author}
      </Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>Còn {book.stock} cuốn</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  author: { color: "#6B7280", fontSize: 12, marginTop: 2 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flex: 1,
    margin: 6,
    padding: 12,
  },
  cover: { alignItems: "center", borderRadius: 12, justifyContent: "center", paddingVertical: 24 },
  coverEmoji: { fontSize: 40 },
  price: { color: "#3B3FD8", fontSize: 15, fontWeight: "700", marginTop: 6 },
  stock: { color: "#6B7280", fontSize: 12, marginTop: 2 },
  title: { fontSize: 14, fontWeight: "700", marginTop: 8 },
});
