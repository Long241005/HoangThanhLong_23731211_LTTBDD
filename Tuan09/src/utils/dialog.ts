import { Alert, Platform } from "react-native";

// Alert.alert không chạy trên bản web, nên project dùng hàm bọc này:
// web dùng window.alert, còn điện thoại dùng Alert.alert của React Native.
export function showMessage(title: string, message: string, onOk?: () => void): void {
  if (Platform.OS === "web" && typeof window !== "undefined" && typeof window.alert === "function") {
    window.alert(`${title}\n${message}`);
    onOk?.();
    return;
  }
  Alert.alert(title, message, [{ text: "OK", onPress: onOk }]);
}
