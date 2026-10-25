import { FlatList, Text, View } from "react-native";
import { PHONES } from "../data/phones";
import { useFavorites } from "./FavoritesContext";
import { ProductRow } from "./ProductsTab";
import type { TabProps } from "./types";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const savedPhones = PHONES.filter((p) => ids.includes(p.id));

  if (savedPhones.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={savedPhones}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
    />
  );
}
