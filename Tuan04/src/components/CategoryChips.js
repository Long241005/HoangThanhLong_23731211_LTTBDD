import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/books';

// ScrollView ngang (horizontal) - không cần flex:1 vì chiều cao "auto" theo nội dung (1 hàng chip).
export default function CategoryChips({ selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {CATEGORIES.map((cat) => {
        const active = cat === selected;
        return (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(cat)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{cat}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: 12, paddingVertical: 12, gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EEE',
  },
  chipActive: { backgroundColor: '#1D3557' },
  chipText: { color: '#333', fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
});
