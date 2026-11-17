import AsyncStorage from "@react-native-async-storage/async-storage";

// Lưu/đọc JSON vào AsyncStorage (trên web AsyncStorage dùng localStorage).
export async function saveJSON<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Lưu đệm thất bại thì app vẫn chạy bằng state trong bộ nhớ, không crash.
  }
}

export async function loadJSON<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function removeJSON(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // Bỏ qua lỗi xóa đệm.
  }
}
