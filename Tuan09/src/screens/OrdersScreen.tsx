import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { EmptyState } from "../components/EmptyState";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import { PrimaryButton } from "../components/PrimaryButton";
import { StatusBadge } from "../components/StatusBadge";
import type { RootScreenProps } from "../navigation/types";
import { getBooks } from "../services/bookService";
import { getOrdersByUser } from "../services/orderService";
import { useAuth, useCart } from "../store/hooks";
import { ORDER_STATUS_LABEL, PAYMENT_LABEL, type Order, type OrderStatus } from "../types";
import { showMessage } from "../utils/dialog";
import { formatDateTime, formatPrice } from "../utils/format";

// Câu 5 (TraLoi.md): bộ lọc trạng thái — state + lọc ngay trong data của FlatList.
type StatusFilter = "all" | OrderStatus;
const FILTERS: Array<{ key: StatusFilter; label: string }> = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: ORDER_STATUS_LABEL.pending },
  { key: "shipping", label: ORDER_STATUS_LABEL.shipping },
  { key: "completed", label: ORDER_STATUS_LABEL.completed },
  { key: "cancelled", label: ORDER_STATUS_LABEL.cancelled },
];

// Bài 9.3: Đơn hàng của tôi — mới nhất ở trên, bấm thẻ mở chi tiết ngay trong thẻ.
export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user } = useAuth();
  const { items: cartItems, add, setQty } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const [status, setStatus] = useState<StatusFilter>("all");

  // Bài 9.3a: tải lại mỗi lần vào màn (đặt xong quay lại là thấy đơn mới đầu danh sách).
  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUser(user.id);
      setOrders([...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const visibleOrders = useMemo(
    () => (status === "all" ? orders : orders.filter((o) => o.status === status)),
    [orders, status],
  );

  // Thử thách BT9.C1: "Mua lại" ở đơn đã hoàn tất — thêm lại toàn bộ sản phẩm
  // của đơn vào giỏ hiện tại (cùng sách thì cộng số lượng, không vượt tồn kho),
  // rồi chuyển sang tab Giỏ. Lấy giá và tồn kho mới nhất bằng getBooks(),
  // vì giá trong đơn cũ có thể đã khác.
  const reorder = async (order: Order) => {
    try {
      const books = await getBooks();
      order.items.forEach((it) => {
        const book = books.find((b) => b.id === it.bookId);
        if (!book) return;
        const inCart = cartItems.find((c) => c.bookId === it.bookId);
        if (!inCart) {
          add({
            bookId: book.id,
            title: book.title,
            price: book.price,
            emoji: book.emoji,
            color: book.color,
            stock: book.stock,
          });
        }
        setQty(it.bookId, (inCart?.quantity ?? 0) + it.quantity); // setQty tự chặn ở tồn kho
      });
      showMessage("Đã thêm vào giỏ", "Các sản phẩm của đơn hàng đã được thêm lại vào giỏ.", () =>
        navigation.navigate("Tabs", { screen: "Cart" }),
      );
    } catch (e) {
      showMessage("Không thể mua lại", getErrorMessage(e));
    }
  };

  if (loading) return <LoadingView label="Đang tải đơn hàng…" />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <FlatList
      data={visibleOrders}
      keyExtractor={(o) => String(o.id)}
      contentContainerStyle={{ padding: 12, gap: 10, flexGrow: 1 }}
      ListHeaderComponent={
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {FILTERS.map((f) => {
            const active = status === f.key;
            return (
              <Pressable
                key={f.key}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setStatus(f.key)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      }
      ListEmptyComponent={
        <EmptyState
          emoji="🧾"
          title="Bạn chưa có đơn hàng nào"
          message="Đặt đơn đầu tiên để theo dõi tại đây."
          actionLabel="Mua sắm ngay"
          onAction={() => navigation.navigate("Tabs", { screen: "Home" })}
        />
      }
      renderItem={({ item: o }) => {
        const open = openId === o.id;
        return (
          <View style={styles.card}>
            <Pressable onPress={() => setOpenId(open ? null : o.id)} style={styles.head}>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={styles.code}>Đơn #{o.id}</Text>
                <Text style={styles.date}>{formatDateTime(o.createdAt)}</Text>
                <Text style={styles.total}>{formatPrice(o.total)}</Text>
              </View>
              <View style={{ alignItems: "flex-end", gap: 6 }}>
                <StatusBadge status={o.status} />
                <Text style={styles.toggle}>{open ? "Thu gọn ▲" : "Chi tiết ▼"}</Text>
              </View>
            </Pressable>
            {open && (
              <View style={styles.detail}>
                {o.items.map((it) => (
                  <View key={it.bookId} style={styles.itemRow}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {it.title} × {it.quantity}
                    </Text>
                    <Text style={styles.itemPrice}>{formatPrice(it.price * it.quantity)}</Text>
                  </View>
                ))}
                <View style={styles.addr}>
                  <Text style={styles.addrH}>Giao đến</Text>
                  <Text style={styles.addrT}>
                    {o.address.name} · {o.address.phone}
                  </Text>
                  <Text style={styles.addrT}>{o.address.address}</Text>
                  <Text style={styles.addrT}>Thanh toán: {PAYMENT_LABEL[o.paymentMethod]}</Text>
                </View>
                {o.status === "completed" ? (
                  <PrimaryButton title="Mua lại" variant="outline" onPress={() => void reorder(o)} />
                ) : null}
              </View>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  addr: { borderTopColor: "#E5E7EB", borderTopWidth: 1, marginTop: 8, paddingTop: 8 },
  addrH: { fontWeight: "800", marginBottom: 2 },
  addrT: { color: "#374151", fontSize: 13, marginTop: 2 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 12 },
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
  code: { fontWeight: "800" },
  date: { color: "#6B7280", fontSize: 13 },
  detail: { borderTopColor: "#E5E7EB", borderTopWidth: 1, marginTop: 10, paddingTop: 10 },
  filters: { marginBottom: 4 },
  head: { flexDirection: "row" },
  itemPrice: { fontWeight: "700" },
  itemRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  itemTitle: { flex: 1, marginRight: 12 },
  toggle: { color: "#3B3FD8", fontSize: 13, fontWeight: "700" },
  total: { color: "#3B3FD8", fontWeight: "800", marginTop: 2 },
});
