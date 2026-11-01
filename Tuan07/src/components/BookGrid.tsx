import { FlatList, type ListRenderItemInfo } from "react-native";
import type { Book } from "../types";
import { BookCard } from "./BookCard";

interface Props {
  data: Book[];
  onPressBook: (book: Book) => void;
  ListEmptyComponent?: React.ReactElement | null;
  ListHeaderComponent?: React.ReactElement | null;
}

export function BookGrid({ data, onPressBook, ListEmptyComponent, ListHeaderComponent }: Props) {
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
    />
  );
}
