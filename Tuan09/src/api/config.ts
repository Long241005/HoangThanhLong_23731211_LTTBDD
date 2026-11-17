import { Platform } from "react-native";

// Trên web và iOS simulator: localhost là chính máy chạy json-server.
// Trên Android emulator, localhost là chính emulator nên phải dùng 10.0.2.2.
// Trên điện thoại thật: đặt EXPO_PUBLIC_API_URL=http://<IP-máy-tính>:3000 rồi chạy lại với -c.
const fromEnv = process.env.EXPO_PUBLIC_API_URL;
const fallback = Platform.OS === "android" ? "http://10.0.2.2:300" : "http://localhost:3000";
export const API_URL = fromEnv ?? fallback;
