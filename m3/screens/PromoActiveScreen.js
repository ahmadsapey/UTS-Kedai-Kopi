import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useStore } from '../context/StoreContext';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

export default function PromoActiveScreen({ navigation }) {
  const { promos } = useStore();
  const activePromos = promos.filter((promo) => promo.status !== false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>Promo & Voucher</Text>
        <Text style={styles.subtitle}>Nikmati penawaran menarik untuk pelanggan setia dan pembelian baru.</Text>
      </View>

      {activePromos.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada promo aktif saat ini.</Text>
      ) : (
        activePromos.map((promo) => (
          <View key={promo.id} style={styles.promoCard}>
            <View style={styles.promoHeader}>
              <Text style={styles.promoCode}>{promo.kode}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>AKTIF</Text>
              </View>
            </View>
            <Text style={styles.promoDesc}>{promo.deskripsi}</Text>
            <Text style={styles.promoMeta}>Diskon {promo.diskon}%</Text>
          </View>
        ))
      )}

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Pemasaran')}>
        <Text style={styles.primaryButtonText}>Buat Promo Baru</Text>
      </TouchableOpacity>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Promo Aktif</Text>
        <Text style={styles.summaryValue}>{activePromos.length} Campaign</Text>
        <Text style={styles.summaryHint}>{formatRupiah(25000)} potensi pendapatan tambahan per promo</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ef' },
  content: { padding: 16, paddingBottom: 30 },
  headerCard: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#efdcc9' },
  title: { color: '#3c2415', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#685d57', marginTop: 6, lineHeight: 20 },
  promoCard: { backgroundColor: '#fff', padding: 16, borderRadius: 14, marginBottom: 12, borderWidth: 1, borderColor: '#eddfd5' },
  promoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  promoCode: { fontSize: 18, fontWeight: 'bold', color: '#8a572d' },
  badge: { backgroundColor: '#eaf6ef', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  badgeText: { color: '#258a4d', fontSize: 10, fontWeight: 'bold' },
  promoDesc: { color: '#463c37', marginTop: 8, lineHeight: 20 },
  promoMeta: { color: '#5d4d44', marginTop: 8, fontWeight: '600' },
  emptyText: { color: '#756a62', paddingVertical: 18, textAlign: 'center' },
  primaryButton: { backgroundColor: '#8a572d', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  primaryButtonText: { color: '#fff', fontWeight: 'bold' },
  summaryCard: { backgroundColor: '#3c2415', borderRadius: 16, padding: 16, marginTop: 16 },
  summaryLabel: { color: '#e9d9c7', fontSize: 12 },
  summaryValue: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  summaryHint: { color: '#f8e5d1', marginTop: 6 },
});
