import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  count: number;
  onPress: () => void;
}

export function FloatingCartButton({ count, onPress }: Props) {
  if (count <= 0) return null;
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>🛒 Giỏ hàng · {count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: "center",
    backgroundColor: "#00B8D9",
    borderRadius: 24,
    bottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    position: "absolute",
  },
  text: { color: "#fff", fontWeight: "700" },
});
