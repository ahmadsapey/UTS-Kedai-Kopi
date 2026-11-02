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
        <View style={styles.heroBadge}>
          <Text style={styles.eyebrow}>KEDAI KOPI • FRESHLY BREWED</Text>
        </View>
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
          Pilih menu, atur jumlah pesanan di keranjang, lalu checkout. Semua pesanan demo dapat dicoba tanpa membuat akun.
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
          <View>
            <Text style={styles.productName}>{product.nama}</Text>
            <Text style={styles.productMeta}>Pilihan favorit hari ini</Text>
          </View>
          <Text style={styles.price}>{formatRupiah(product.harga)}</Text>
        </View>
      ))}

      <View style={styles.managementCard}>
        <Text style={styles.cardTitle}>Kelola kedai</Text>
        <Text style={styles.cardText}>Masuk sebagai admin untuk mengelola produk, pelanggan, promo, dan laporan bisnis.</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.secondaryButtonText}>Masuk sebagai Admin</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.promoCard}>
        <Text style={styles.cardTitle}>Promo hari ini</Text>
        <Text style={styles.cardText}>Temukan voucher kopi spesial dan penawaran menarik untuk pelanggan loyal.</Text>
        <TouchableOpacity style={styles.tertiaryButton} onPress={() => navigation.navigate('PromoPublik')}>
          <Text style={styles.tertiaryButtonText}>Lihat Promo</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Kopi Kita • Aplikasi POS Demo</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f1ea' },
  content: { padding: 20, paddingBottom: 32 },
  hero: {
    backgroundColor: '#3c2415',
    padding: 24,
    borderRadius: 20,
    marginBottom: 18,
    shadowColor: '#3c2415',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  heroBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(227,183,125,0.15)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  eyebrow: { color: '#e3b77d', fontSize: 11, fontWeight: 'bold', letterSpacing: 1.2 },
  title: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginTop: 14 },
  subtitle: { color: '#f2e8dc', fontSize: 15, lineHeight: 22, marginTop: 8, marginBottom: 20 },
  primaryButton: { backgroundColor: '#d08a45', padding: 14, borderRadius: 12, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  infoCard: { backgroundColor: '#fff', padding: 17, borderRadius: 14, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  cardTitle: { color: '#3c2415', fontSize: 16, fontWeight: 'bold' },
  cardText: { color: '#6b625c', fontSize: 13, lineHeight: 19, marginTop: 6 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { color: '#34251b', fontSize: 19, fontWeight: 'bold' },
  link: { color: '#9b5c25', fontWeight: 'bold' },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  productName: { color: '#34251b', fontSize: 15, fontWeight: '600' },
  productMeta: { color: '#8b7a6d', fontSize: 11, marginTop: 4 },
  price: { color: '#8a572d', fontWeight: 'bold', fontSize: 14 },
  managementCard: { backgroundColor: '#eee7de', padding: 17, borderRadius: 14, marginTop: 12, borderWidth: 1, borderColor: '#e0d3c8' },
  secondaryButton: { borderWidth: 1, borderColor: '#8a572d', padding: 11, borderRadius: 9, alignItems: 'center', marginTop: 13 },
  secondaryButtonText: { color: '#70421f', fontWeight: 'bold' },
  promoCard: { backgroundColor: '#fff8f2', padding: 17, borderRadius: 14, marginTop: 12, borderWidth: 1, borderColor: '#eed8c0' },
  tertiaryButton: { backgroundColor: '#d08a45', padding: 11, borderRadius: 9, alignItems: 'center', marginTop: 13 },
  tertiaryButtonText: { color: '#fff', fontWeight: 'bold' },
  footer: { color: '#93877d', textAlign: 'center', fontSize: 12, marginTop: 22 },
});
