import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddContact({ navigation }: any) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const saveContact = async () => {
    if (!name || !phone) {
      Alert.alert('Erreur', 'Remplis tous les champs !');
      return;
    }
    const newContact = { id: Date.now().toString(), name, phone };
    const stored = await AsyncStorage.getItem('contacts');
    const contacts = stored ? JSON.parse(stored) : [];
    await AsyncStorage.setItem('contacts', JSON.stringify([...contacts, newContact]));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>Nouveau Contact</Text>
        <TextInput 
          placeholder="Nom complet" 
          style={styles.input} 
          onChangeText={setName} 
        />
        <TextInput 
          placeholder="Téléphone" 
          style={styles.input} 
          keyboardType="phone-pad" 
          onChangeText={setPhone} 
        />
        <TouchableOpacity style={styles.button} onPress={saveContact}>
          <Text style={styles.buttonText}>Ajouter au répertoire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F2F5' },
  formCard: { width: '85%', padding: 25, backgroundColor: '#FFF', borderRadius: 15, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { borderBottomWidth: 1, borderBottomColor: '#DDD', marginBottom: 20, padding: 10, fontSize: 16 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});