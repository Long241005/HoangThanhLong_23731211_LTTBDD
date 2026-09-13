// components/FloatingCartButton.tsx
// Bài tập 2 - Giờ 3: Nút giỏ hàng nổi (Floating Cart Button)
//
// Yêu cầu:
//  - Nút chính: position 'absolute', bottom 24, right 20,
//    width = height + borderRadius = width/2 -> hình tròn
//  - Số lượng sản phẩm: 1 View nhỏ position 'absolute' ở góc trên-phải
//    của CHÍNH nút tròn đó (containing block LỒNG NHAU)
//  - Container ngoài cùng của màn hình cần flex: 1 và position 'relative'
//    (hoặc mặc định) để nút định vị theo toàn màn hình

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BUTTON_SIZE = 56;

interface FloatingCartButtonProps {
  count: number;
  onPress?: () => void;
}

export function FloatingCartButton({ count, onPress }: FloatingCartButtonProps) {
  return (
    // Nút tròn này chính nó cũng là 1 containing block (vì position: 'absolute'
    // vẫn thiết lập 1 block layout riêng) -> badge số lượng định vị theo nó
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
      <Ionicons name="cart" size={22} color="#FFFFFF" />

      {count > 0 && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count > 99 ? '99+' : count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2, // width/2 -> hình tròn hoàn hảo
    backgroundColor: '#4F46E5', // indigo-600
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  countBadge: {
    position: 'absolute',
    top: -4,
    right: -4, // góc trên-phải của nút tròn (containing block lồng nhau)
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 4,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
