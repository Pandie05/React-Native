import React from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type props = NativeStackScreenProps<RootStackParamList, 'PhotoDetail'>;

const PhotoDetailScreen: React.FC<props> = ({ route, navigation }) => {
  const { photoUrl } = route.params;

    return (
        <View style={styles.container}>
            <Pressable 
                onPress={() => navigation.navigate('FullScreenModal', { photoUrl })}
                style={styles.imageContainer}
            >
                <Image source={{ uri: photoUrl }} style={styles.image} />
            </Pressable>
            <Text style={styles.instructions}>Tap the image to view full screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    imageContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '80%',
        resizeMode: 'contain',
        borderRadius: 12,
    },
    instructions: {
        fontSize: 16,
        color: '#fff',
        marginTop: 16,
        textAlign: 'center',
    },
});

export default PhotoDetailScreen;