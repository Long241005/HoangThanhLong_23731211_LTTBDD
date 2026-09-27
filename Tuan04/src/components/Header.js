import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Header cố định phía trên, KHÔNG nằm trong ScrollView.
// Chỉ cần layout thường (không absolute) vì nó đứng cùng cấp,
// phía trên ScrollView trong một View cha flex:1 theo column.
export default function Header({ title = 'BookStore', cartCount = 0 }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.cartBadge}>
        <Text style={styles.cartIcon}>🛒</Text>
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1D3557',
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  cartBadge: { position: 'relative' },
  cartIcon: { fontSize: 22 },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#E63946',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
