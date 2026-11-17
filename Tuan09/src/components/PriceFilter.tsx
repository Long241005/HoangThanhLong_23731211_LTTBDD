import { Pressable, StyleSheet, Text, View } from "react-native";
import type { PriceRange } from "../utils/filters";

export const PRICE_RANGES: { key: Exclude<PriceRange, null>; label: string }[] = [
  { key: "lt100", label: "Dưới 100.000" },
  { key: "100to300", label: "100.000 - 300.000" },
  { key: "gt300", label: "Trên 300.000" },
];

interface Props {
  value: PriceRange;
  onChange: (value: PriceRange) => void;
}

export function PriceFilter({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {PRICE_RANGES.map((r) => {
        const active = value === r.key;
        return (
          <Pressable
            key={r.key}
            onPress={() => onChange(active ? null : r.key)}
            style={[styles.btn, active && styles.btnActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>{r.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnActive: { backgroundColor: "#3B3FD8", borderColor: "#3B3FD8" },
  row: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  text: { color: "#374151", fontSize: 13 },
  textActive: { color: "#fff", fontWeight: "700" },
});
