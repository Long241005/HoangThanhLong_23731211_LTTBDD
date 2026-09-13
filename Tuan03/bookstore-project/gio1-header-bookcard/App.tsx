// App.tsx — Project demo cho Giờ 1
// Ghép Header + danh sách BookCard (2 kiểu alignItems để so sánh)

import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Header } from './components/Header';
import { BookCard } from './components/BookCard';
import { BOOKS } from './data';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>alignItems: 'flex-start'</Text>
        {BOOKS.slice(0, 2).map((book) => (
          <BookCard key={book.id} book={book} align="flex-start" />
        ))}

        <Text style={styles.sectionTitle}>alignItems: 'center'</Text>
        {BOOKS.slice(2, 4).map((book) => (
          <BookCard key={book.id} book={book} align="center" />
        ))}
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
    marginTop: 8,
    marginBottom: 8,
  },
});
