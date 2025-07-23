import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactCard from './ContactCard';
import Search from './Search';

type Contact = {
  id: string;
  name: string;
  image?: string;
};

type ContactListProps = {
  contacts: Contact[];
};

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Search value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={filteredContacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactCard name={item.name} />
        )}
      />
    </View>
  );
};

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  searchIcon: {
    marginRight: 8,
    color: '#888',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default ContactList;