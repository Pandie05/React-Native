import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

type ContactCardProps = {
  name: string;
};

const ContactCard: React.FC<ContactCardProps> = ({ name }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/totoro.gif')} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ContactCard;
