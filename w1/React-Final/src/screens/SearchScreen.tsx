import React, { useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParams } from '../types/navigation';
import { Button, StyleSheet, TextInput, View, Text, ScrollView, Pressable, useColorScheme } from 'react-native';
import { debounce } from '../debounce';
import { theme } from '../theme';

const quickPicks = ['Taylor Swift', 'Bad Bunny', 'Drake', 'Ariana Grande'];

type Props = NativeStackScreenProps<SearchStackParams, 'Search'>;
export function SearchScreen({ navigation }: Props) {
  const [term, setTerm] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const debounced = useMemo(() => debounce((t: string) => setSuggestion(t), 400), []);
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  function onChange(ti: string) {
    setTerm(ti);
    debounced(ti);
  }

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      <Text style={[styles.title, { color: t.text }]}>Search Music</Text>
      <TextInput
        value={term}
        onChangeText={onChange}
        placeholder="Search songs or artists"
        placeholderTextColor={t.muted}
        style={[
          styles.input,
          { borderColor: t.border, color: t.text, backgroundColor: t.card }
        ]}
        returnKeyType="search"
        onSubmitEditing={() => term.trim() && navigation.navigate('Results', { q: term.trim() })}
      />

      <Pressable
        style={({ pressed }) => [
          styles.primary,
          { opacity: pressed ? 0.9 : 1, backgroundColor: theme.shared.primary }
        ]}
        onPress={() => term.trim() && navigation.navigate('Results', { q: term.trim() })}
      >
        <Text style={styles.primaryText}>Search</Text>
      </Pressable>

      {!!suggestion && suggestion.length > 2 && (
        <Text style={{ color: t.muted }}>
          Searching for: <Text style={{ fontWeight: '800', color: t.text }}>{suggestion}</Text>
        </Text>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pills} contentContainerStyle={{ gap: 8 }}>
        {quickPicks.map((q) => (
          <Pressable
            key={q}
            style={({ pressed }) => [
              styles.pill,
              { borderColor: t.border, backgroundColor: t.card, opacity: pressed ? 0.85 : 1 }
            ]}
            onPress={() => navigation.navigate('Results', { q })}
          >
            <Text style={{ color: t.text }}>{q}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.shared.spacing(2), gap: theme.shared.spacing(2) },
  title: { fontSize: 28, fontWeight: '900', letterSpacing: 0.3 },
  input: {
    borderWidth: 1,
    borderRadius: theme.shared.radius,
    paddingHorizontal: theme.shared.spacing(2),
    paddingVertical: theme.shared.spacing(1.25),
    fontSize: 16
  },
  primary: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12
  },
  primaryText: { color: 'white', fontWeight: '800' },
  pills: { marginTop: theme.shared.spacing(1) },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1
  }
});
