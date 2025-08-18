import React, { useState } from "react";
import { View, TextInput, FlatList, Image, StyleSheet, Pressable, Dimensions} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type props = NativeStackScreenProps<RootStackParamList, "FullScreenModal">;

const FullScreenModal: React.FC<props> = ({ route, navigation }) => {
  const { photoUrl } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUrl }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default FullScreenModal;