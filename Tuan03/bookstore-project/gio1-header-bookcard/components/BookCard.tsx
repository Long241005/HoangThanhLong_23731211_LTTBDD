// components/BookCard.tsx
// Bài tập 2 - Giờ 1: Thẻ sách (Book Card) đơn
//
// Yêu cầu:
//  - Card ngoài: flexDirection 'row', alignItems 'flex-start' (so sánh với 'center')
//  - Ảnh bìa: width/height cố định (80x110), borderRadius
//  - Cột thông tin: flex: 1, flexDirection 'column'
//  - Giá tiền căn dưới cùng bằng justifyContent 'space-between' trên trục dọc
//  - Tên sách dài 2 dòng -> numberOfLines={2} để không phá layout

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from '../data';

interface BookCardProps {
  book: Book;
  // dùng để demo/so sánh 2 cách canh: 'flex-start' vs 'center'
  align?: 'flex-start' | 'center';
}

export function BookCard({ book, align = 'flex-start' }: BookCardProps) {
  return (
    <View style={[styles.card, { alignItems: align }]}>
      {/* Ảnh bìa: kích thước cố định, KHÔNG dùng flex */}
      <Image source={{ uri: book.cover }} style={styles.cover} />

      {/* Cột thông tin: chiếm hết phần không gian còn lại */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
        {/* Giá luôn bị đẩy xuống đáy cột nhờ info dùng justifyContent: space-between */}
        <Text style={styles.price}>{book.price.toLocaleString('vi-VN')} đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    // alignItems được truyền từ props để so sánh trực quan
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    // đổ bóng nhẹ cho card (không liên quan flexbox, chỉ cho đẹp)
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cover: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  info: {
    flex: 1, // chiếm hết không gian còn lại sau ảnh bìa
    flexDirection: 'column',
    justifyContent: 'space-between', // đẩy giá xuống đáy
    marginLeft: 12,
    height: 110, // bằng chiều cao ảnh để space-between có "chiều cao" để chia
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  author: {
    fontSize: 13,
    color: '#6B7280',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#312E81',
  },
});
