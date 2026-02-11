import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Contact from '../components/contact';

// Définition du type pour un contact
interface ContactType {
  id: string;
  name: string;
  phone: string;
}

const HomeScreen = ({ navigation }: any) => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const isFocused = useIsFocused(); 

  // Charger les contacts depuis le stockage local
  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('contacts');
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      } else {
        setContacts([]); // Sécurité si le stockage est vide
      }
    } catch (error) {
      console.error("Erreur lors du chargement des contacts", error);
    }
  };

  // Se déclenche à chaque fois que l'écran est affiché (Focus)
  useEffect(() => {
    if (isFocused) {
      loadContacts();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.rowText}>Liste de contacts</Text>
      
      <FlatList
        style={styles.screen}
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          // Wrapper pour aligner le composant Contact et le bouton Détails
          <View style={styles.itemWrapper}>
            <View style={{ flex: 1 }}>
              <Contact
                name={item.name}
                phone={item.phone}
                onPress={() => {
                   navigation.navigate('Détail contact', { contact: item });
                }}
              />
            </View>
            <Button 
              title="Détails" 
              onPress={() => navigation.navigate('Détail contact', { contact: item })} 
            />
          </View>
        )}
        // Affichage si la liste est vide
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun contact enregistré.</Text>
        }
      />

      <View style={styles.buttonContainer}>
        <Button 
          title="Ajouter un contact" 
          onPress={() => navigation.navigate('AddContact')} 
        />
      </View>
    </View>
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
    marginTop: 20,
  },
  rowText: {
    fontSize: 18, 
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  itemWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
  },
  emptyText: {
    textAlign: 'center', 
    marginTop: 50,
    color: '#888',
    fontSize: 16
  }
});

export default HomeScreen;