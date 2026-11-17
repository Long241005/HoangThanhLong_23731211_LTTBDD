import { FlatList, RefreshControl, type ListRenderItemInfo } from "react-native";
import type { Book } from "../types";
import { BookCard } from "./BookCard";

interface Props {
  data: Book[];
  onPressBook: (book: Book) => void;
  ListEmptyComponent?: React.ReactElement | null;
  ListHeaderComponent?: React.ReactElement | null;
  // Bài 9.6: kéo-để-làm-mới ở Home.
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function BookGrid({
  data,
  onPressBook,
  ListEmptyComponent,
  ListHeaderComponent,
  refreshing,
  onRefresh,
}: Props) {
  const renderItem = ({ item }: ListRenderItemInfo<Book>) => (
    <BookCard book={item} onPress={() => onPressBook(item)} />
  );
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={{ padding: 6, paddingBottom: 90 }}
      refreshControl={
        onRefresh ? <RefreshControl refreshing={refreshing ?? false} onRefresh={onRefresh} /> : undefined
      }
    />
  );
}
