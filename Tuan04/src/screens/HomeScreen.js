import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import CategoryChips from '../components/CategoryChips';
import BookGrid from '../components/BookGrid';
import FloatingCartButton from '../components/FloatingCartButton';
import TabBar from '../components/TabBar';
import { BOOKS } from '../data/books';

// CẤU TRÚC (đúng yêu cầu đề bài):
// SafeAreaView (flex:1)
//   > Header                (cố định, KHÔNG nằm trong ScrollView)
//   > View flex:1 (vùng nội dung)
//       > ScrollView (flex:1, chứa Chips + Grid)
//       > FloatingCartButton (absolute, cùng cấp với ScrollView, KHÔNG ở trong nó)
//   > TabBar                (cố định dưới cùng, dùng chung cho toàn app)
export default function HomeScreen({ cartCount, onPressBook, onPressCart, activeTab, onChangeTab }) {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredBooks = useMemo(() => {
    if (selectedCategory === 'Tất cả') return BOOKS;
    return BOOKS.filter((b) => b.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="BookStore" cartCount={cartCount} />

      <View style={styles.content}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          // paddingBottom đủ lớn để Grid không bị Floating Button che mất phần tử cuối
          contentContainerStyle={styles.scrollContent}
        >
          <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />
          <BookGrid books={filteredBooks} onPressBook={onPressBook} />
        </ScrollView>

        <FloatingCartButton count={cartCount} onPress={onPressCart} />
      </View>

      <TabBar active={activeTab} onChangeTab={onChangeTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 90 }, // chừa chỗ cho Floating Button (56px + margin)
});
