import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// QUAN TRỌNG: component này phải là con của View NGOÀI CÙNG (song song với
// ScrollView), KHÔNG đặt bên trong ScrollView — nếu không nó sẽ cuộn theo
// nội dung thay vì đứng yên (nổi) trên màn hình.
export default function FloatingCartButton({ count = 0, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.icon}>🛍️</Text>
      {count > 0 && (
        <>
          <Text style={styles.count}>{count}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 24, // sẽ được đẩy lên thêm nếu có TabBar (xem HomeScreen)
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  icon: { fontSize: 24 },
  count: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#1D3557',
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    textAlign: 'center',
    lineHeight: 18,
    overflow: 'hidden',
  },
});
