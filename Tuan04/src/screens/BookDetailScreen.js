import React from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

// CẤU TRÚC (đúng yêu cầu đề bài):
// SafeAreaView (flex:1)
//   > TouchableOpacity "Quay lại" (cố định, không cuộn)
//   > ScrollView (flex:1) — chứa ảnh bìa (center) + tên/tác giả/giá/mô tả dài
//   > View thanh "Thêm vào giỏ" (cố định dưới cùng, KHÔNG nằm trong ScrollView)
export default function BookDetailScreen({ book, onBack, onAddToCart }) {
  if (!book) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity style={styles.backRow} onPress={onBack}>
        <Text style={styles.backText}>‹ Quay lại</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Ảnh bìa lớn, căn giữa, giữ tỉ lệ bằng aspectRatio */}
        <View style={[styles.cover, { backgroundColor: book.color }]}>
          <Text style={styles.coverEmoji}>📘</Text>
        </View>

        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Tác giả: {book.author}</Text>
        <Text style={styles.price}>{book.price.toLocaleString('vi-VN')}đ</Text>

        <Text style={styles.sectionTitle}>Mô tả</Text>
        <Text style={styles.description}>{book.description}</Text>
        {/* lặp lại để mô phỏng mô tả dài, kiểm tra ScrollView hoạt động đúng */}
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      {/* Thanh dưới cùng: cố định, KHÔNG cuộn theo nội dung */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Giá</Text>
          <Text style={styles.bottomPrice}>{book.price.toLocaleString('vi-VN')}đ</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => onAddToCart(book)}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  backRow: { paddingHorizontal: 16, paddingVertical: 12 },
  backText: { fontSize: 16, color: '#1D3557', fontWeight: '600' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 24 },
  cover: {
    alignSelf: 'center', // căn giữa theo chiều ngang
    width: '60%',
    aspectRatio: 3 / 4, // giữ tỉ lệ bìa sách
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  coverEmoji: { fontSize: 56 },
  title: { fontSize: 22, fontWeight: '800', color: '#222' },
  author: { fontSize: 14, color: '#777', marginTop: 4 },
  price: { fontSize: 20, fontWeight: '700', color: '#E63946', marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 20, marginBottom: 6, color: '#222' },
  description: { fontSize: 14, color: '#444', lineHeight: 21, marginBottom: 10 },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#fff',
  },
  bottomLabel: { fontSize: 12, color: '#888' },
  bottomPrice: { fontSize: 18, fontWeight: '800', color: '#E63946' },
  addButton: {
    backgroundColor: '#1D3557',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
