import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
const fourth = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>

      <Image source={require('../../assets/images/fourth.png')} style={{ resizeMode: "contain", position: "absolute", top: 151 }} />

      <Image source={require('../../assets/images/222.png')} style={{ position: "absolute", top: 430 }} />
      <View style={{ position: "absolute", top: 450 }}>
        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}> Orgonaize your tasks </Text>
      </View>

      <View style={{ position: "absolute", top: 500, }}>
        <Text style={{ color: "white", textAlign: "center" }}>You can organize your daily tasks by adding your tasks into separate categories</Text>
      </View>

      <View style={{ position: "absolute", top: 60, left: -1 }}>
        <TouchableOpacity onPress={() => router.replace("/login")} style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 10 }} >
          <Text style={{ color: "white", fontSize: 20 }}> Skip </Text>
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", top: 790, left: -1 }}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/third")} style={{ width: 50, height: 40, backgroundColor: "blue", justifyContent: "center", alignItems: "center", borderRadius: 10 }} >
          <Text style={{ color: "white", fontSize: 17 }}> Back </Text>

        </TouchableOpacity>

      </View>

      <View style={{ position: "absolute", top: 790, left: 290 }}>
        <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: "#8875FF", justifyContent: "center", alignItems: "center", borderRadius: 10 }} onPress={() => router.push("/(tabs)/fifth")}>
          <Text style={{ color: "white", fontSize: 17 }}> Get Started </Text>


        </TouchableOpacity>

      </View>


    </View>
  )
}

export default fourth