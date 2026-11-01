import { Pressable, StyleSheet, Text, View } from "react-native";

// TabBar là component thuần giao diện: không biết gì về thư viện điều hướng,
// chỉ vẽ danh sách items và báo onPress(key) khi người dùng bấm.
export interface TabItem {
  key: string;
  label: string;
  emoji: string;
  badge?: number;
}

interface Props {
  items: TabItem[];
  activeKey: string;
  onPress: (key: string) => void;
}

export function TabBar({ items, activeKey, onPress }: Props) {
  return (
    <View style={styles.bar}>
      {items.map((item) => {
        const active = item.key === activeKey;
        return (
          <Pressable key={item.key} style={styles.item} onPress={() => onPress(item.key)}>
            <View>
              <Text style={[styles.emoji, active && styles.emojiActive]}>{item.emoji}</Text>
              {item.badge !== undefined && item.badge > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    backgroundColor: "#DC2626",
    borderRadius: 10,
    height: 20,
    justifyContent: "center",
    minWidth: 20,
    paddingHorizontal: 4,
    position: "absolute",
    right: -18,
    top: -6,
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  bar: {
    backgroundColor: "#fff",
    borderTopColor: "#E5E7EB",
    borderTopWidth: 1,
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 8,
  },
  emoji: { fontSize: 22, textAlign: "center" },
  emojiActive: { opacity: 1 },
  item: { alignItems: "center", flex: 1 },
  label: { color: "#6B7280", fontSize: 12, marginTop: 2 },
  labelActive: { color: "#3B3FD8", fontWeight: "700" },
});
