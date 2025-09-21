import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { PlayerProvider } from './src/context/PlayerContext';
import { theme as base } from './src/theme';

export default function App() {
  const scheme = useColorScheme();

  const navTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: scheme === 'dark' ? base.dark.bg : base.light.bg,
      card: scheme === 'dark' ? base.dark.card : base.light.card,
      text: scheme === 'dark' ? base.dark.text : base.light.text,
      border: scheme === 'dark' ? base.dark.border : base.light.border,
      primary: base.shared.primary
    }
  };

  return (
    <PlayerProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <RootNavigator />
      </NavigationContainer>
    </PlayerProvider>
  );
}
