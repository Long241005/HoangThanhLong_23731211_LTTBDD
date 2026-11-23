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
