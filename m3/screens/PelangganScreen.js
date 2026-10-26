import React, { useState } from 'react';
import {
  Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useStore } from '../context/StoreContext';

const categories = ['Regular', 'Silver Member', 'Gold Member'];

export default function PelangganScreen() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useStore();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [kategori, setKategori] = useState(categories[0]);
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setNama('');
    setEmail('');
    setKategori(categories[0]);
    setEditingId(null);
  };

  const handleSave = () => {
    const trimmedName = nama.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName) {
      Alert.alert('Nama wajib diisi', 'Masukkan nama pelanggan.');
      return;
    }
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      Alert.alert('Email tidak valid', 'Periksa kembali alamat email pelanggan.');
      return;
    }
    const customer = { nama: trimmedName, email: trimmedEmail, kategori };
    if (editingId) updateCustomer(editingId, customer);
    else addCustomer(customer);
    resetForm();
  };

  const startEditing = (customer) => {
    setEditingId(customer.id);
    setNama(customer.nama);
    setEmail(customer.email || '');
    setKategori(customer.kategori || categories[0]);
  };

  const confirmDelete = (customer) => Alert.alert(
    'Hapus pelanggan',
    `Yakin ingin menghapus ${customer.nama}?`,
    [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          deleteCustomer(customer.id);
          if (editingId === customer.id) resetForm();
        },
      },
    ]
  );

  const changeCategory = () => {
    const nextIndex = (categories.indexOf(kategori) + 1) % categories.length;
    setKategori(categories[nextIndex]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>{editingId ? 'Ubah Pelanggan' : 'Tambah Pelanggan'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama pelanggan"
          value={nama}
          onChangeText={setNama}
          accessibilityLabel="Nama pelanggan"
        />
        <TextInput
          style={styles.input}
          placeholder="Email (opsional)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email pelanggan"
        />
        <TouchableOpacity style={styles.categoryButton} onPress={changeCategory}>
          <Text style={styles.categoryText}>Kategori: {kategori}  •  Ubah</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>{editingId ? 'Simpan Perubahan' : 'Simpan Pelanggan'}</Text>
        </TouchableOpacity>
        {editingId && (
          <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
            <Text style={styles.cancelText}>Batal mengubah</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.listTitle}>Daftar Pelanggan ({customers.length})</Text>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Belum ada pelanggan.</Text>}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.customerInfo}>
              <Text style={styles.itemTitle}>{item.nama}</Text>
              <Text style={styles.itemSub}>{item.email || 'Email belum ditambahkan'}</Text>
              <Text style={styles.badge}>{item.kategori}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.editButton} onPress={() => startEditing(item)}>
                <Text style={styles.editText}>Ubah</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item)}>
                <Text style={styles.deleteText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f7f4ef' },
  formCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 16 },
  formTitle: { color: '#3c2415', fontSize: 17, fontWeight: 'bold', marginBottom: 11 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e6ddd4', marginBottom: 10 },
  categoryButton: { borderWidth: 1, borderColor: '#d7c3ad', padding: 11, borderRadius: 8, marginBottom: 10 },
  categoryText: { color: '#70421f', fontWeight: '600' },
  saveButton: { backgroundColor: '#4c7c48', padding: 12, borderRadius: 9, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  cancelButton: { padding: 10, alignItems: 'center' },
  cancelText: { color: '#8a572d', fontWeight: 'bold' },
  listTitle: { color: '#34251b', fontSize: 16, fontWeight: 'bold', marginBottom: 9 },
  listItem: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 8 },
  customerInfo: { marginBottom: 10 },
  itemTitle: { color: '#34251b', fontSize: 15, fontWeight: 'bold' },
  itemSub: { color: '#71645a', fontSize: 13, marginTop: 4 },
  badge: { color: '#70421f', backgroundColor: '#eee7de', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 7, fontSize: 12, fontWeight: 'bold' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  editButton: { backgroundColor: '#eee7de', paddingVertical: 7, paddingHorizontal: 13, borderRadius: 7 },
  editText: { color: '#70421f', fontWeight: 'bold' },
  deleteButton: { backgroundColor: '#f8e5e2', paddingVertical: 7, paddingHorizontal: 13, borderRadius: 7, marginLeft: 8 },
  deleteText: { color: '#a13c32', fontWeight: 'bold' },
  emptyText: { color: '#71645a', textAlign: 'center', padding: 18 },
});
