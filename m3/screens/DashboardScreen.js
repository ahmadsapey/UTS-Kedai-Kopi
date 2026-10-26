import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../context/StoreContext';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

export default function DashboardScreen({ route, navigation }) {
  const userEmail = route.params?.userEmail || 'Admin';
  const { products, customers, orders } = useStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>Halo, Admin 👋</Text>
        <Text style={styles.subText}>{userEmail}</Text>
        <Text style={styles.subText}>Selamat datang di manajemen Kopi Kita.</Text>
      </View>

      <Text style={styles.sectionTitle}>Ringkasan</Text>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{products.length}</Text>
          <Text style={styles.statLabel}>Produk</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{customers.length}</Text>
          <Text style={styles.statLabel}>Pelanggan</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{orders.length}</Text>
          <Text style={styles.statLabel}>Pesanan</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Menu manajemen</Text>
      <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('ManajemenProduk')}>
        <Text style={styles.menuTitle}>📦 Manajemen Produk</Text>
        <Text style={styles.menuSub}>Tambah, ubah, dan hapus produk serta harga.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuCard} onPress={() => navigation.navigate('ManajemenPelanggan')}>
        <Text style={styles.menuTitle}>👥 Manajemen Pelanggan</Text>
        <Text style={styles.menuSub}>Kelola profil pelanggan dan kategori member.</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Pesanan terbaru</Text>
      {orders.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada pesanan. Coba checkout dari katalog.</Text>
      ) : (
        orders.slice(0, 3).map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.orderTitle}>Pesanan #{order.id.slice(-6)}</Text>
            <Text style={styles.orderDetails}>{order.items.reduce((sum, item) => sum + item.qty, 0)} item • {formatRupiah(order.total)}</Text>
          </View>
        ))
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.popToTop()}>
        <Text style={styles.logoutText}>Keluar / Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ef' },
  content: { padding: 16, paddingBottom: 28 },
  welcomeCard: { backgroundColor: '#3c2415', padding: 18, borderRadius: 14, marginBottom: 20 },
  welcomeText: { color: '#fff', fontSize: 21, fontWeight: 'bold' },
  subText: { color: '#eaded2', marginTop: 5 },
  sectionTitle: { color: '#34251b', fontSize: 17, fontWeight: 'bold', marginBottom: 10, marginTop: 3 },
  statsRow: { flexDirection: 'row', marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#fff', padding: 13, borderRadius: 11, alignItems: 'center', marginRight: 8 },
  statNumber: { color: '#8a572d', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: '#71645a', fontSize: 12, marginTop: 3 },
  menuCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 9 },
  menuTitle: { color: '#3c2415', fontSize: 16, fontWeight: 'bold' },
  menuSub: { color: '#71645a', fontSize: 13, marginTop: 5 },
  emptyText: { color: '#71645a', backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 10 },
  orderCard: { backgroundColor: '#fff', padding: 13, borderRadius: 10, marginBottom: 8 },
  orderTitle: { color: '#3c2415', fontWeight: 'bold' },
  orderDetails: { color: '#71645a', marginTop: 4 },
  logoutButton: { backgroundColor: '#a13c32', padding: 13, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});
