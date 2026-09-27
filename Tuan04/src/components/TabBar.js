import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TABS = [
  { key: 'home', label: 'Trang chủ', icon: '🏠' },
  { key: 'category', label: 'Danh mục', icon: '🗂️' },
  { key: 'cart', label: 'Giỏ hàng', icon: '🛒' },
  { key: 'account', label: 'Tài khoản', icon: '👤' },
];

// So sánh 2 cách đặt Tab Bar cố định ở đáy màn hình:
//
// (A) Đặt NGOÀI ScrollView, làm sibling cùng cấp trong View cha flex:1
//     (cách đang dùng ở đây):
//       - Ưu điểm: đơn giản, không cần tính toán padding, layout luôn đúng
//         dù bàn phím/notch thay đổi, dễ đọc code.
//       - Dùng khi: Tab Bar luôn hiện diện trên mọi màn hình, không cần
//         "nổi đè" lên nội dung, không có hiệu ứng ẩn/hiện khi cuộn.
//
// (B) Dùng position: 'absolute', bottom: 0 trong SafeAreaView:
//       - Ưu điểm: có thể cho Tab Bar "nổi" trên nội dung (đè lên), dễ làm
//         hiệu ứng ẩn/hiện khi cuộn (show/hide on scroll), tách rời layout.
//       - Nhược điểm: PHẢI tự thêm paddingBottom cho nội dung phía trên
//         bằng đúng chiều cao Tab Bar, nếu không nội dung cuối sẽ bị che.
//       - Dùng khi: cần Tab Bar trong suốt/nổi trên nội dung, hoặc cần
//         ẩn/hiện Tab Bar linh động theo hành vi cuộn.
//
// Bài này dùng cách (A) vì đơn giản và không có yêu cầu ẩn/hiện Tab Bar.
export default function TabBar({ active, onChangeTab }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.item}
            onPress={() => onChangeTab(tab.key)}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 10,
  },
  item: {
    flex: 1, // chia đều 4 phần bằng nhau
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 20, opacity: 0.5 },
  iconActive: { opacity: 1 },
  label: { fontSize: 11, color: '#999', marginTop: 2 },
  labelActive: { color: '#1D3557', fontWeight: '700' },
});
