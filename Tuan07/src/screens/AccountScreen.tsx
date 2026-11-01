import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../store/hooks";

export function AccountScreen() {
  const { user, isLoggedIn, signIn, signOut } = useAuth();

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>🔒</Text>
        <Text style={styles.title}>Bạn chưa đăng nhập</Text>
        <Text style={styles.hint}>
          Đăng nhập trong buổi này là giả lập: bấm nút dưới đây để vào bằng tài khoản demo
          demo@bookstore.vn.
        </Text>
        <Pressable
          style={styles.btn}
          onPress={() =>
            signIn({ id: 1, name: "Học viên Demo", email: "demo@bookstore.vn" }, "fake-token")
          }
        >
          <Text style={styles.btnText}>Đăng nhập thử</Text>
        </Pressable>
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
  btn: { backgroundColor: "#3B3FD8", borderRadius: 12, marginTop: 20, paddingHorizontal: 24, paddingVertical: 14 },
  btnText: { color: "#fff", fontWeight: "700" },
  container: { alignItems: "center", backgroundColor: "#F4F6FB", flex: 1, justifyContent: "center", padding: 24 },
  emoji: { fontSize: 48 },
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
  title: { fontSize: 20, fontWeight: "800", marginTop: 16, textAlign: "center" },
});
