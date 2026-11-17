import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookDetailScreen } from "../screens/BookDetailScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { EditProfileScreen } from "../screens/EditProfileScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { OrdersScreen } from "../screens/OrdersScreen";
import { TabNavigator } from "./TabNavigator";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

// Stack ngoài cùng: Tabs ở dưới, BookDetail và Checkout phủ lên cả Tab Bar
// và tự có nút quay lại của hệ thống.
export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0B1F5C" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: "Chi tiết sách" }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Thanh toán" }} />
      <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: "Đơn hàng của tôi" }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Chỉnh sửa hồ sơ" }} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: "Thông báo" }} />
    </Stack.Navigator>
  );
}
