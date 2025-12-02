import DateTimePicker from "@react-native-community/datetimepicker";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../migration/supabase";
import { Task } from "../utils/types";
export default function Home() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState("⭐️⭐️");
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  // Fetch tasks and register for push notifications
  useEffect(() => {
    const fetchTasks = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) return;

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) console.log(error.message);
      else setTasks(data || []);

      // Register for push notifications
      registerForPushNotificationsAsync(userId);
    };

    fetchTasks();
  }, []);

  async function registerForPushNotificationsAsync(userId: string) {
    if (!Device.isDevice) {
      console.log('Must use a physical device for push notifications');
      return;
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }

      const tokenData = await Notifications.getExpoPushTokenAsync();
      console.log('Expo push token:', tokenData.data);

      if (tokenData.data) {
        const { error } = await supabase
          .from('users')
          .update({ expo_token: tokenData.data })
          .eq('uid', userId);

        if (error) console.log('Error updating user token:', error.message);
      }
    } catch (error) {
      console.log('Error getting push token:', error);
    }
  }

  const saveTaskToSupabase = async (newTask: Task) => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ ...newTask, user_id: userId }])
      .select();

    if (error) console.log("Error inserting task:", error.message);
    else setTasks(prev => [...prev, data?.[0]!]);
  };

  const saveTask = async () => {
    if (!task.trim()) return;

    const newTask: Task = {
      text: task.trim(),
      reminder: date.toISOString().split("T")[0],
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      priority,
    };

    Keyboard.dismiss();
    setShowPicker(false);
    setModalVisible(false);

    await saveTaskToSupabase(newTask);

    setTask("");
    setStep(1);
    setDate(new Date());
    setTime(new Date());
    setPriority("⭐️⭐️");
  };

  const deleteTask = (index: number) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  const onChangeDateTime = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      pickerMode === "date" ? setDate(selectedDate) : setTime(selectedDate);
    }
    setShowPicker(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Header */}
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
        <Image source={require("../../assets/images/home.png")} />
      </View>

      {/* Task List */}
      {tasks.length === 0 ? (
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
          <Image source={require("../../assets/images/home1.png")} />
          <Text style={{ color: "white", fontSize: 20 }}>What do you want to do today?</Text>
          <Text style={{ color: "white", fontSize: 17 }}>Tap + to add your tasks</Text>
        </View>
      ) : (
        <View style={{ flex: 1, padding: 20 }}>
          <FlatList
            data={tasks}
            keyExtractor={item => item.id?.toString() || Math.random().toString()}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#333",
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              >
                <View>
                  <Text style={{ color: "white", fontSize: 16 }}>{item.text}</Text>
                  <Text style={{ color: "gray", fontSize: 12 }}>
                    {item.reminder} {item.time}
                  </Text>
                  <Text style={{ color: "orange", fontSize: 12 }}>
                    Priority: {item.priority}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => deleteTask(index)}>
                  <Text style={{ color: "red", fontWeight: "bold" }}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#363636",
          height: 60,
          paddingHorizontal: 25,
        }}
      >
        <TouchableOpacity>
          <Image source={require("../../assets/images/index.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/onboarding/calendar")}>
          <Image source={require("../../assets/images/calendar.png")} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setStep(1);
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 42,
            height: 42,
            backgroundColor: "#8687E7",
            borderRadius: 21,
            top: -20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(tabs)/focus")}>
          <Image source={require("../../assets/images/clock.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
          <Image source={require("../../assets/images/user.png")} />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.7)" }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                padding: 20,
                width: "100%",
              }}
            >

              {step === 1 && (
                <>
                  <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                    Enter Task
                  </Text>
                  <TextInput
                    placeholder="Enter task..."
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 8,
                      padding: 10,
                      marginBottom: 15,
                    }}
                    value={task}
                    onChangeText={setTask}
                  />
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    <Button title="Next" onPress={() => setStep(2)} />
                  </View>
                </>
              )}

              {step === 2 && (
                <>
                  <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                    Pick a Date
                  </Text>
                  <Button
                    title="Select Date"
                    onPress={() => {
                      setPickerMode("date");
                      setShowPicker(true);
                    }}
                  />
                  <Text style={{ marginVertical: 10 }}>{date.toDateString()}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Button title="Back" onPress={() => setStep(1)} />
                    <Button title="Next" onPress={() => setStep(3)} />
                  </View>
                </>
              )}

              {step === 3 && (
                <>
                  <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                    Pick a Time
                  </Text>
                  <Button
                    title="Select Time"
                    onPress={() => {
                      setPickerMode("time");
                      setShowPicker(true);
                    }}
                  />
                  <Text style={{ marginVertical: 10 }}>
                    {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Button title="Back" onPress={() => setStep(2)} />
                    <Button title="Next" onPress={() => setStep(4)} />
                  </View>
                </>
              )}

              {step === 4 && (
                <>
                  <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                    Select Priority
                  </Text>
                  <View
                    style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 15 }}
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <Button
                        key={n}
                        title={"⭐️".repeat(n)}
                        onPress={() => setPriority("⭐️".repeat(n))}
                      />
                    ))}
                  </View>
                  <Text>Selected: {priority}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                    <Button title="Back" onPress={() => setStep(3)} />
                    <Button title="Save Task" onPress={saveTask} />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </View>

        {showPicker && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              zIndex: 9999,
              paddingBottom: 20,
            }}
          >
            <DateTimePicker
              value={pickerMode === "date" ? date : time}
              mode={pickerMode}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeDateTime}
            />
          </View>
        )}
      </Modal>
    </View>
  );
}
