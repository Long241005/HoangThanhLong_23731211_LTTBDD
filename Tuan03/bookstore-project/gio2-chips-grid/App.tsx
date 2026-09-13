// App.tsx — Project demo cho Giờ 2
// Ghép CategoryChips + BookGrid trong 1 ScrollView

import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { BOOKS } from './data';

export default function App() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Danh mục</Text>
        <CategoryChips onSelect={(c) => console.log('Chọn danh mục:', c.name)} />

        <Text style={styles.sectionTitle}>Sách nổi bật</Text>
        <BookGrid books={BOOKS} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#374151',
    marginTop: 16,
    marginBottom: 10,
  },
});
