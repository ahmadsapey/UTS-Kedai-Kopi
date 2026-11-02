import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../context/StoreContext';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

export default function DashboardReportScreen({ navigation }) {
  const { transactions } = useStore();
  const totalPendapatan = transactions.reduce((sum, item) => sum + item.total, 0);
  const totalTransaksi = transactions.length;
  const rataRata = totalTransaksi ? totalPendapatan / totalTransaksi : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Laporan Bisnis</Text>
      <View style={styles.primaryCard}>
        <Text style={styles.primaryLabel}>Total Pendapatan</Text>
        <Text style={styles.primaryValue}>{formatRupiah(totalPendapatan)}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Transaksi</Text>
          <Text style={styles.statValue}>{totalTransaksi}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Rata-rata</Text>
          <Text style={styles.statValue}>{formatRupiah(Math.round(rataRata))}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('DetailTransaksi')}>
        <Text style={styles.actionText}>Lihat Riwayat Transaksi</Text>
      </TouchableOpacity>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Ringkasan operasional</Text>
        <Text style={styles.noteText}>Kinerja penjualan menunjukkan tren yang stabil. Promo aktif dapat ditambahkan melalui menu pemasaran untuk mendorong transaksi lebih banyak.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ef' },
  content: { padding: 18, paddingBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#3c2415', marginBottom: 16 },
  primaryCard: { backgroundColor: '#3c2415', borderRadius: 16, padding: 18 },
  primaryLabel: { color: '#eccfb4', fontSize: 12 },
  primaryValue: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 8 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 16, marginRight: 8, borderWidth: 1, borderColor: '#ecdcc6' },
  statLabel: { color: '#695b53', fontSize: 12 },
  statValue: { color: '#3c2415', fontSize: 22, fontWeight: 'bold', marginTop: 6 },
  actionButton: { backgroundColor: '#d08a45', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 18 },
  actionText: { color: '#fff', fontWeight: 'bold' },
  noteCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginTop: 18, borderWidth: 1, borderColor: '#f0e0d3' },
  noteTitle: { color: '#3c2415', fontSize: 16, fontWeight: 'bold' },
  noteText: { color: '#625750', marginTop: 8, lineHeight: 20 },
});
