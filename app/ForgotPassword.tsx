import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../migration/supabase";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!email) return Alert.alert("Error", "Please enter your email");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("Error", "Please enter a valid email address");
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } });

      if (error) {
        Alert.alert("Invalid Email", "No account found with this email address. ");
      } else {
        Alert.alert("OTP Sent!", "Check your email for the 6-digit OTP code.", [
          {
            text: "OK",
            onPress: () => router.push({ pathname: "/VerifyOTP", params: { email } }),
          },
        ]);
      
      }
    } catch (err: any) {
      console.error("OTP Error:", err);
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Forgot Password?
      </Text>
      <Text style={{ fontSize: 14, color: "#666", marginBottom: 30 }}>
        Enter your email address and we'll send you a 6-digit OTP code to reset your password.
      </Text>

      <Text style={{ marginBottom: 5 }}>Email:</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
          borderRadius: 8,
          borderColor: "#ccc"
        }}
      />

      <Button
        title={loading ? "Sending..." : "Send OTP"}
        onPress={sendOtp}
        disabled={loading}
      />

      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={{ marginTop: 20, alignItems: "center" }}
      >
        <Text style={{ color: "blue" }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
