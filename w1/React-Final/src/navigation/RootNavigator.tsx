import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchScreen } from '@/screens/SearchScreen';
import { ResultsScreen } from '@/screens/ResultsScreen';
import { TrackDetailsScreen } from '@/screens/TrackDetailsScreen';
import { FavoritesScreen } from '@/screens/FavoritesScreen';
import { PlaylistsScreen } from '@/screens/PlaylistsScreen';
import { PlaylistDetailsScreen } from '@/screens/PlaylistDetailsScreen';
import { MiniPlayerModal } from '@/modals/MiniPlayerModal';
import { CreatePlaylistModal } from '@/modals/CreatePlaylistModal';
import { SearchStackParams, LibraryStackParams } from '@/types/navigation';
import { useColorScheme, Text } from 'react-native';
import { theme } from '@/theme';

const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator<SearchStackParams>();
const LibraryStack = createNativeStackNavigator<LibraryStackParams>();

function TabLabel({ label }: { label: string }) {
  return <Text style={{ fontSize: 12, fontWeight: '700' }}>{label}</Text>;
}

function SearchStackNavigator() {
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: t.bg },
        headerTitleStyle: { fontWeight: '800' }
      }}
    >
      <SearchStack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <SearchStack.Screen
        name="Results"
        component={ResultsScreen}
        options={({ route }: { route: { params: { q: string } } }) => ({ title: `Results: ${route.params.q}` })}
      />
      <SearchStack.Screen
        name="TrackDetails"
        component={TrackDetailsScreen}
        options={{ headerTransparent: true, title: '' }}
      />
      <SearchStack.Screen
        name="MiniPlayerModal"
        component={MiniPlayerModal}
        options={{ presentation: 'modal', title: 'Now Playing' }}
      />
    </SearchStack.Navigator>
  );
}

function LibraryStackNavigator() {
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  return (
    <LibraryStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: t.bg },
        headerTitleStyle: { fontWeight: '800' }
      }}
    >
      <LibraryStack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
      <LibraryStack.Screen name="Playlists" component={PlaylistsScreen} options={{ title: 'Playlists' }} />
      <LibraryStack.Screen name="PlaylistDetails" component={PlaylistDetailsScreen} options={{ title: 'Playlist' }} />
      <LibraryStack.Screen
        name="CreatePlaylistModal"
        component={CreatePlaylistModal}
        options={{ presentation: 'modal', title: 'New Playlist' }}
      />
    </LibraryStack.Navigator>
  );
}

export function RootNavigator() {
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.shared.primary,
        tabBarInactiveTintColor: t.muted,
        tabBarStyle: {
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: t.card,
          borderTopColor: t.border
        }
      }}
    >
      <Tab.Screen
        name="SearchTab"
        component={SearchStackNavigator}
        options={{ tabBarLabel: () => <TabLabel label="Search" /> }}
      />
      <Tab.Screen
        name="LibraryTab"
        component={LibraryStackNavigator}
        options={{ tabBarLabel: () => <TabLabel label="Library" /> }}
      />
    </Tab.Navigator>
  );
}
