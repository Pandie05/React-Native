import React, { useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParams } from '@/types/navigation';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Pressable,
  useColorScheme,
} from 'react-native';
import { debounce } from '@/debounce';
import { theme } from '@/theme';

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

  const go = () => term.trim() && navigation.navigate('Results', { q: term.trim() });

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
          {
            borderColor: t.border,
            color: t.text,
            backgroundColor: t.card,
          },
        ]}
        returnKeyType="search"
        onSubmitEditing={go}
      />

      <Pressable
        style={({ pressed }) => [
          styles.primary,
          { opacity: pressed ? 0.9 : 1, backgroundColor: theme.shared.primary },
        ]}
        onPress={go}
      >
        <Text style={styles.primaryText}>Search</Text>
      </Pressable>

      {!!suggestion && suggestion.length > 2 && (
        <Text style={{ color: t.muted }}>
          Searching for: <Text style={{ fontWeight: '800', color: t.text }}>{suggestion}</Text>
        </Text>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pills}
        contentContainerStyle={{ gap: 8 }}
      >
        {quickPicks.map((q) => (
          <Pressable
            key={q}
            style={({ pressed }) => [
              styles.pill,
              {
                borderColor: t.border,
                backgroundColor: t.card,
                opacity: pressed ? 0.85 : 1,
              },
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
  container: { 
    flex: 1, 
    padding: theme.shared.spacing(2), 
    gap: theme.shared.spacing(2),
  },

  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    marginBottom: theme.shared.spacing(1) 
  },

  input: {
    borderWidth: 1,
    borderRadius: 999,               
    paddingHorizontal: 16,
    height: 44,                      
    fontSize: 16,
  },

  pills: { marginTop: theme.shared.spacing(1) },

  pill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
  },

  primary: {
    borderRadius: theme.shared.radius,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  primaryText: { color: '#fff', fontWeight: '700' },

  // legacy aliases
  searchBtn: {
    borderRadius: theme.shared.radius,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  searchBtnText: { color: '#fff', fontWeight: '700' },
});
