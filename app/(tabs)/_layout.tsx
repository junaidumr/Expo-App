import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
            <Tabs.Screen name="index" options={{ headerShown: false }} />
            <Tabs.Screen name="SecondPage" options={{ headerShown: false }} />
            <Tabs.Screen name="third" options={{ headerShown: false }} />
            <Tabs.Screen name="fourth" options={{ headerShown: false }} />
            <Tabs.Screen name="fifth" options={{ headerShown: false }} />
            <Tabs.Screen name="home" options={{ headerShown: false }} />
            <Tabs.Screen name="focus" options={{ headerShown: false }} />
            <Tabs.Screen name="profile" options={{ headerShown: false }} />
        </Tabs>
    );
}
