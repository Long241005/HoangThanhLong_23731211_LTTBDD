import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline";
  disabled?: boolean;
}

export function PrimaryButton({ title, onPress, variant = "primary", disabled }: Props) {
  return (
    <Pressable
      style={[
        styles.btn,
        variant === "outline" ? styles.outline : styles.primary,
        disabled ? styles.disabled : null,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, variant === "outline" ? styles.textOutline : styles.textPrimary]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { borderRadius: 12, marginTop: 10, paddingVertical: 13 },
  disabled: { opacity: 0.5 },
  outline: { backgroundColor: "#fff", borderColor: "#3B3FD8", borderWidth: 1.5 },
  primary: { backgroundColor: "#3B3FD8" },
  text: { fontWeight: "700", textAlign: "center" },
  textOutline: { color: "#3B3FD8" },
  textPrimary: { color: "#fff" },
});
