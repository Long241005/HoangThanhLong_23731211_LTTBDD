import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { getErrorMessage } from "../api/client";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import type { RootScreenProps } from "../navigation/types";
import { updateProfile } from "../services/userService";
import { useAuth } from "../store/hooks";
import { showMessage } from "../utils/dialog";
import { validatePhone, validateRequired } from "../utils/validators";

// Bài 9.4: xem và sửa hồ sơ — đổi tên và số điện thoại, email bị khoá.
export function EditProfileScreen({ navigation }: RootScreenProps<"EditProfile">) {
  const { user, patchUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = {
    name: validateRequired("họ tên")(name),
    phone: validatePhone(phone),
  };

  // Bài 9.4b: PATCH xong thì cập nhật store để tab Tài khoản hiện tên mới ngay.
  const save = async () => {
    setTouched(true);
    if (errors.name || errors.phone || !user) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const updated = await updateProfile(user.id, { name: name.trim(), phone: phone.trim() });
      patchUser(updated);
      showMessage("Đã lưu", "Thông tin hồ sơ đã được cập nhật.", () => navigation.goBack());
    } catch (e) {
      setSubmitError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <FormField label="Email (không thể đổi)" value={user?.email ?? ""} editable={false} />
      <FormField
        label="Họ tên"
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
      {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
      <PrimaryButton title={loading ? "Đang lưu…" : "Lưu thay đổi"} onPress={save} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F4F6FB", flex: 1 },
  content: { padding: 16 },
  submitError: { color: "#DC2626", fontWeight: "700", marginBottom: 4, textAlign: "center" },
});
