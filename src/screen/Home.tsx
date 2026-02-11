import React from 'react';
import { View, Button, StyleSheet, FlatList, Text } from 'react-native';
import Contact from '../components/contact';

const list_contact = [
  { id: '1', name: 'Hugo Déchaux', phone: '06 11 22 33 44' },
  { id: '2', name: 'Lebron James', phone: '07 99 88 77 66' },
  { id: '3', name: 'Freeze Corleone', phone: '06 00 00 00 01' },
];

const HomeScreen = () => {
  return (
    <>
      <Text style={styles.rowText}>Liste de contacts</Text>
      <FlatList
        style={styles.screen}
        data={list_contact}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Contact
            name={item.name}
            phone={item.phone}
            onPress={() => {
              console.log('Prénom: ', item.name);
            }}
          />
        )}
      />

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Ajouter un contact" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  screen: {
    marginTop: 30,
  },
  row: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  rowText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    top: 10,
  },
});

export default HomeScreen;
