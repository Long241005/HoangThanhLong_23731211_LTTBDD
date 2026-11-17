import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  label: string;
  hint?: string;
  selected: boolean;
  onPress: () => void;
}

// Một lựa chọn thanh toán: thẻ có viền indigo + chấm tròn khi được chọn.
export function PaymentOption({ label, hint, selected, onPress }: Props) {
  return (
    <Pressable
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <View style={styles.dot} /> : null}
      </View>
      <View style={styles.texts}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 10,
    padding: 12,
  },
  cardSelected: { borderColor: "#3B3FD8", borderWidth: 2 },
  dot: { backgroundColor: "#3B3FD8", borderRadius: 5, height: 10, width: 10 },
  hint: { color: "#6B7280", fontSize: 13, marginTop: 2 },
  label: { fontWeight: "700" },
  radio: {
    alignItems: "center",
    borderColor: "#9CA3AF",
    borderRadius: 11,
    borderWidth: 2,
    height: 22,
    justifyContent: "center",
    marginRight: 10,
    width: 22,
  },
  radioSelected: { borderColor: "#3B3FD8" },
  texts: { flex: 1 },
});
