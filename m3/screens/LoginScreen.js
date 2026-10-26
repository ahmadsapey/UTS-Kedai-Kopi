import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DEMO_EMAIL = 'admin@kopikita.id';
const DEMO_PASSWORD = 'kopi123';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert('Data belum lengkap', 'Masukkan email dan password.');
      return;
    }
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      Alert.alert('Login gagal', 'Email atau password tidak sesuai. Gunakan akun demo yang tertera.');
      return;
    }
    navigation.replace('Dashboard', { userEmail: DEMO_EMAIL });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>☕</Text>
      <Text style={styles.title}>Login Admin</Text>
      <Text style={styles.subtitle}>Masuk untuk mengelola kedai Kopi Kita.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        accessibilityLabel="Email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
        accessibilityLabel="Password"
      />
      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryButtonText}>Masuk ke Manajemen</Text>
      </TouchableOpacity>
      <View style={styles.demoCard}>
        <Text style={styles.demoTitle}>Akun demo</Text>
        <Text style={styles.demoText}>Email: {DEMO_EMAIL}</Text>
        <Text style={styles.demoText}>Password: {DEMO_PASSWORD}</Text>
        <Text style={styles.note}>Akun ini hanya untuk demonstrasi lokal aplikasi.</Text>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 22, backgroundColor: '#f7f4ef' },
  icon: { fontSize: 42, textAlign: 'center', marginBottom: 8 },
  title: { color: '#3c2415', fontSize: 25, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#71645a', textAlign: 'center', marginTop: 6, marginBottom: 22 },
  input: { backgroundColor: '#fff', padding: 13, borderRadius: 10, borderWidth: 1, borderColor: '#e6ddd4', marginBottom: 12 },
  primaryButton: { backgroundColor: '#8a572d', padding: 14, borderRadius: 10, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  demoCard: { backgroundColor: '#eee7de', padding: 14, borderRadius: 10, marginTop: 20 },
  demoTitle: { color: '#3c2415', fontWeight: 'bold', marginBottom: 5 },
  demoText: { color: '#4d4037', marginTop: 2 },
  note: { color: '#71645a', fontSize: 12, marginTop: 8 },
  backButton: { padding: 14, alignItems: 'center' },
  backText: { color: '#8a572d', fontWeight: 'bold' },
});
