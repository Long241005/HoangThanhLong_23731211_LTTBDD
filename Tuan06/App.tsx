import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { PHONES } from "./src/data/phones";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

type Ex = "menu" | "1" | "2" | "3" | "4" | "5";

export default function App() {
  const [ex, setEx] = useState<Ex>("menu");

  if (ex === "menu") {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 16, gap: 12 }}>
        <Pressable onPress={() => setEx("1")}><Text>Bài 1: Select Phone</Text></Pressable>
        <Pressable onPress={() => setEx("2")}><Text>Bài 2: Select Phone + API</Text></Pressable>
        <Pressable onPress={() => setEx("3")}><Text>Bài 3: Bottom Tab</Text></Pressable>
        <Pressable onPress={() => setEx("4")}><Text>Bài 4: Stack + Tab</Text></Pressable>
        <Pressable onPress={() => setEx("5")}><Text>Bài 5: Drawer</Text></Pressable>
      </View>
    );
  }

  const body =
    ex === "1" ? <SelectPhoneApp phone={PHONES[0]} />
    : ex === "2" ? <SelectPhoneApi />
    : ex === "3" ? <BottomTabApp />
    : ex === "4" ? <StackTabApp />
    : <DrawerApp />;

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={() => setEx("menu")} style={{ padding: 12 }}>
        <Text>← Menu</Text>
      </Pressable>
      {body}
    </View>
  );
}
