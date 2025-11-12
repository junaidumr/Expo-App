import { router } from 'expo-router'; // 👈 Import router from Expo Router
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { supabase } from './supabase'

const AuthScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const handleAuth = async () => {
    setLoading(true)

    if (isLogin) {
      // LOGIN
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      setLoading(false)

      if (error) {
        Alert.alert('Login failed', error.message)
      } else {
        Alert.alert('Login successful', `Welcome ${data.user?.email}`)
        router.push('/home') // 👈 Navigate to ThirdScreen after successful login
      }
    } else {
      // SIGNUP
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      setLoading(false)

      if (error) {
        Alert.alert('Registration failed', error.message)
      } else {
        Alert.alert(
          'Registration successful',
          'Please check your email to confirm your account.'
        )
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : isLogin ? 'Login' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#4F46E5',
    fontWeight: 'bold',
  },
})

export default AuthScreen
