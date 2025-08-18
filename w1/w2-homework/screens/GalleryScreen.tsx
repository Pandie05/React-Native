import React, { useState } from "react";
import { View, TextInput, FlatList, Image, StyleSheet, Pressable, Dimensions} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

const numColumns = 3;
const size = Dimensions.get("window").width / numColumns;

const imageURl: string[] = [];
for (let i = 1; i <= 50; i++) {
  imageURl.push(`https://picsum.photos/200/300?random=${i}`);
}

type GalleryScreenProps = NativeStackScreenProps<RootStackParamList, "Gallery">;

const GalleryScreen: React.FC<GalleryScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredImages, setFilteredImages] = useState(imageURl);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setFilteredImages(
        imageURl.filter((image) =>
          image.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredImages(imageURl);
    }
  };

  const renderItem = ({ item }: { item: string }) => (
    <Pressable
      onPress={() => navigation.navigate("PhotoDetail", { photoUrl: item })}
      style={styles.item}
    >
      <Image source={{ uri: item }} style={styles.image} />
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#666"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredImages}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={numColumns}
      />
    </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 32,
        paddingHorizontal: 12,
    },
    searchInput: {
        width: '100%',
        padding: 14,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        backgroundColor: '#1e1e1e',
        color: '#fff',
        marginBottom: 12,
    },
    image: {
        width: size - 8,
        height: size - 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 8,
    },
    item: {
        flex: 1,
        margin: 4,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default GalleryScreen;