// components/BookGrid.tsx
// Bài tập 2 - Giờ 2: Lưới sản phẩm 2 cột (Book Grid) — chỉ dùng flexbox thuần,
// CHƯA dùng FlatList/numColumns.
//
// Yêu cầu:
//  - Container ngoài: flexDirection 'row', flexWrap 'wrap',
//    justifyContent 'space-between'
//  - Mỗi item: width '48%' (chừa khoảng trống giữa 2 cột), marginBottom
//  - Ảnh bìa trong item: width '100%', aspectRatio cố định (3/4) thay vì
//    height cố định

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from '../data';

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  return (
    <View style={styles.grid}>
      {books.map((book) => (
        <View key={book.id} style={styles.item}>
          <Image source={{ uri: book.cover }} style={styles.cover} />
          <Text style={styles.title} numberOfLines={1}>
            {book.title}
          </Text>
          <Text style={styles.price}>{book.price.toLocaleString('vi-VN')} đ</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // Vì dùng width: '48%' + space-between, KHÔNG cần gap ở đây
    // (nếu RN mới dùng được gap, có thể đổi sang width: '47%' + gap: 12)
  },
  item: {
    width: '48%', // 2 item / hàng, chừa ~4% ở giữa làm khoảng cách
    marginBottom: 16,
  },
  cover: {
    width: '100%',
    aspectRatio: 3 / 4, // giữ tỉ lệ ảnh dù width thay đổi theo %
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  title: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: '#312E81',
    marginTop: 2,
  },
});
