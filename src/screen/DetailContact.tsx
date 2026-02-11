import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({ route, navigation }: any) => {
  // On récupère l'objet contact passé en paramètre
  const { contact } = route.params;

  const deleteContact = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('contacts');
      if (storedContacts) {
        const contacts = JSON.parse(storedContacts);
        
        // On filtre pour garder tous les contacts SAUF celui-ci
        const filteredContacts = contacts.filter((c: any) => c.id !== contact.id);
        
        await AsyncStorage.setItem('contacts', JSON.stringify(filteredContacts));
        
        Alert.alert("Supprimé", "Le contact a été retiré.");
        navigation.goBack(); // Retourne à Home automatiquement
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de supprimer le contact.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.value}>{contact.name}</Text>
        
        <Text style={styles.label}>Téléphone :</Text>
        <Text style={styles.value}>{contact.phone}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <Button title="Supprimer ce contact" color="red" onPress={deleteContact} />
        <View style={{ marginTop: 10 }}>
          <Button title="Retour" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 3, marginBottom: 30 },
  label: { fontSize: 14, color: '#888', marginTop: 10 },
  value: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  buttonGroup: { width: '100%' }
});

export default Details;