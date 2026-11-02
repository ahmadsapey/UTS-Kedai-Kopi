import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useStore } from '../context/StoreContext';

const formatRupiah = (value) => `Rp ${value.toLocaleString('id-ID')}`;

export default function DetailTransaksiScreen() {
  const { transactions } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riwayat Transaksi</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderId}>{item.id}</Text>
              <Text style={styles.amount}>{formatRupiah(item.total)}</Text>
            </View>
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</Text>
            <Text style={styles.itemSummary}>{item.items.reduce((sum, entry) => sum + entry.qty, 0)} item</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f4ef', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#3c2415', marginBottom: 12 },
  list: { paddingBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#f0e0d3' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { color: '#3c2415', fontWeight: 'bold' },
  amount: { color: '#8a572d', fontWeight: 'bold' },
  date: { color: '#685d57', marginTop: 6 },
  itemSummary: { color: '#8a572d', marginTop: 8, fontSize: 12 },
});
