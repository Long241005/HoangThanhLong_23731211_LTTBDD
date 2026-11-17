import { StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native";

interface Props extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string | null;
}

// Ô nhập có nhãn và dòng lỗi đỏ hiện ngay dưới ô (error = null thì không hiện).
export function FormField({ label, error, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, rest.editable === false ? styles.inputDisabled : null]}
        placeholderTextColor="#9CA3AF"
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  error: { color: "#DC2626", fontSize: 13, marginTop: 4 },
  input: {
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  inputDisabled: { opacity: 0.6 },
  inputError: { borderColor: "#DC2626" },
  label: { fontSize: 14, fontWeight: "700", marginBottom: 6 },
  wrap: { marginBottom: 12 },
});
