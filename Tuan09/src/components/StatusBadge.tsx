import { StyleSheet, Text, View } from "react-native";
import { ORDER_STATUS_LABEL, type OrderStatus } from "../types";

// pending vàng · shipping xanh dương · completed xanh lá · cancelled đỏ.
const COLORS: Record<OrderStatus, { bg: string; fg: string }> = {
  pending: { bg: "#FEF3C7", fg: "#92400E" },
  shipping: { bg: "#DBEAFE", fg: "#1E40AF" },
  completed: { bg: "#D1FAE5", fg: "#065F46" },
  cancelled: { bg: "#FEE2E2", fg: "#991B1B" },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const c = COLORS[status];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.text, { color: c.fg }]}>{ORDER_STATUS_LABEL[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  text: { fontSize: 12, fontWeight: "700" },
});
