import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccountScreen } from "../screens/AccountScreen";
import { CartScreen } from "../screens/CartScreen";
import { CategoriesScreen } from "../screens/CategoriesScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { CustomTabBar } from "./CustomTabBar";
import type { TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="Categories" component={CategoriesScreen} options={{ title: "Danh mục" }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: "Giỏ hàng" }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{ title: "Tài khoản" }} />
    </Tab.Navigator>
  );
}
