import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const third = () => {
  return (


    <View style={{ flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center" }}>

      <Image source={require('../../assets/images/thirdpage1.png')} style={{ position: 'absolute', top: 150, left: 60, resizeMode: "contain" }} />

      <Image source={require('..//../assets/images/page3.png')} style={{
        position: "absolute", top: 480
      }} />
      <Text style={{
        color: "white", fontWeight: 'bold', fontSize: 32, position: "absolute", top: 500
      }}>Create daily routine</Text>

      <View style={{ justifyContent: "center", alignContent: "center", position: 'absolute', top: 550 }}>
        <Text style={{ color: "white", textAlign: "center" }}>In Uptodo  you can create your personalized routine to stay productive</Text>
      </View>

      <View>
        <TouchableOpacity style={{ width: 50, height: 60, justifyContent: "center", alignItems: "center", borderRadius: 10, position: "absolute", left: -200, top: -365 }} onPress={() => router.replace("/login")}>
          <Text style={{ color: "white", fontSize: 20 }}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{ width: 50, height: 40, borderRadius: 10, alignItems: "center", justifyContent: "center", position: "absolute", top: 340, left: -180, backgroundColor: "blue" }} onPress={() => router.push("/(tabs)/SecondPage")}>
          <Text style={{ color: "white", fontSize: 15 }}>Back</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={{ width: 50, height: 40, borderRadius: 10, backgroundColor: "#8875FF", justifyContent: "center", position: "absolute", top: 340, left: 125, alignItems: "center" }} onPress={() => router.push("/(tabs)/fourth")}>
            <Text>
              Next
            </Text>

          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default third