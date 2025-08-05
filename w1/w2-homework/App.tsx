import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, FlatList, Image, View, Dimensions } from 'react-native';

const numColumns = 3;
const size = Dimensions.get('window').width / numColumns;

const imageURL: string[] = [];
for (let i = 1; i <= 50; i++) {
  imageURL.push(`https://picsum.photos/200/300?random=${i}`);
}

export default function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredImages, setFilteredImages] = useState(imageURL);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text) {
      const filtered = imageURL.filter((url) =>
        url.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredImages(filtered);
    } else {
      setFilteredImages(imageURL);
    }
  }

  const renderItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={{ width: size, height: size }} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
        style={{ width: '100%', padding: 12, color: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 4 }}
      />
      <FlatList
        data={filteredImages}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
}

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
    marginBottom: 18,
    color: '#fff',
    backgroundColor: '#222',
    fontSize: 16,
  },
  item: {
    flex: 1,
    margin: 4,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: size - 8,
    height: size - 8,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
