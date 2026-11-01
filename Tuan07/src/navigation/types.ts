import type { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

export type TabParamList = {
  Home: { categoryId?: number } | undefined;
  Categories: undefined;
  Cart: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  BookDetail: { bookId: number };
  Checkout: { total: number };
};

// Màn trong tab cần navigate được cả sang tab khác lẫn lên Stack (BookDetail, Checkout),
// nên navigation là composite của BottomTab + NativeStack. Dùng type này để tsc báo lỗi
// ngay nếu gõ sai tên màn hoặc thiếu params, thay vì lỗi lúc chạy.
export type TabNavigationProp<T extends keyof TabParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, T>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type TabScreenProps<T extends keyof TabParamList> = {
  navigation: TabNavigationProp<T>;
  route: RouteProp<TabParamList, T>;
};

// Giữ lại tên BottomTabScreenProps cho tương thích với cách gọi trong đề (nếu thầy đọc code).
export type TabScreenPropsAlt<T extends keyof TabParamList> = BottomTabScreenProps<TabParamList, T>;

export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;
