// App.tsx — BÀI TỔNG HỢP: Giờ 1 + Giờ 2 + Giờ 3
// Ghép Header -> CategoryChips -> BookGrid (có Badge) -> FloatingCartButton
// thành 1 màn hình Trang chủ duy nhất.

import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <View style={styles.screen}>
      {/* 1. Header cố định trên cùng — NẰM NGOÀI ScrollView nên không cuộn theo */}
      <Header />

      {/* 2. ScrollView chứa Chips + Grid — paddingBottom đủ lớn để
             FloatingCartButton không che mất sách cuối cùng */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips />

        <Text style={styles.sectionTitle}>Sách nổi bật</Text>
        <BookGrid books={BOOKS} />
      </ScrollView>

      {/* 3. Nút giỏ nổi — NGOÀI ScrollView, định vị theo toàn màn hình
             nhờ container ngoài cùng (styles.screen) có flex: 1 */}
      <FloatingCartButton count={cartCount} onPress={() => setCartCount((c) => c + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 100 },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#374151',
    marginTop: 16,
    marginBottom: 10,
  },
});
