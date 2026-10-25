import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";

import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {picked && (
            <>
              <Text>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.bold}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>
        <Pressable
          style={styles.doneBtn}
          onPress={() =>
            navigation.navigate("Product", { color: picked }, { merge: true } as any)
          }
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", padding: 16, gap: 12, alignItems: "center" },
  thumb: { width: 80, height: 100 },
  headerText: { flex: 1, gap: 4 },
  small: { fontSize: 14 },
  bold: { fontWeight: "bold" },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16, gap: 12 },
  hint: { fontSize: 14 },
  swatches: { gap: 12 },
  swatch: { width: 80, height: 80 },
  swatchOn: { borderWidth: 3, borderColor: "#000" },
  doneBtn: {
    backgroundColor: colors.blue, borderRadius: 4,
    paddingVertical: 12, alignItems: "center", marginTop: 16,
  },
  doneText: { color: "#fff", fontWeight: "bold" },
});
