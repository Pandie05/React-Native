import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, StyleSheet } from 'react-native';
import GalleryScreen from './screens/GalleryScreen';
import PhotoDetailScreen from './screens/PhotoDetailScreen';
import FullScreenModal from './screens/FullScreenModal';
import { RootStackParamList } from './types/navigation';

const numColumns = 3;
const size = Dimensions.get('window').width / numColumns;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen 
          name="PhotoDetail" 
          component={PhotoDetailScreen} 
          options={({ route }: { route: { params: { photoUrl: string } } }) => ({ title: route.params.photoUrl })}
        />
        <Stack.Screen 
          name="FullScreenModal" 
          component={FullScreenModal} 
          options={{ 
            presentation: 'modal',
            headerStyle: { backgroundColor: '#121212' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
