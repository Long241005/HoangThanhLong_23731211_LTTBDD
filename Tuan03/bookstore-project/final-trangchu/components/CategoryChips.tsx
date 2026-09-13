// components/CategoryChips.tsx
// Bài tập 1 - Giờ 2: Danh sách danh mục dạng chip (Category Chips)
//
// Yêu cầu:
//  - Container: flexDirection 'row', flexWrap 'wrap', gap 8
//  - Mỗi chip: paddingHorizontal, paddingVertical, borderRadius lớn (pill),
//    border 1px màu indigo
//  - So sánh có/không alignContent: 'flex-start'
//  - width mỗi chip để 'auto' theo nội dung (KHÔNG set cố định)

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CATEGORIES, Category } from '../data';

interface CategoryChipsProps {
  onSelect?: (category: Category) => void;
}

export function CategoryChips({ onSelect }: CategoryChipsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handlePress = (category: Category) => {
    setSelectedId(category.id);
    onSelect?.(category);
  };

  return (
    <View style={styles.container}>
      {CATEGORIES.map((category) => {
        const isSelected = category.id === selectedId;
        return (
          <TouchableOpacity
            key={category.id}
            onPress={() => handlePress(category)}
            style={[styles.chip, isSelected && styles.chipSelected]}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    // Thử bật/tắt dòng dưới để so sánh cách các dòng xếp khi flexWrap tạo nhiều hàng:
    alignContent: 'flex-start',
  },
  chip: {
    // KHÔNG set width cố định — để chip tự co theo nội dung chữ bên trong
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999, // borderRadius lớn hơn nửa chiều cao -> dạng "pill"
    borderWidth: 1,
    borderColor: '#312E81',
    backgroundColor: '#FFFFFF',
  },
  chipSelected: {
    backgroundColor: '#312E81',
  },
  chipText: {
    fontSize: 13,
    color: '#312E81',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});
