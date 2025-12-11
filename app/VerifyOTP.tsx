import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../migration/supabase";


export default function VerifyOTP() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const email = params.email as string;

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        // Validation
        if (!otp || !newPassword || !confirmPassword) {
            return Alert.alert("Error", "Please fill in all fields");
        }

        if (otp.length !== 6) {
            return Alert.alert("Error", "OTP must be 6 digits");
        }

        if (newPassword.length < 6) {
            return Alert.alert("Error", "Password must be at least 6 characters long");
        }

        if (newPassword !== confirmPassword) {
            return Alert.alert("Error", "Passwords do not match");
        }

        setLoading(true);

        try {
            // Verify OTP with Supabase (this should create a session if token is valid)
            const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: "email",
            });

            if (verifyError) {
                console.error("verifyOtp error:", verifyError);
                Alert.alert("Error", verifyError.message || "Invalid or expired OTP");
                setLoading(false);
                return;
            }

            // After verifyOtp, Supabase client should have an active session.
            // Now update the user's password.
            const { data: updateData, error: updateError } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (updateError) {
                console.error("updateUser error:", updateError);
                Alert.alert("Error", updateError.message || "Failed to update password");
            } else {
                Alert.alert(
                    "Success",
                    "Your password has been reset successfully!",
                    [
                        {
                            text: "OK",
                            onPress: () => router.replace("/login"),
                        },
                    ]
                );
            }
        } catch (err: any) {
            console.error("Reset Error:", err);
            Alert.alert("Error", `Failed to reset password: ${err.message || err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
                Enter the 6-digit code sent to {email}
            </Text>

            <Text style={styles.label}>OTP Code:</Text>
            <TextInput
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter 6-digit OTP"
                keyboardType="number-pad"
                maxLength={6}
                editable={!loading}
                style={styles.input}
            />

            <Text style={styles.label}>New Password:</Text>
            <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                secureTextEntry
                autoCapitalize="none"
                editable={!loading}
                style={styles.input}
            />

            <Text style={styles.label}>Confirm Password:</Text>
            <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                secureTextEntry
                autoCapitalize="none"
                editable={!loading}
                style={styles.input}
            />

            <Button
                title={loading ? "Resetting..." : "Reset Password"}
                onPress={handleResetPassword}
                disabled={loading}
            />
            <TouchableOpacity onPress={()=> router.push("/ForgotPassword")}style={styles.Button}>
                <Text>
                    Incorrect email? Go back to Forgot Password
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 30,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        borderColor: "#ccc",
    },

    Button:{
        marginTop:20,
        alignItems:"center",
        color:"blue",
        width:"90%",
        height:40,
        justifyContent:"center",
        backgroundColor:"#d5ceceff",
        borderRadius:8,
        left:20,
        top:-10,

    }
});
