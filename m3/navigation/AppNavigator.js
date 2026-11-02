import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';
import KatalogScreen from '../screens/KatalogScreen';
import PromoActiveScreen from '../screens/PromoActiveScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProdukScreen from '../screens/ProdukScreen';
import PelangganScreen from '../screens/PelangganScreen';
import PemasaranScreen from '../screens/PemasaranScreen';
import DashboardReportScreen from '../screens/DashboardReportScreen';
import DetailTransaksiScreen from '../screens/DetailTransaksiScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{
          headerStyle: { backgroundColor: '#3c2415' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          contentStyle: { backgroundColor: '#f7f4ef' },
        }}
      >
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Kopi Kita' }} />
        <Stack.Screen name="Katalog" component={KatalogScreen} options={{ title: 'Katalog & Keranjang' }} />
        <Stack.Screen name="PromoPublik" component={PromoActiveScreen} options={{ title: 'Promo & Voucher' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard Admin' }} />
        <Stack.Screen name="ManajemenProduk" component={ProdukScreen} options={{ title: 'Manajemen Produk' }} />
        <Stack.Screen name="ManajemenPelanggan" component={PelangganScreen} options={{ title: 'Manajemen Pelanggan' }} />
        <Stack.Screen name="Pemasaran" component={PemasaranScreen} options={{ title: 'Pemasaran & Promo' }} />
        <Stack.Screen name="DashboardReport" component={DashboardReportScreen} options={{ title: 'Laporan Bisnis' }} />
        <Stack.Screen name="DetailTransaksi" component={DetailTransaksiScreen} options={{ title: 'Riwayat Transaksi' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}