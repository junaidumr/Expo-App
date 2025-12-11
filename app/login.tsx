import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { supabase } from '../migration/supabase';

WebBrowser.maybeCompleteAuthSession();



export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Configure Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '990839213604-qsif18lrs8g9e1t4elgg9kaatsqcflhl.apps.googleusercontent.com',
    androidClientId: '990839213604-94t8i7dek34k7e254fck9kntfs2557cp.apps.googleusercontent.com',
    webClientId: '990839213604-qsif18lrs8g9e1t4elgg9kaatsqcflhl.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@junaidumr/expoapp',
  });

  // Handle Google Sign-In response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.idToken) {
        handleGoogleSignInSuccess(authentication.idToken);
      }
    }
  }, [response]);

  const handleGoogleSignInSuccess = async (idToken: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) {
        console.log('Supabase sign-in error:', error);
        Alert.alert('Sign-In Failed', error.message || 'Failed to authenticate with Google');
        return;
      }

      if (data.user) {
        Alert.alert('Success', 'Google Sign-In Successful!', [
          { text: 'OK', onPress: () => router.replace('/(tabs)/home') },
        ]);
      }
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      Alert.alert('Error', err?.message || 'Something went wrong');
    }
  };

  const handleGooglesignIn = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Error prompting Google sign-in:', error);
      Alert.alert('Error', 'Failed to open Google Sign-In');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Enter email and password');
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.log('Login error:', error);
        return Alert.alert('Login Failed', error.message || 'Invalid credentials');
      }

      const user = data.user;

      if (!user) {
        return Alert.alert('Login Failed', 'No user data returned');
      }

      if (!user.email_confirmed_at) {
        return Alert.alert(
          'Email Not Verified',
          'Please check your email and click the confirmation link before logging in.'
        );
      }

      Alert.alert('Success', 'Login Successful!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)/home') },
      ]);
    } catch (err: any) {
      console.log('Login error:', err);
      Alert.alert('Login Error', err?.message || 'Unexpected error occurred');
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

      <TouchableOpacity onPress={() => router.push("/Loginwithotp")} style={{ marginBottom: 20 }}>
        <Text style={{ color: 'blue' }}>Login with OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/ForgotPassword")} style={{ marginBottom: 20 }}>
        <Text style={{ color: "red" }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
      <View style={{ marginTop: 10 }}>
        <Button title="Register Now" onPress={() => router.push('/Register')} />
      </View>

      <View style={styles.loginOptions}>
        <TouchableOpacity style={styles.Image} onPress={handleGooglesignIn}>
          <Image source={require("../assets/images/loginwithgoogle.png")} />
          <Text style={styles.registerText}>Register with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Image}>
          <Image source={require("../assets/images/loginwithapple.png")} />
          <Text style={styles.registerText}>
            Register with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  label: { marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#deafafff', padding: 10, marginBottom: 15, borderRadius: 5 },

  Image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,

  },

  registerText: {
    top: -32, left: 10, color: 'blue'
  },
  // AppleImage:{
  //   justifyContent:'center',
  //   alignItems:'center',
  //   marginTop:10,
  //    borderRadius:20,
  //   borderWidth:1

  // },

  loginOptions: {

  },


});
