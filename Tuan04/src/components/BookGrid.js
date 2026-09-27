import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Grid 2 cột bằng flexWrap (không dùng FlatList numColumns để bài tập tập trung vào flexbox thuần).
export default function BookGrid({ books, onPressBook }) {
  return (
    <View style={styles.grid}>
      {books.map((book) => (
        <TouchableOpacity
          key={book.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => onPressBook(book)}
        >
          <View style={[styles.cover, { backgroundColor: book.color }]}>
            <Text style={styles.coverEmoji}>📘</Text>
          </View>
          <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
          <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
          <Text style={styles.price}>{book.price.toLocaleString('vi-VN')}đ</Text>
        </TouchableOpacity>
      ))}
      {books.length === 0 && (
        <Text style={styles.empty}>Không có sách trong danh mục này.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    gap: 12,
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    marginBottom: 4,
    // đổ bóng nhẹ cho card
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cover: {
    width: '100%',
    aspectRatio: 3 / 4, // giữ tỉ lệ bìa sách
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  coverEmoji: { fontSize: 36 },
  title: { fontSize: 14, fontWeight: '700', color: '#222' },
  author: { fontSize: 12, color: '#777', marginTop: 2 },
  price: { fontSize: 14, fontWeight: '700', color: '#E63946', marginTop: 4 },
  empty: { width: '100%', textAlign: 'center', color: '#888', marginTop: 20 },
});
