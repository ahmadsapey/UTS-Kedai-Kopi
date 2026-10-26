import React, { useMemo, useState } from 'react';
import {
  Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useStore } from '../context/StoreContext';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

export default function KatalogScreen() {
  const { products, cart, addToCart, changeCartQuantity, removeFromCart, checkout } = useStore();
  const [search, setSearch] = useState('');
  const [cartVisible, setCartVisible] = useState(false);
  const filteredProducts = useMemo(
    () => products.filter((product) => product.nama.toLowerCase().includes(search.trim().toLowerCase())),
    [products, search]
  );
  const itemCount = cart.reduce((total, item) => total + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  const handleCheckout = () => {
    const order = checkout();
    if (!order) return;
    setCartVisible(false);
    Alert.alert(
      'Pesanan berhasil',
      `No. pesanan: #${order.id.slice(-6)}\nTotal: ${formatRupiah(order.total)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Menu Kopi Kita</Text>
      <Text style={styles.intro}>Pilih menu favorit dan tambahkan ke keranjang.</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari produk..."
        value={search}
        onChangeText={setSearch}
        accessibilityLabel="Cari produk"
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={<Text style={styles.emptyText}>Produk tidak ditemukan.</Text>}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.nama}</Text>
              <Text style={styles.productPrice}>{formatRupiah(item.harga)}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Text style={styles.addButtonText}>+ Tambah</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.cartBar}>
        <View>
          <Text style={styles.cartBarLabel}>{itemCount} item di keranjang</Text>
          <Text style={styles.cartBarTotal}>{formatRupiah(total)}</Text>
        </View>
        <TouchableOpacity style={styles.cartButton} onPress={() => setCartVisible(true)}>
          <Text style={styles.cartButtonText}>Lihat Keranjang</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={cartVisible} animationType="slide" onRequestClose={() => setCartVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Keranjang Belanja</Text>
          {cart.length === 0 ? (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyText}>Keranjang masih kosong.</Text>
            </View>
          ) : (
            <ScrollView style={styles.cartList}>
              {cart.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.cartItemDetails}>
                    <Text style={styles.productName}>{item.nama}</Text>
                    <Text style={styles.productPrice}>
                      {formatRupiah(item.harga)} × {item.qty} = {formatRupiah(item.harga * item.qty)}
                    </Text>
                  </View>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => changeCartQuantity(item.id, -1)}>
                      <Text style={styles.quantityText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{item.qty}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => changeCartQuantity(item.id, 1)}>
                      <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                      <Text style={styles.removeText}>Hapus</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
          <View style={styles.modalFooter}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatRupiah(total)}</Text>
            </View>
            <TouchableOpacity
              style={[styles.checkoutButton, cart.length === 0 && styles.disabledButton]}
              disabled={cart.length === 0}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setCartVisible(false)}>
              <Text style={styles.closeText}>Kembali ke katalog</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f7f4ef' },
  heading: { fontSize: 23, fontWeight: 'bold', color: '#3c2415' },
  intro: { color: '#71645a', marginTop: 4, marginBottom: 14 },
  searchInput: { backgroundColor: '#fff', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#e6ddd4', marginBottom: 12 },
  productCard: { backgroundColor: '#fff', padding: 14, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 },
  productDetails: { flex: 1, paddingRight: 10 },
  productName: { fontSize: 15, fontWeight: '600', color: '#34251b' },
  productPrice: { color: '#8a572d', marginTop: 5, fontSize: 13 },
  addButton: { backgroundColor: '#8a572d', paddingVertical: 9, paddingHorizontal: 12, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  emptyText: { color: '#81766e', textAlign: 'center', padding: 20 },
  cartBar: { backgroundColor: '#3c2415', padding: 13, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  cartBarLabel: { color: '#f2e8dc', fontSize: 12 },
  cartBarTotal: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 3 },
  cartButton: { backgroundColor: '#d08a45', padding: 10, borderRadius: 8 },
  cartButtonText: { color: '#fff', fontWeight: 'bold' },
  modalContainer: { flex: 1, padding: 20, paddingTop: 52, backgroundColor: '#f7f4ef' },
  modalTitle: { fontSize: 23, fontWeight: 'bold', color: '#3c2415', marginBottom: 16 },
  emptyCart: { flex: 1, justifyContent: 'center' },
  cartList: { flex: 1 },
  cartItem: { backgroundColor: '#fff', padding: 13, borderRadius: 12, marginBottom: 9 },
  cartItemDetails: { marginBottom: 12 },
  quantityControls: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { backgroundColor: '#eee7de', paddingHorizontal: 11, paddingVertical: 5, borderRadius: 6 },
  quantityText: { color: '#3c2415', fontSize: 17, fontWeight: 'bold' },
  quantityValue: { color: '#34251b', fontWeight: 'bold', marginHorizontal: 12 },
  removeButton: { marginLeft: 'auto', padding: 6 },
  removeText: { color: '#a13c32', fontWeight: 'bold' },
  modalFooter: { borderTopWidth: 1, borderColor: '#e6ddd4', paddingTop: 14 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  totalLabel: { color: '#34251b', fontSize: 16, fontWeight: 'bold' },
  totalValue: { color: '#3c2415', fontSize: 18, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: '#4c7c48', padding: 14, borderRadius: 10, alignItems: 'center' },
  disabledButton: { backgroundColor: '#aaa' },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  closeButton: { padding: 13, alignItems: 'center' },
  closeText: { color: '#8a572d', fontWeight: 'bold' },
});
