// components/Header.tsx
// Bài tập 1 - Giờ 1: Header ứng dụng BookStore
//
// Yêu cầu:
//  - flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
//  - paddingHorizontal 16, height cố định 56
//  - Nền navy/indigo
//  - 2 icon bên phải nằm trong 1 View con dùng flexDirection: 'row' + khoảng cách (gap)

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function Header() {
  return (
    <View style={styles.container}>
      {/* Bên trái: logo / tên app */}
      <Text style={styles.logo}>📚 BookStore</Text>

      {/* Bên phải: cụm 2 icon, tự làm 1 hàng ngang riêng */}
      <View style={styles.actions}>
        <Ionicons name="search-outline" size={22} color="#FFFFFF" />
        <Ionicons
          name="cart-outline"
          size={22}
          color="#FFFFFF"
          style={styles.cartIcon} // dùng marginLeft thay cho gap để chắc chắn support mọi RN version
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#312E81', // indigo-900
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    // Nếu RN >= 0.71 có thể dùng "gap: 16" thay cho marginLeft ở icon thứ 2
    gap: 16,
  },
  cartIcon: {
    // marginLeft: 16, // fallback nếu bản RN cũ chưa hỗ trợ "gap"
  },
});
