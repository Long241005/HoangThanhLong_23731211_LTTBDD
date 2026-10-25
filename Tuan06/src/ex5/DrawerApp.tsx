import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
  return (
    <View style={s.center}>
      <Text style={s.big}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={s.center}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={s.big}>Nguyễn Văn An</Text>
      <Text style={s.muted}>an.nguyen@example.com</Text>
    </View>
  );
}

function SettingsScreen() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <View style={{ flex: 1, padding: 16, gap: 16 }}>
      <View style={s.row}>
        <Text>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s.row}>
        <Text>Giao diện tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

export function DrawerApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerActiveTintColor: colors.red,
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name={
                route.name === "Home"
                  ? "home-outline"
                  : route.name === "Profile"
                    ? "person-outline"
                    : "settings-outline"
              }
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Cá nhân" }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8 },
  big: { fontSize: 20, fontWeight: "bold" },
  muted: { color: colors.muted },
  avatar: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: colors.blue, justifyContent: "center", alignItems: "center",
  },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  row: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingVertical: 12, borderBottomWidth: 1, borderColor: colors.line,
  },
});
