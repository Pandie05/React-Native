import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import type { ScannerStackParamList, FavoriteProduct } from "../../types/navigation";
import { useFavorites } from "../../context/FavoritesContext";
import { formatPrice } from "../../utils/format";

type Route = RouteProp<ScannerStackParamList, "ProductDetail">;
type Nav = StackNavigationProp<ScannerStackParamList, "ProductDetail">;

type Product = {
  id: number;
  title?: string;
  price?: number;
  images?: string[];
  thumbnail?: string;
};

export default function ProductDetailScreen() {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(params.url);
        const json: Product = await res.json();

        const coerced: Product = {
          ...json,
          title: json.title ?? "Untitled",
          price: Number(json.price),
          images: Array.isArray(json.images) ? json.images : [],
        };

        if (!cancelled) {
          setProduct(coerced);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [params.url]);

  const image = product?.images?.[0] ?? product?.thumbnail ?? "";

  const favPayload: FavoriteProduct | null = product
    ? {
        id: product.id,
        title: product.title ?? "Untitled",
        price: Number(product.price),
        image,
        url: params.url,
      }
    : null;

  useLayoutEffect(() => {
    if (!product || !favPayload) return;
    const fav = isFavorite(product.id);

    const safeTitle = product.title ?? "Untitled";
    const headerTitle = safeTitle.length > 24 ? safeTitle.slice(0, 24) + "…" : safeTitle;

    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => toggleFavorite(favPayload)}
          hitSlop={8}
          style={{ paddingHorizontal: 12 }}
        >
          <Ionicons
            name={fav ? "heart" : "heart-outline"}
            size={24}
            color={fav ? "crimson" : "black"}
          />
        </Pressable>
      ),
      headerTitle,
    });
  }, [navigation, product, favorites]);

  if (loading || !product) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Loading product…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!!image && <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />}
      <Text style={styles.title}>{product.title ?? "Untitled"}</Text>
      <Text style={styles.price}>{formatPrice(product.price)}</Text>

      <View style={styles.row}>
        <View style={[styles.cta, { backgroundColor: "#222" }]}>
          <Text style={styles.ctaText}>Buy now</Text>
        </View>
        <View style={[styles.cta, { backgroundColor: "#ffcc00" }]}>
          <Text style={[styles.ctaText, { color: "#222" }]}>Add to cart</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: { padding: 20, backgroundColor: "#F9F9F9" },
  image: {
    width: "100%",
    height: 320,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#111",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#007AFF", // iOS blue accent
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    gap: 16,
    marginTop: 12,
  },
  cta: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
});
