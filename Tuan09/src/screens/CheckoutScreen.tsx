import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { FormField } from "../components/FormField";
import { PaymentOption } from "../components/PaymentOption";
import { PrimaryButton } from "../components/PrimaryButton";
import type { RootScreenProps } from "../navigation/types";
import { createOrder } from "../services/orderService";
import { useAuth, useCart } from "../store/hooks";
import type { PaymentMethod } from "../types";
import { showMessage } from "../utils/dialog";
import { formatPrice } from "../utils/format";
import { validatePhone, validateRequired } from "../utils/validators";

// Bài 9.1 + 9.2: form thanh toán có validate, gửi đơn POST /orders.
export function CheckoutScreen({ route, navigation }: RootScreenProps<"Checkout">) {
  const { items, clear } = useCart();
  const { user } = useAuth();
  const total = route.params.total;

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Bài 9.1a: errors và valid được TÍNH từ state mỗi lần render, không dùng
  // useState riêng cho chúng (xem câu 1 trong TraLoi.md).
  const errors = {
    name: validateRequired("họ tên người nhận")(name),
    phone: validatePhone(phone),
    address: validateRequired("địa chỉ giao hàng")(address),
  };
  const valid = !errors.name && !errors.phone && !errors.address && items.length > 0;

  // Bài 9.2: chỉ clear() giỏ SAU KHI createOrder thành công. Lỗi mạng thì
  // giữ nguyên giỏ để người dùng bấm thử lại (xem câu 2 trong TraLoi.md).
  const submit = async () => {
    setTouched(true);
    if (!valid || !user) return;
    setLoading(true);
    setSubmitError(null);
    try {
      await createOrder({
        userId: user.id,
        items: items.map((i) => ({
          bookId: i.bookId,
          title: i.title,
          price: i.price,
          quantity: i.quantity,
        })),
        total,
        address: { name: name.trim(), phone: phone.trim(), address: address.trim() },
        paymentMethod: payment,
      });
      clear(); // giỏ trong store rỗng -> useAutoPersist ghi giỏ rỗng vào AsyncStorage
      showMessage("Đặt hàng thành công 🎉", "Cảm ơn bạn đã mua sắm tại BookStore!", () =>
        navigation.navigate("Tabs", { screen: "Home" }),
      );
    } catch (e) {
      setSubmitError(getErrorMessage(e)); // lỗi: giữ nguyên giỏ
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Tóm tắt đơn hàng</Text>
      {items.map((i) => (
        <View key={i.bookId} style={styles.row}>
          <Text style={styles.rowTitle} numberOfLines={1}>
            {i.title} × {i.quantity}
          </Text>
          <Text style={styles.rowPrice}>{formatPrice(i.price * i.quantity)}</Text>
        </View>
      ))}
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Tổng tiền</Text>
        <Text style={styles.total}>{formatPrice(total)}</Text>
      </View>

      <Text style={styles.h}>Địa chỉ giao hàng</Text>
      <FormField
        label="Họ tên người nhận"
        value={name}
        onChangeText={setName}
        error={touched ? errors.name : null}
        autoCapitalize="words"
      />
      <FormField
        label="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
        error={touched ? errors.phone : null}
        keyboardType="phone-pad"
      />
      <FormField
        label="Địa chỉ"
        value={address}
        onChangeText={setAddress}
        error={touched ? errors.address : null}
        autoCapitalize="sentences"
        placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
      />

      <Text style={styles.h}>Phương thức thanh toán</Text>
      <PaymentOption
        label="Thanh toán khi nhận hàng (COD)"
        selected={payment === "cod"}
        onPress={() => setPayment("cod")}
      />
      <PaymentOption
        label="Chuyển khoản ngân hàng"
        hint="Chỉ minh hoạ giao diện"
        selected={payment === "bank"}
        onPress={() => setPayment("bank")}
      />

      {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
      <PrimaryButton
        title={loading ? "Đang gửi đơn…" : "Xác nhận đặt hàng"}
        onPress={submit}
        disabled={!valid || loading}
      />
      {!valid ? (
        <Text style={styles.hint}>Điền đủ họ tên, số điện thoại và địa chỉ thì nút mới sáng lên.</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F4F6FB", flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  h: { fontSize: 16, fontWeight: "800", marginBottom: 10, marginTop: 16 },
  hint: { color: "#6B7280", marginTop: 10, textAlign: "center" },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  rowPrice: { fontWeight: "700" },
  rowTitle: { flex: 1, marginRight: 12 },
  submitError: { color: "#DC2626", fontWeight: "700", marginBottom: 4, marginTop: 8, textAlign: "center" },
  title: { color: "#0B1F5C", fontSize: 20, fontWeight: "800", marginBottom: 12 },
  total: { color: "#3B3FD8", fontSize: 17, fontWeight: "800" },
  totalLabel: { fontWeight: "800" },
  totalRow: { borderTopColor: "#E5E7EB", borderTopWidth: 1, marginTop: 8, paddingTop: 10 },
});
