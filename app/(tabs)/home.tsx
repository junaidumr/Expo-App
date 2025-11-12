import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Modal,
  TextInput,
  FlatList,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Home() {
  const router = useRouter();

  // States
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<
    { text: string; reminder: string; time: string; priority: string }[]
  >([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState("⭐️⭐️");
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  // ✅ FIXED SAVE TASK
  const saveTask = () => {
    if (!task.trim()) return;

    const newTask = {
      text: task.trim(),
      reminder: date.toDateString(),
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      priority,
    };

    // Close keyboard and picker
    Keyboard.dismiss();
    setShowPicker(false);

    // Add new task and close modal after a short delay
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      setModalVisible(false);
      // Reset form after modal closes
      setTimeout(() => {
        setTask("");
        setStep(1);
        setDate(new Date());
        setTime(new Date());
        setPriority("⭐️⭐️");
      }, 100);
      return updatedTasks;
    });
  };

  // 🗑️ Delete Task
  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  // 📅 Date/Time Picker
  const onChangeDateTime = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      if (pickerMode === "date") setDate(selectedDate);
      else setTime(selectedDate);
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
            keyExtractor={(_, index) => index.toString()}
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

      {/* Bottom Navigation */}
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
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Image source={require("../../assets/images/index.png")} />
          <Text></Text>
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

        <TouchableOpacity onPress={() => router.push("./focus")}>
          <Image source={require("../../assets/images/clock.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/profile")}>
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
              {/* Step 1: Enter Task */}
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

              {/* Step 2: Date Picker */}
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

              {/* Step 3: Time Picker */}
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

              {/* Step 4: Priority */}
              {step === 4 && (
                <>
                  <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                    Select Prioriy
                  </Text>
                  <View
                    style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 15 }}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Button
                        key={n}
                        title={"⭐️".repeat(n)}
                        onPress={() => setPriority("⭐️".repeat(n))}
                      />
                    ))}
                  </View>
                  <Text>Selected: {priority}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Button title="Back" onPress={() => setStep(3)} />
                    <Button title="Save Task" onPress={saveTask} />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </View>

        {/* Date/Time Picker */}
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