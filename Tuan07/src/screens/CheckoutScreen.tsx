import { Pressable, StyleSheet, Text, View } from "react-native";
import type { RootScreenProps } from "../navigation/types";
import { useCart } from "../store/hooks";
import { formatPrice } from "../utils/format";

export function CheckoutScreen({ route, navigation }: RootScreenProps<"Checkout">) {
  const { clear } = useCart();
  const total = route.params.total;
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>✅</Text>
      <Text style={styles.title}>Thanh toán</Text>
      <Text style={styles.text}>
        Tổng tiền cần thanh toán là <Text style={styles.total}>{formatPrice(total)}</Text>.
      </Text>
      <Text style={styles.hint}>
        Đây là màn thanh toán theo đề bài buổi 7: nhận đúng tổng tiền từ màn Giỏ hàng qua
        route.params.total. Sau khi xác nhận, giỏ hàng sẽ được xóa và quay về Home.
      </Text>
      <Pressable
        style={styles.btn}
        onPress={() => {
          clear();
          navigation.navigate("Tabs");
        }}
      >
        <Text style={styles.btnText}>Hoàn tất, quay về Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: "#3B3FD8", borderRadius: 12, marginTop: 20, paddingVertical: 14, width: "100%" },
  btnText: { color: "#fff", fontWeight: "700", textAlign: "center" },
  container: { alignItems: "center", backgroundColor: "#F4F6FB", flex: 1, justifyContent: "center", padding: 24 },
  emoji: { fontSize: 48 },
  hint: { color: "#6B7280", marginTop: 10, textAlign: "center" },
  text: { fontSize: 16, marginTop: 12, textAlign: "center" },
  title: { fontSize: 22, fontWeight: "800", marginTop: 12 },
  total: { color: "#3B3FD8", fontWeight: "800" },
});
