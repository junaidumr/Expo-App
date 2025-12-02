import { supabase } from '../migration/supabase';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, TextInput, View, Text } from 'react-native';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert('Error', 'Enter email and password');

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return Alert.alert('Registration Failed', error.message);

    Alert.alert('Success', 'Account created! You can login now.');
    router.replace('/login'); // Go to login page after register
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
      <Button title="Register" onPress={handleRegister} />
      <Button title="Go to Login" onPress={() => router.push('/login')} />
    </View>
  );
}
