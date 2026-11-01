import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookDetailScreen } from "../screens/BookDetailScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
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
    </Stack.Navigator>
  );
}
