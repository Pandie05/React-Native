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

import type { SearchStackParams, LibraryStackParams } from '@/types/navigation';

const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator<SearchStackParams>();
const LibraryStack = createNativeStackNavigator<LibraryStackParams>();

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <SearchStack.Screen
        name="Results"
        component={ResultsScreen}
        
        options={({ route }) => ({ title: `Results: ${route.params.q}` })}
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
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
      <LibraryStack.Screen name="Playlists" component={PlaylistsScreen} options={{ title: 'Playlists' }} />
      <LibraryStack.Screen name="PlaylistDetails" component={PlaylistDetailsScreen} options={{ title: 'Playlist' }} />
      {/* 👇 Add TrackDetails here so Favorites/Playlists can navigate to it */}
      <LibraryStack.Screen
        name="TrackDetails"
        component={TrackDetailsScreen}
        options={{ headerTransparent: true, title: '' }}
      />
      <LibraryStack.Screen
        name="CreatePlaylistModal"
        component={CreatePlaylistModal}
        options={{ presentation: 'modal', title: 'New Playlist' }}
      />
    </LibraryStack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="SearchTab" component={SearchStackNavigator} options={{ tabBarLabel: 'Search' }} />
      <Tab.Screen name="LibraryTab" component={LibraryStackNavigator} options={{ tabBarLabel: 'Library' }} />
    </Tab.Navigator>
  );
}
