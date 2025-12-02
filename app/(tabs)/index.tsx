import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'

export default function index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/SecondPage")
    }, 2000) 
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>
      <Image source={require("../../assets/images/ch.png")} />
      <Text style={{ fontSize: 70, fontWeight: "bold", color: "white" }}>UpTodo</Text>
    </View>
  )
}