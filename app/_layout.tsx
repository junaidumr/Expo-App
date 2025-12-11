import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login" />
            <Stack.Screen name="Register" />
            <Stack.Screen name="Loginwithotp" />
            <Stack.Screen name="VerifyOTP" />
        </Stack>
    );
}
