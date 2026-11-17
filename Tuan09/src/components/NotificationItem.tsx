import { Pressable, StyleSheet, Text, View } from "react-native";
import type { AppNotification } from "../types";
import { formatDateTime } from "../utils/format";

interface Props {
  item: AppNotification;
  onPress: (n: AppNotification) => void;
}

// Chưa đọc: nền xanh nhạt + chấm đỏ. Đã đọc: nền trắng, không chấm.
export function NotificationItem({ item, onPress }: Props) {
  return (
    <Pressable
      style={[styles.card, !item.read && styles.unread]}
      onPress={() => onPress(item)}
    >
      {!item.read ? <View style={styles.dot} /> : null}
      <View style={styles.texts}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <Text style={styles.time}>{formatDateTime(item.createdAt)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  body: { color: "#374151", fontSize: 14, marginTop: 2 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 8,
    padding: 12,
  },
  dot: { backgroundColor: "#DC2626", borderRadius: 5, height: 10, marginRight: 8, marginTop: 6, width: 10 },
  texts: { flex: 1 },
  time: { color: "#6B7280", fontSize: 12, marginTop: 6 },
  title: { fontWeight: "700" },
  unread: { backgroundColor: "#E0F2FE" },
});
