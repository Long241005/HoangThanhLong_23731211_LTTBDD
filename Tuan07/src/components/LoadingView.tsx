import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function LoadingView({ label = "Đang tải…" }: { label?: string }) {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="large" color="#3B3FD8" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: "#6B7280", marginTop: 12 },
  wrap: { alignItems: "center", flex: 1, justifyContent: "center", padding: 24 },
});
