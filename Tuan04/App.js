import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import CartScreen from './src/screens/CartScreen';
import TabBar from './src/components/TabBar';

// Không dùng thư viện navigation thật (react-navigation, ...):
// việc chuyển màn hình ở đây chỉ là render có điều kiện dựa trên state,
// đúng tinh thần "chỉ dựng LAYOUT tĩnh" mà đề bài yêu cầu.
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null); // khác null => đang xem Detail
  const [cartItems, setCartItems] = useState([]);

  const cartCount = cartItems.reduce((sum, it) => sum + it.qty, 0);

  const handleAddToCart = (book) => {
    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === book.id);
      if (existing) {
        return prev.map((it) => (it.id === book.id ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { ...book, qty: 1 }];
    });
    setSelectedBook(null);
    setActiveTab('cart');
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleChangeTab = (tabKey) => {
    setSelectedBook(null);
    setActiveTab(tabKey);
  };

  // Đang xem chi tiết 1 cuốn sách => ưu tiên hiện Detail (không có TabBar,
  // giống app thật: màn Detail được "đẩy" lên trên, che Tab Bar)
  if (selectedBook) {
    return (
      <BookDetailScreen
        book={selectedBook}
        onBack={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
      />
    );
  }

  if (activeTab === 'home') {
    return (
      <HomeScreen
        cartCount={cartCount}
        onPressBook={setSelectedBook}
        onPressCart={() => setActiveTab('cart')}
        activeTab={activeTab}
        onChangeTab={handleChangeTab}
      />
    );
  }

  if (activeTab === 'cart') {
    return (
      <CartScreen
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
        activeTab={activeTab}
        onChangeTab={handleChangeTab}
      />
    );
  }

  // 'category' và 'account': chỉ demo layout tối giản, đề bài không yêu cầu
  // dựng chi tiết 2 màn hình này.
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          {activeTab === 'category' ? 'Màn hình Danh mục' : 'Màn hình Tài khoản'}
        </Text>
        <Text style={styles.placeholderSub}>(chưa yêu cầu trong bài tập tuần này)</Text>
      </View>
      <TabBar active={activeTab} onChangeTab={handleChangeTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { fontSize: 18, fontWeight: '700', color: '#333' },
  placeholderSub: { fontSize: 13, color: '#999', marginTop: 6 },
});
