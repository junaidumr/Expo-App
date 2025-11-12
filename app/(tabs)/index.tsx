import { View, Text ,Image, Button,Alert} from 'react-native'
import React from 'react'
import { router } from 'expo-router'
export default function index() {
  return (
    <View style={{flex:1, backgroundColor:"black", alignItems:"center",  justifyContent:"center" }}>
    <Image source={require("../../assets/images/ch.png")} />
    <Text style={{ fontSize:70, fontWeight:"bold" ,color:"white"}}>UpTodo</Text>
 <Button
  onPress={() => router.push("./SecondPage") }
  title="Learn More"
  color="#841584"
/>
 
 
     </View>

  )
}