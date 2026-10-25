import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PHONES } from "../data/phones";
import { PHONE_COLORS } from "../data/phones";
import { formatPrice } from "../theme";
import { colors } from "../theme";
import type { Phone } from "../types";
import type { TabProps } from "./types";

export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={s.row}>
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={s.thumb}
        resizeMode="contain"
      />
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={s.name}>{phone.name.split(" - ")[0]}</Text>
        <Text style={s.price}>{formatPrice(phone.price)}</Text>
      </View>
    </Pressable>
  );
}

export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <FlatList
      data={PHONES}
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

const s = StyleSheet.create({
  row: {
    flexDirection: "row", alignItems: "center", gap: 12,
    padding: 12, borderRadius: 8, borderWidth: 1,
    borderColor: colors.line, backgroundColor: "#fff",
  },
  thumb: { width: 60, height: 60 },
  name: { fontWeight: "600" },
  price: { color: colors.red, fontWeight: "bold" },
});
