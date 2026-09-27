import React from 'react';
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import TabBar from '../components/TabBar';

function CartRow({ item, onRemove }) {
  return (
    <View style={styles.row}>
      {/* ảnh nhỏ: kích thước cố định */}
      <View style={[styles.thumb, { backgroundColor: item.color }]}>
        <Text style={styles.thumbEmoji}>📘</Text>
      </View>
      {/* tên sách: flex:1 để chiếm phần còn lại */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.qty}>Số lượng: {item.qty}</Text>
      </View>
      {/* giá: width cố định, căn phải */}
      <View style={styles.priceBox}>
        <Text style={styles.price}>{(item.price * item.qty).toLocaleString('vi-VN')}đ</Text>
        <TouchableOpacity onPress={() => onRemove(item.id)}>
          <Text style={styles.remove}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 3 vùng không chồng lấp:
// 1) ScrollView (flex:1) — danh sách sản phẩm, cuộn được
// 2) View tổng tiền + nút Thanh toán — cố định, KHÔNG cuộn
// 3) TabBar — cố định dưới cùng
export default function CartScreen({ cartItems, onRemove, activeTab, onChangeTab }) {
  const total = cartItems.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.header}>Giỏ hàng</Text>

      <View style={styles.content}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {cartItems.length === 0 ? (
            <Text style={styles.empty}>Giỏ hàng đang trống.</Text>
          ) : (
            cartItems.map((item) => (
              <CartRow key={item.id} item={item} onRemove={onRemove} />
            ))
          )}
        </ScrollView>

        {/* Tổng tiền + nút thanh toán: cố định, đứng ngay trên Tab Bar */}
        <View style={styles.summaryBar}>
          <View>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>{total.toLocaleString('vi-VN')}đ</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TabBar active={activeTab} onChangeTab={onChangeTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    fontSize: 20,
    fontWeight: '800',
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: '#222',
    backgroundColor: '#fff',
  },
  content: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 10 },
  empty: { textAlign: 'center', color: '#888', marginTop: 30 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  thumbEmoji: { fontSize: 20 },
  info: { flex: 1, marginRight: 8 }, // flex:1 để chiếm phần còn lại
  name: { fontSize: 14, fontWeight: '700', color: '#222' },
  qty: { fontSize: 12, color: '#888', marginTop: 2 },
  priceBox: { width: 90, alignItems: 'flex-end' }, // width cố định
  price: { fontSize: 13, fontWeight: '700', color: '#E63946' },
  remove: { fontSize: 12, color: '#999', marginTop: 4 },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  totalLabel: { fontSize: 12, color: '#888' },
  totalValue: { fontSize: 18, fontWeight: '800', color: '#E63946' },
  checkoutButton: {
    backgroundColor: '#1D3557',
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
