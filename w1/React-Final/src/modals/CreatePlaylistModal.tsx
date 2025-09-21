import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, useColorScheme } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LibraryStackParams } from '@/types/navigation';
import { loadPlaylists, savePlaylists, newPlaylist } from '@/storage/persistence';
import { theme } from '@/theme';

type Props = NativeStackScreenProps<LibraryStackParams, 'CreatePlaylistModal'>;
export function CreatePlaylistModal({ route, navigation }: Props) {
  const [name, setName] = useState('My Playlist');
  const initialTrack = route.params?.initialTrack;
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  async function create() {
    const lists = await loadPlaylists();
    const pl = newPlaylist(name.trim() || 'Untitled', initialTrack);
    await savePlaylists([pl, ...lists]);
    Alert.alert('Created', `Playlist "${pl.name}" created.`);
    navigation.goBack();
  }

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      <Text style={[styles.title, { color: t.text }]}>New Playlist</Text>
      <TextInput
        style={[styles.input, { borderColor: t.border, color: t.text, backgroundColor: t.card }]}
        value={name}
        onChangeText={setName}
        placeholder="Playlist name"
        placeholderTextColor={t.muted}
      />
      <Pressable style={[styles.btn, { backgroundColor: theme.shared.primary }]} onPress={create}>
        <Text style={styles.btnText}>Create</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.shared.spacing(2), gap: theme.shared.spacing(2) },
  title: { fontSize: 22, fontWeight: '900' },
  input: { borderWidth: 1, borderRadius: theme.shared.radius, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16 },
  btn: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, alignSelf: 'flex-start' },
  btnText: { color: 'white', fontWeight: '800' }
});
