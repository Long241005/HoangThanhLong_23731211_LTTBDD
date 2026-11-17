import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import type { TabScreenProps } from "../navigation/types";
import { login } from "../services/userService";
import { useAuth } from "../store/hooks";

// Một dòng trong menu của tab Tài khoản (bài 9.3d, 9.5f).
function MenuItem({ emoji, label, onPress }: { emoji: string; label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuEmoji}>{emoji}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.menuArrow}>›</Text>
    </Pressable>
  );
}

export function AccountScreen({ navigation }: TabScreenProps<"Account">) {
  const { user, isLoggedIn, signIn, signOut } = useAuth();
  const [email, setEmail] = useState("demo@bookstore.vn");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Đăng nhập giả lập theo đề buổi 9: so sánh mật khẩu ngay trên app.
  const doLogin = async () => {
    setLoading(true);
    setLoginError(null);
    try {
      const u = await login(email, password);
      signIn(u, "fake-token");
    } catch (e) {
      setLoginError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>🔒</Text>
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.hint}>Tài khoản demo đã điền sẵn, chỉ cần bấm Đăng nhập.</Text>
        <View style={styles.form}>
          <FormField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <FormField label="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry />
          {loginError ? <Text style={styles.error}>{loginError}</Text> : null}
          <PrimaryButton title={loading ? "Đang đăng nhập…" : "Đăng nhập"} onPress={doLogin} disabled={loading} />
          <Text style={styles.demo}>Tài khoản demo: demo@bookstore.vn / 123456</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user?.name?.charAt(0) ?? "?"}</Text>
      </View>
      <Text style={styles.title}>{user?.name}</Text>
      <Text style={styles.hint}>{user?.email}</Text>
      {/* Bài 9.4c: hiện số điện thoại và nút sửa hồ sơ. */}
      {user?.phone ? <Text style={styles.email}>📞 {user.phone}</Text> : null}
      <Pressable onPress={() => navigation.navigate("EditProfile")} style={styles.editBtn}>
        <Text style={styles.editText}>✎ Chỉnh sửa</Text>
      </Pressable>

      <View style={styles.menu}>
        {/* Bài 9.3d + 9.5f: đường vào màn Đơn hàng và Thông báo. */}
        <MenuItem emoji="🔔" label="Thông báo" onPress={() => navigation.navigate("Notifications")} />
        <MenuItem emoji="🧾" label="Đơn hàng của tôi" onPress={() => navigation.navigate("Orders")} />
      </View>

      <Pressable style={styles.logoutBtn} onPress={signOut}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    backgroundColor: "#3B3FD8",
    borderRadius: 48,
    height: 96,
    justifyContent: "center",
    width: 96,
  },
  avatarText: { color: "#fff", fontSize: 36, fontWeight: "800" },
  container: { alignItems: "center", backgroundColor: "#F4F6FB", flex: 1, justifyContent: "center", padding: 24 },
  demo: { color: "#6B7280", marginTop: 12, textAlign: "center" },
  editBtn: { backgroundColor: "#EEF2FF", borderRadius: 12, marginTop: 12, paddingHorizontal: 20, paddingVertical: 10 },
  editText: { color: "#3B3FD8", fontWeight: "700" },
  email: { color: "#374151", marginTop: 6 },
  emoji: { fontSize: 48 },
  error: { color: "#DC2626", fontWeight: "700", marginBottom: 8, textAlign: "center" },
  form: { marginTop: 20, width: "100%" },
  hint: { color: "#6B7280", marginTop: 8, textAlign: "center" },
  logoutBtn: {
    backgroundColor: "#fff",
    borderColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  logoutText: { color: "#DC2626", fontWeight: "700" },
  menu: { marginTop: 20, width: "100%" },
  menuArrow: { color: "#9CA3AF", fontSize: 20 },
  menuEmoji: { fontSize: 18, marginRight: 10 },
  menuItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 10,
    padding: 14,
  },
  menuLabel: { flex: 1, fontWeight: "700" },
  title: { fontSize: 20, fontWeight: "800", marginTop: 16, textAlign: "center" },
});
