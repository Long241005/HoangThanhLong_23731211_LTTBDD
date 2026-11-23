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
