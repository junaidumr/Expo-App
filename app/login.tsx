import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../migration/supabase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('junaidaziz189@gmail.com');
  const [password, setPassword] = useState('Junaid189');

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Enter email and password');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('Login Failed', error.message);
        return;
      }

      const user = data.user;
      if (!user) {
        Alert.alert('Login Failed', 'No user data returned');
        return;
      }

      // Navigate immediately to avoid waiting for notifications
      router.replace('/(tabs)/home');

    } catch (err) {
      Alert.alert('Error', 'An unexpected error occurred during login');
      console.log('Login error:', err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter password"
        style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
      />

      <TouchableOpacity>
        <Text style={{ color: 'blue', marginBottom: 20 }}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button title="Login" onPress={handleLogin} />
      <Button title="Register Now" onPress={() => router.push('/Register')} />

    </View>

  );
}
