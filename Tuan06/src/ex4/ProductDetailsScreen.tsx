import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PHONES } from "../data/phones";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {
    return <Text>Không tìm thấy sản phẩm #{id}</Text>;
  }

  const saved = has(phone.id);

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={s.image}
        resizeMode="contain"
      />
      <Text style={s.name}>{phone.name}</Text>
      <Stars value={phone.rating} />
      <Text style={s.price}>{formatPrice(phone.price)}</Text>
      <Text>Cung cấp bởi {phone.supplier}</Text>
      <Pressable onPress={() => toggle(phone.id)} style={s.saveBtn}>
        <Text style={s.saveText}>{saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  image: { width: "100%", height: 280 },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { fontWeight: "bold", color: colors.red, fontSize: 18 },
  saveBtn: {
    borderWidth: 1, borderColor: colors.line,
    borderRadius: 6, paddingVertical: 12, alignItems: "center",
  },
  saveText: { fontWeight: "bold" },
});
