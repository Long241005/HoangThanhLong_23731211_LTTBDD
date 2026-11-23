import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation";
import { BOOKS } from "../data/books";
import BookCard from "../components/BookCard";
import { useAppSelector } from "../store/hooks";
import { selectFavoriteIds } from "../store/favoritesSlice";
import { colors } from "../theme";

export default function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const ids = useAppSelector(selectFavoriteIds);
  const favorites = BOOKS.filter((b) => ids.includes(b.id));
  const onSelect = useCallback(
    (id: string) => navigation.navigate("Detail", { id }),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <FlatList
        data={favorites}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: 14 }}
        renderItem={({ item }) => (
          <BookCard book={item} layout="row" onSelect={onSelect} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Chưa có sách yêu thích.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  empty: { color: colors.muted, textAlign: "center", padding: 16 },
});
