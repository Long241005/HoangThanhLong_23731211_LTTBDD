// App.tsx — Project demo cho Giờ 3
// Ghép DiscountBadgeCover (lưới 2 cột) + FloatingCartButton nổi ngoài ScrollView

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { DiscountBadgeCover } from './components/DiscountBadge';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    // Container ngoài cùng: flex 1 + position mặc định (relative)
    // để FloatingCartButton định vị theo TOÀN màn hình
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Sách đang giảm giá / mới</Text>
        <View style={styles.grid}>
          {BOOKS.map((book) => (
            <View key={book.id} style={styles.item}>
              <DiscountBadgeCover book={book} />
              <Text style={styles.title} numberOfLines={1}>
                {book.title}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Nút giỏ nổi — NẰM NGOÀI ScrollView để không bị cuộn trôi */}
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
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginBottom: 16,
  },
  title: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
});
