import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { LinearGradient } from "expo-linear-gradient";

const Focus = () => {
  const router = useRouter();

  const data = [
    { label: "January", value: 50, frontColor: "#4FC3F7" },
    { label: "February", value: 80, frontColor: "#643181ff" },
    { label: "March", value: 70, frontColor: "#95898cff" },
    { label: "April", value: 60, frontColor: "#4FC3F7" },
    { label: "May", value: 90 , frontColor: "#12b49cff"},
    { label: "June", value: 200, frontColor: "#0a6690ff" },
    { label: "July", value: 122, frontColor: "#47a522ff"},
    { label: "August", value: 50, frontColor: "#a3aa99ff" },
    { label: "September", value: 70, frontColor: "#a0af4dff" },
    { label: "October", value: 240, frontColor: "#055329ff" },
    { label: "November", value: 170, frontColor: "#835c8fff" },
    { label: "December", value: 120, frontColor: "#092938ff" },
  ];

  return (
    <ScrollView style={{ backgroundColor: "black", flex: 1 }}>
      
      {/* Header with Back Button */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
          <Text style={{ color: "white", fontSize: 18 }}>⬅ Back</Text>
        </TouchableOpacity>
        <Text style={{ color: "#FFFFFFDE", fontSize: 20 }}>Focus Mode</Text>
      </View>

      {/* Bar Chart */}
      <LinearGradient
        colors={['#b1dbf0ff', '#11585dff', '#467eddff', '#2d696dff']}
        style={{
          width: "90%",
          height: 300,
          marginTop: 20,
          borderRadius: 10,
          justifyContent: "center",
          alignSelf: "center"
        }}
      >
        <BarChart
          data={data}
          barBorderRadius={10}
          gradientColor="#a0c9eaff"
          frontColor="#ebdae8ff"
        />
      </LinearGradient>

      {/* Images / Frames */}
      <View style={{ marginLeft: 29, gap: 10, marginTop: 40 }}>
        <TouchableOpacity><Image source={require("../../assets/images/Frame1.png")} /></TouchableOpacity>
        <TouchableOpacity><Image source={require("../../assets/images/Frame2.png")} /></TouchableOpacity>
        <TouchableOpacity><Image source={require("../../assets/images/Frame3.png")} /></TouchableOpacity>
        <TouchableOpacity><Image source={require("../../assets/images/Frame4.png")} /></TouchableOpacity>
        <TouchableOpacity><Image source={require("../../assets/images/Frame5.png")} /></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Focus;
