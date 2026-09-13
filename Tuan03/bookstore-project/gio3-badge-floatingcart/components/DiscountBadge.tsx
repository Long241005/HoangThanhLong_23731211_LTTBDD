// components/DiscountBadge.tsx
// Bài tập 1 - Giờ 3: Badge giảm giá / nhãn "Mới" nổi trên bìa sách
//
// Yêu cầu:
//  - View chứa ảnh bìa cần position: 'relative' để làm containing block
//  - Badge dùng position: 'absolute', top: 6, left: 6
//  - Badge nền màu nổi bật (đỏ/cam), borderRadius nhỏ, padding vừa đủ ôm chữ
//
// Lưu ý quan trọng (đúng như gợi ý trong đề):
// Nếu badge lệch vị trí -> kiểm tra View CHA của ảnh có bị thiếu
// position: 'relative' không. absolute luôn định vị theo ancestor GẦN NHẤT
// có position khác 'static'.

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from '../data';

interface DiscountBadgeCoverProps {
  book: Book;
}

export function DiscountBadgeCover({ book }: DiscountBadgeCoverProps) {
  const hasDiscount = !!book.discountPercent;
  const isNew = !!book.isNew;

  return (
    // containing block cho badge bên trong
    <View style={styles.coverWrapper}>
      <Image source={{ uri: book.cover }} style={styles.cover} />

      {hasDiscount && (
        <View style={[styles.badge, styles.badgeDiscount]}>
          <Text style={styles.badgeText}>-{book.discountPercent}%</Text>
        </View>
      )}

      {!hasDiscount && isNew && (
        <View style={[styles.badge, styles.badgeNew]}>
          <Text style={styles.badgeText}>Mới</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  coverWrapper: {
    position: 'relative', // BẮT BUỘC: làm containing block cho badge absolute
    width: '100%',
    aspectRatio: 3 / 4,
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgeDiscount: {
    backgroundColor: '#DC2626', // đỏ
  },
  badgeNew: {
    backgroundColor: '#F97316', // cam
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
