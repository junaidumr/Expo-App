import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../migration/supabase';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Enter email and password');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Alert.alert('Error', 'Please enter a valid email');
    }

    if (password.length < 6) {
      return Alert.alert('Error', 'Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Redirect URL after email confirmation (optional)
          emailRedirectTo: 'yourapp://login',
        },
      });

      if (error) {
        console.log('Signup error:', error);
        return Alert.alert('Registration Failed', error.message || JSON.stringify(error));
      }

      // Log the complete response to see what Supabase returns
      console.log('=== SIGNUP RESPONSE ===');
      console.log('User ID:', data.user?.id);
      console.log('User Email:', data.user?.email);
      console.log('Email Confirmed:', data.user?.email_confirmed_at);
      console.log('Session:', data.session ? 'Present' : 'NULL');
      console.log('Access Token:', data.session?.access_token ? 'Present' : 'NULL');
      console.log('Full Data:', JSON.stringify(data, null, 2));
      console.log('======================');

      // Check if email confirmation is required
      if (data.user && !data.session) {
        // Email confirmation is enabled - no session until confirmed
        Alert.alert(
          'Check Your Email',
          `A confirmation email has been sent to ${email}. Please click the link to verify your account.\n\nUser ID: ${data.user.id}`,
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
      } else if (data.session) {
        // Auto-confirmed - user can login immediately
        Alert.alert(
          'Registration Successful',
          `Account created successfully!\n\nUser ID: ${data.user?.id}\nAccess Token: ${data.session.access_token.substring(0, 20)}...`,
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
      } else {
        // Unexpected case
        Alert.alert(
          'Registration Status Unknown',
          'Please check the console logs for details.',
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
      }

      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error('Register error:', err);
      Alert.alert('Registration Error', err?.message || 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter password"
        style={styles.input}
      />

      <Button title={loading ? 'Creating Account...' : 'Register'} onPress={handleRegister} disabled={loading} />
      <View style={{ marginTop: 10 }}>
        <Button title="Go to Login" onPress={() => router.push('/login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  label: { marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
