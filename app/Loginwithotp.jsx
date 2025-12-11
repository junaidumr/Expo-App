import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../migration/supabase';


const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpsent, setotpsent] = useState(false);
  // const navigation = useNavigation();

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  const handlesendotp = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'please enter a valid email address.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });
    setLoading(false);
    if (error) {
      Alert.alert ('Error', error.message);
    } else {
      setotpsent(true);
      Alert.alert('OTP sent', 'Please check your email for the OTP.');
    }
  }

  const Handlelogin = async () => {
  if (!otp.trim()) {
    Alert.alert("Error", "Please enter OTP");
    return;
  }

  // Example: verify OTP with Supabase
  const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });

  if (error) {
    Alert.alert("Error", error.message);
  } else {
    Alert.alert("Success", "OTP Verified");
    router.push("/home"); 
  }
};

  return (
    <View style={styles.container}>


      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#060303ff', marginBottom: 20 }}>
  Login with OTP
</Text>

      <TextInput
        style={styles.input}
        placeholder='Enter your email'
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {!otpsent ? (
        <TouchableOpacity style={[styles.Button, !isValidEmail(email) && styles.DisableButton]} onPress={handlesendotp}
          disabled={!isValidEmail(email) || loading}>
          {loading ? <ActivityIndicator color="#fff" /> : (<Text>Send OTP</Text>)}

        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder='Enter OTP'
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp} />
          <TouchableOpacity style={styles.Button} onPress={Handlelogin}>
            {loading ?
              <ActivityIndicator color="#fff" /> : <Text style={{ color: '#060303ff', fontSize: 16 }}>Login</Text>}
          </TouchableOpacity>

        </>

      )
      }

      <TouchableOpacity onPress={() => router.push("/login")} style={styles.Button}>
        <Text>Back to login with email & password</Text>
      </TouchableOpacity>

     
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#faf7f7ff'
  },

  Button: {
    width: '68%',
    height: 50,
    backgroundColor: '#bdababff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    fontSize: 16,
    borderColor: '#060303ff',
    borderWidth: 1,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fcf8f8ff',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    borderColor: '#060303ff',
    borderWidth: 1,
  },
  Text: {
    left: -114,
    // fontWeight: 'bold',
    fontSize: 15,
    color: '#060303ff',

  },

  DisableButton: {

    backgroundColor: '#8ea7c5ff',
  },





})