import { Router, router } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Register = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>


      <View style={{ top: 70 }}>
        <Text style={{ fontWeight: "bold", fontSize: 50, color: "white" }}>Register</Text>
      </View>

      <View style={{ marginTop: 80, gap: 10 }}>

        <Text style={{ color: "white", fontSize: 20 }}>Username </Text>
        <TextInput placeholder="Enter your username" placeholderTextColor={"white"} style={{ width: 380, height: 48, borderWidth: 1, color: "white", borderColor: "#e6e5eeff" }}>
        </TextInput>

        <Text style={{ color: "white", fontSize: 20 }}>Password </Text>
        <TextInput secureTextEntry placeholder="Password" placeholderTextColor={"white"} style={{ width: 380, height: 48, borderWidth: 1, color: "white", borderColor: "#e6e5eeff" }}>
        </TextInput>


        <Text style={{ color: "white", fontSize: 20 }}>Confirm password</Text>
        <TextInput secureTextEntry placeholder="Confirm password" placeholderTextColor={"white"} style={{ width: 380, height: 48, borderWidth: 1, color: "white", borderColor: "#e6e5eeff" }}>
        </TextInput>

      </View>

      <View>
        <TouchableOpacity onPress={() => ("Register")} style={{ width: 380, height: 48, backgroundColor: "#8875FF", marginTop: 30, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 25 }} >Register</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={{justifyContent:"center", alignItems:"center", top:220 }}
        onPress={()=> router.push("./login") }>
          <Text style={{ color: "white", fontSize: 18 }}>Already have an account?</Text>
        </TouchableOpacity>
      </View>

      <View style={{ top: 20 }}>

        <Image source={require("../../assets/images/register1.png")} style={{
          width: 380
        }} />

      </View>

      <View style={{ top: 40 }}>
        <TouchableOpacity>
          <Image source={require("../../assets/images/register2.png")} style={{
            width: 380
          }} />
        </TouchableOpacity>
      </View>


      <View style={{ top: 60 }}>
        <TouchableOpacity>
          <Image source={require("../../assets/images/register3.png")} style={{
            width: 380
          }} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Register