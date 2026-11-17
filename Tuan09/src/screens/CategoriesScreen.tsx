import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { getErrorMessage } from "../api/client";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import type { TabScreenProps } from "../navigation/types";
import { getCategories } from "../services/categoryService";
import type { Category } from "../types";

export function CategoriesScreen({ navigation }: TabScreenProps<"Categories">) {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCategories();
      setData(res);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <LoadingView label="Đang tải danh mục…" />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh mục</Text>
      <Text style={styles.hint}>Bấm một danh mục để về Home và lọc theo danh mục đó.</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => navigation.navigate("Home", { categoryId: item.id })}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: { color: "#9CA3AF", fontSize: 22 },
  container: { backgroundColor: "#F4F6FB", flex: 1 },
  emoji: { fontSize: 22 },
  hint: { color: "#6B7280", paddingHorizontal: 16, paddingBottom: 8 },
  name: { flex: 1, fontSize: 16, fontWeight: "700", marginLeft: 12 },
  row: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    marginBottom: 10,
    padding: 16,
  },
  title: { color: "#0B1F5C", fontSize: 22, fontWeight: "800", padding: 16, paddingBottom: 6 },
});
