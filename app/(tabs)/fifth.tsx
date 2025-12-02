import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const fifth = () => {
  return (

    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ alignItems: "center", position: "absolute", top: 170 }}>
        <Text style={{ color: "white", fontSize: 38, fontWeight: "bold" }}>Welcome to UpTodo</Text>
        <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}> Please login to your account or create new account to continue</Text>
      </View>

      <View style={{ position: "absolute", left: 4, top: 69 }}>
        <TouchableOpacity style={{ backgroundColor: "#8875FF", borderRadius: 10, width: 60, height: 35, alignItems: "center", justifyContent: "center" }} onPress={() => router.push("/(tabs)/fourth")}>
          <Text style={{ color: "white", fontSize: 20 }}> Back </Text>
        </TouchableOpacity>
      </View>
      <View style={{}}>
        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", width: 300, height: 40, backgroundColor: "#8875FF", position: "absolute", top: 450, left: 50, borderRadius: 10 }} onPress={() => router.replace("/login")}>
          <Text style={{ color: "white", fontSize: 20 }}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{}}>
        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", width: 300, height: 40, top: 503, left: 50, borderWidth: 2, borderColor: "#8875FF", borderRadius: 10 }} onPress={() => router.replace("/Register")} >
          <Text style={{ color: "white", fontSize: 20 }}>
            Create account
          </Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

export default fifth