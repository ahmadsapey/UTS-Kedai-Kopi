import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useStore } from '../context/StoreContext';

export default function PemasaranScreen({ navigation }) {
  const { addPromo } = useStore();
  const [kode, setKode] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [diskon, setDiskon] = useState('');

  const handleSubmit = () => {
    const promoKode = kode.trim();
    const promoDesk = deskripsi.trim();
    const promoDiskon = Number(diskon);

    if (!promoKode || !promoDesk || !Number.isFinite(promoDiskon) || promoDiskon <= 0) {
      Alert.alert('Peringatan', 'Lengkapi semua data promo dengan benar.');
      return;
    }

    addPromo({ kode: promoKode, deskripsi: promoDesk, diskon: promoDiskon });
    Alert.alert('Sukses', `Promo ${promoKode.toUpperCase()} berhasil ditambahkan.`);
    setKode('');
    setDeskripsi('');
    setDiskon('');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Buat Campaign Promo</Text>
      <Text style={styles.subtitle}>Tambahkan promo baru untuk menarik pelanggan dan meningkatkan penjualan.</Text>

      <View style={styles.formCard}>
        <TextInput
          style={styles.input}
          placeholder="Kode promo (mis. COFFEE30)"
          value={kode}
          onChangeText={setKode}
          autoCapitalize="characters"
        />
        <TextInput
          style={styles.input}
          placeholder="Deskripsi promo"
          value={deskripsi}
          onChangeText={setDeskripsi}
        />
        <TextInput
          style={styles.input}
          placeholder="Diskon (%)"
          value={diskon}
          keyboardType="numeric"
          onChangeText={setDiskon}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.primaryButtonText}>Rilis Promo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ef' },
  content: { padding: 18, paddingBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#3c2415', marginBottom: 8 },
  subtitle: { color: '#685d57', lineHeight: 20, marginBottom: 18 },
  formCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#efdcc9' },
  input: { backgroundColor: '#faf7f4', borderWidth: 1, borderColor: '#e8d7ca', borderRadius: 12, padding: 12, marginBottom: 12, color: '#2f241d' },
  primaryButton: { backgroundColor: '#8a572d', padding: 14, borderRadius: 12, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' },
});
