import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>Thử lại</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: "#3B3FD8", borderRadius: 12, marginTop: 16, paddingHorizontal: 20, paddingVertical: 10 },
  btnText: { color: "#fff", fontWeight: "700" },
  emoji: { fontSize: 40, textAlign: "center" },
  message: { color: "#374151", marginTop: 12, textAlign: "center" },
  wrap: { alignItems: "center", flex: 1, justifyContent: "center", padding: 24 },
});
