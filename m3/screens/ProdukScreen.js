import React, { useState } from 'react';
import {
  Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useStore } from '../context/StoreContext';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

export default function ProdukScreen() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setNama('');
    setHarga('');
    setEditingId(null);
  };

  const handleSave = () => {
    const trimmedName = nama.trim();
    const parsedPrice = Number(harga);
    if (!trimmedName || !harga.trim() || !Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Data tidak valid', 'Isi nama produk dan harga lebih dari 0.');
      return;
    }
    const product = { nama: trimmedName, harga: Math.round(parsedPrice) };
    if (editingId) updateProduct(editingId, product);
    else addProduct(product);
    resetForm();
  };

  const startEditing = (product) => {
    setEditingId(product.id);
    setNama(product.nama);
    setHarga(String(product.harga));
  };

  const confirmDelete = (product) => Alert.alert(
    'Hapus produk',
    `Yakin ingin menghapus ${product.nama}?`,
    [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          deleteProduct(product.id);
          if (editingId === product.id) resetForm();
        },
      },
    ]
  );

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>{editingId ? 'Ubah Produk' : 'Tambah Produk'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama produk"
          value={nama}
          onChangeText={setNama}
          accessibilityLabel="Nama produk"
        />
        <TextInput
          style={styles.input}
          placeholder="Harga (Rp)"
          keyboardType="numeric"
          value={harga}
          onChangeText={setHarga}
          accessibilityLabel="Harga produk"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>{editingId ? 'Simpan Perubahan' : 'Simpan Produk'}</Text>
        </TouchableOpacity>
        {editingId && (
          <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
            <Text style={styles.cancelText}>Batal mengubah</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.listTitle}>Daftar Produk ({products.length})</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Belum ada produk.</Text>}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.productDetails}>
              <Text style={styles.itemTitle}>{item.nama}</Text>
              <Text style={styles.itemSub}>{formatRupiah(item.harga)}</Text>
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
  saveButton: { backgroundColor: '#4c7c48', padding: 12, borderRadius: 9, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  cancelButton: { padding: 10, alignItems: 'center' },
  cancelText: { color: '#8a572d', fontWeight: 'bold' },
  listTitle: { color: '#34251b', fontSize: 16, fontWeight: 'bold', marginBottom: 9 },
  listItem: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 8 },
  productDetails: { marginBottom: 10 },
  itemTitle: { color: '#34251b', fontSize: 15, fontWeight: 'bold' },
  itemSub: { color: '#8a572d', fontSize: 13, marginTop: 4 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  editButton: { backgroundColor: '#eee7de', paddingVertical: 7, paddingHorizontal: 13, borderRadius: 7 },
  editText: { color: '#70421f', fontWeight: 'bold' },
  deleteButton: { backgroundColor: '#f8e5e2', paddingVertical: 7, paddingHorizontal: 13, borderRadius: 7, marginLeft: 8 },
  deleteText: { color: '#a13c32', fontWeight: 'bold' },
  emptyText: { color: '#71645a', textAlign: 'center', padding: 18 },
});
