import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ContactList from './components/ContactList';

const CONTACTS = [
  {
    id: '1',
    name: 'Dennis',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '2',
    name: 'Kait',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '3',
    name: 'Ari',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '4',
    name: 'Max',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '5',
    name: 'Jayden',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '6',
    name: 'Diddy',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
];

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ContactList contacts={CONTACTS} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

 

export default App;