import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

import { ColorKey, Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
const shown: ColorKey = picked ?? phone.defaultColor;


  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown as ColorKey].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.qCircle}>
            <Text style={styles.qText}>?</Text>
          </View>
        </View>

        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.arrow}>{">"}</Text>
        </Pressable>
      </View>

      <Pressable style={styles.buyBtn} onPress={() => {}}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  imageWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 300 },
  info: { gap: 8 },
  name: { fontSize: 16, fontWeight: "600", color: colors.text },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  review: { color: colors.muted },
  price: { fontSize: 20, fontWeight: "bold", color: colors.red },
  oldPrice: { color: colors.muted, textDecorationLine: "line-through" },
  badge: { fontSize: 12, color: colors.text },
  qCircle: {
    width: 20, height: 20, borderRadius: 10, borderWidth: 1,
    borderColor: colors.muted, justifyContent: "center", alignItems: "center",
  },
  qText: { fontSize: 12, color: colors.muted },
  chooseBtn: {
    borderWidth: 1, borderColor: "#B0B0B0", borderRadius: 6,
    paddingVertical: 12, paddingHorizontal: 16, marginTop: 8,
  },
  chooseText: { textAlign: "center", fontWeight: "600" },
  arrow: { position: "absolute", right: 12, top: 12 },
  buyBtn: {
    backgroundColor: colors.red, borderRadius: 6,
    paddingVertical: 14, alignItems: "center", marginVertical: 12,
  },
  buyText: { color: "#fff", fontWeight: "bold" },
});
