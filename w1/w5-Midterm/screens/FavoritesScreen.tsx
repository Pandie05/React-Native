import React from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigation } from "@react-navigation/native";
import { formatPrice } from "../utils/format";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const navigation = useNavigation<any>();

  const openDetail = (url: string) => {
    navigation.navigate("ScannerTab", {
      screen: "ProductDetail",
      params: { url },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={
          favorites.length
            ? { padding: 12, gap: 12 }
            : { flex: 1, justifyContent: "center", alignItems: "center" }
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => openDetail(item.url)} style={styles.card}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.thumb} />
            ) : (
              <View style={[styles.thumb, { justifyContent: "center", alignItems: "center" }]}>
                <Text style={{ color: "#888" }}>No Img</Text>
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={styles.title}>
                {item.title ?? "Untitled"}
              </Text>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#666" }}>
            No favorites yet. Scan a product and tap the heart.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  card: {
    flexDirection: "row",
    gap: 16,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#EEE",
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
    color: "#111",
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF", // accent blue
  },
});
