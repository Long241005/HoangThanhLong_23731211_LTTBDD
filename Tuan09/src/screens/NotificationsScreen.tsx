import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { getErrorMessage } from "../api/client";
import { EmptyState } from "../components/EmptyState";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import { NotificationItem } from "../components/NotificationItem";
import type { RootScreenProps } from "../navigation/types";
import { getNotifications, markAsRead } from "../services/notificationService";
import { useAuth } from "../store/hooks";
import type { AppNotification } from "../types";

// Bài 9.5: Thông báo — dữ liệu lấy từ API, chưa dùng push thật.
export function NotificationsScreen({ navigation }: RootScreenProps<"Notifications">) {
  const { user } = useAuth();
  const [data, setData] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      setData(await getNotifications(user.id));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  // Bài 9.5d: cập nhật lạc quan — đổi giao diện NGAY, gọi API phía sau,
  // nếu lỗi thì hoàn lại read = false (xem câu 4 trong TraLoi.md).
  const open = async (n: AppNotification) => {
    if (!n.read) {
      setData((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
      markAsRead(n.id).catch(() =>
        setData((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: false } : x))),
      );
    }
    if (n.target?.screen === "Orders") {
      navigation.navigate("Orders");
    } else if (n.target?.screen === "BookDetail" && n.target.bookId) {
      navigation.navigate("BookDetail", { bookId: n.target.bookId });
    }
  };

  if (loading) return <LoadingView label="Đang tải thông báo…" />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(n) => String(n.id)}
      contentContainerStyle={{ padding: 12, gap: 8, flexGrow: 1 }}
      renderItem={({ item }) => <NotificationItem item={item} onPress={open} />}
      ListEmptyComponent={<EmptyState emoji="🔔" title="Chưa có thông báo nào" message="Thông báo về đơn hàng và sách mới sẽ hiện ở đây." />}
    />
  );
}
