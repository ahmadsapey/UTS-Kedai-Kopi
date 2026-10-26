import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../context/StoreContext';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

export default function ProfileScreen({ navigation }) {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>KEDAI KOPI • FRESHLY BREWED</Text>
        <Text style={styles.title}>Kopi Kita</Text>
        <Text style={styles.subtitle}>
          Temukan kopi favoritmu, pesan dengan mudah, dan nikmati setiap tegukan.
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Katalog')}>
          <Text style={styles.primaryButtonText}>Lihat Katalog</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>☕ Dibuat dengan sepenuh hati</Text>
        <Text style={styles.cardText}>
          Pilih menu, atur jumlah pesanan di keranjang, lalu checkout. Semua pesanan demo dapat dicoba
          tanpa membuat akun.
        </Text>
      </View>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>Menu pilihan</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Katalog')}>
          <Text style={styles.link}>Lihat semua</Text>
        </TouchableOpacity>
      </View>
      {featuredProducts.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <Text style={styles.productName}>{product.nama}</Text>
          <Text style={styles.price}>{formatRupiah(product.harga)}</Text>
        </View>
      ))}

      <View style={styles.managementCard}>
        <Text style={styles.cardTitle}>Kelola kedai</Text>
        <Text style={styles.cardText}>Masuk sebagai admin untuk mengelola produk dan pelanggan.</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.secondaryButtonText}>Masuk sebagai Admin</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Kopi Kita • Aplikasi POS Demo</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ef' },
  content: { padding: 20, paddingBottom: 32 },
  hero: { backgroundColor: '#3c2415', padding: 24, borderRadius: 18, marginBottom: 18 },
  eyebrow: { color: '#e3b77d', fontSize: 11, fontWeight: 'bold', letterSpacing: 1.2 },
  title: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginTop: 12 },
  subtitle: { color: '#f2e8dc', fontSize: 15, lineHeight: 22, marginTop: 8, marginBottom: 20 },
  primaryButton: { backgroundColor: '#d08a45', padding: 13, borderRadius: 10, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  infoCard: { backgroundColor: '#fff', padding: 17, borderRadius: 14, marginBottom: 20 },
  cardTitle: { color: '#3c2415', fontSize: 16, fontWeight: 'bold' },
  cardText: { color: '#6b625c', fontSize: 13, lineHeight: 19, marginTop: 6 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { color: '#34251b', fontSize: 19, fontWeight: 'bold' },
  link: { color: '#9b5c25', fontWeight: 'bold' },
  productCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 9 },
  productName: { color: '#34251b', fontSize: 15, fontWeight: '600' },
  price: { color: '#8a572d', fontWeight: 'bold', marginTop: 5 },
  managementCard: { backgroundColor: '#eee7de', padding: 17, borderRadius: 14, marginTop: 12 },
  secondaryButton: { borderWidth: 1, borderColor: '#8a572d', padding: 11, borderRadius: 9, alignItems: 'center', marginTop: 13 },
  secondaryButtonText: { color: '#70421f', fontWeight: 'bold' },
  footer: { color: '#93877d', textAlign: 'center', fontSize: 12, marginTop: 22 },
});
