import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import type { TabScreenProps } from "../navigation/types";
import { useCart } from "../store/hooks";
import { formatPrice } from "../utils/format";

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, remove, setQty, clear } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
        <Text style={styles.emptyHint}>Hãy chọn một cuốn sách ở tab Home để thêm vào giỏ.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.bookId)}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={[styles.thumb, { backgroundColor: item.color }]}>
              <Text style={styles.thumbEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
              <View style={styles.qtyRow}>
                <Pressable style={styles.qtyBtn} onPress={() => setQty(item.bookId, item.quantity - 1)}>
                  <Text style={styles.qtyBtnText}>−</Text>
                </Pressable>
                <Text style={styles.qty}>{item.quantity}</Text>
                <Pressable style={styles.qtyBtn} onPress={() => setQty(item.bookId, item.quantity + 1)}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </Pressable>
                <Pressable onPress={() => remove(item.bookId)}>
                  <Text style={styles.remove}>Xóa</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Tổng tiền: {formatPrice(totalPrice)}</Text>
        <Pressable style={styles.clearBtn} onPress={clear}>
          <Text style={styles.clearText}>Xóa giỏ</Text>
        </Pressable>
        <Pressable
          style={styles.checkoutBtn}
          disabled={items.length === 0}
          onPress={() => navigation.navigate("Checkout", { total: totalPrice })}
        >
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkoutBtn: { backgroundColor: "#3B3FD8", borderRadius: 12, marginTop: 10, paddingVertical: 14 },
  checkoutText: { color: "#fff", fontWeight: "700", textAlign: "center" },
  clearBtn: { alignSelf: "flex-end" },
  clearText: { color: "#DC2626", fontWeight: "700" },
  container: { backgroundColor: "#F4F6FB", flex: 1 },
  empty: { alignItems: "center", backgroundColor: "#F4F6FB", flex: 1, justifyContent: "center", padding: 24 },
  emptyEmoji: { fontSize: 48 },
  emptyHint: { color: "#6B7280", marginTop: 6, textAlign: "center" },
  emptyText: { fontSize: 18, fontWeight: "700", marginTop: 12 },
  footer: { backgroundColor: "#fff", borderTopColor: "#E5E7EB", borderTopWidth: 1, padding: 16 },
  info: { flex: 1, marginLeft: 12 },
  price: { color: "#3B3FD8", fontWeight: "700", marginTop: 4 },
  qty: { fontWeight: "700", marginHorizontal: 12 },
  qtyBtn: { backgroundColor: "#EEF2FF", borderRadius: 16, height: 32, width: 32, alignItems: "center", justifyContent: "center" },
  qtyBtnText: { fontSize: 18, fontWeight: "700" },
  qtyRow: { alignItems: "center", flexDirection: "row", marginTop: 8 },
  remove: { color: "#DC2626", marginLeft: 12 },
  row: { backgroundColor: "#fff", borderRadius: 16, flexDirection: "row", marginBottom: 10, padding: 12 },
  thumb: { alignItems: "center", borderRadius: 12, height: 64, justifyContent: "center", width: 64 },
  thumbEmoji: { fontSize: 28 },
  title: { fontWeight: "700" },
  total: { fontSize: 17, fontWeight: "800", marginBottom: 8 },
});
