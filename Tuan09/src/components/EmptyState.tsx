import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  emoji?: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ emoji = "🔎", title, message, actionLabel, onAction }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <Pressable style={styles.btn} onPress={onAction}>
          <Text style={styles.btnText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: "#3B3FD8", borderRadius: 12, marginTop: 16, paddingHorizontal: 20, paddingVertical: 10 },
  btnText: { color: "#fff", fontWeight: "700" },
  emoji: { fontSize: 40, textAlign: "center" },
  message: { color: "#6B7280", marginTop: 6, textAlign: "center" },
  title: { fontSize: 16, fontWeight: "700", marginTop: 12, textAlign: "center" },
  wrap: { alignItems: "center", padding: 24 },
});
