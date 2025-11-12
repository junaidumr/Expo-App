import { View, Text, Button, Alert, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useHandler } from 'react-native-reanimated'
import { router, Router } from 'expo-router'
const SecondPage = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black", flexDirection: "column" }}>
      {/* <Image source={require('../../assets/images/ch.png')} /> */}
      <Image source={require('../../assets/images/image.png')} style={{
        width:280, height:270,resizeMode:"contain"
      }} />

      <Image source={require('../../assets/images/lastimage.png')} style={{width:160, position:"absolute", top:585 }} />

      <TouchableOpacity onPress={()=>router.push("./login")} style={{
        alignItems: "flex-start", justifyContent: "flex-start"
      }}>
        <Text style={{ color: "white", padding: 10, borderRadius: 10, position: "relative", top:-465, left:-160 }}> Skip </Text>

      </TouchableOpacity>

      <Text style={{ color: "white", fontSize: 39, fontWeight: "bold", position:"absolute", top:590 }}>Manage your task</Text>

      <View style={{ justifyContent: "center", alignContent: "center", position: 'absolute', top: 640 }}>
        
        <Text style={{ color: "white", textAlign: "center" }}>You can easily manage all of your daily tasks in DoMe for free</Text>
      </View>

      <View style={{}}>
        <TouchableOpacity style={{ width: 50, height: 40, borderRadius: 10, padding: 10, alignItems: "center", justifyContent: "center", position: "absolute", top: 190, left: -180, backgroundColor: "blue"}} onPress={()=> router.push("./")} >
          
          <Text style={{ color: "white", backgroundColor: "blue", fontSize:13 }}>Back</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={{ width:50, height:40, backgroundColor:"#8875FF", alignItems:"center", justifyContent:"center",borderRadius:10, position:"absolute", top:190 , left:120
        }} onPress={()=> router.push("./third")}>

        <Text style={{color:"white"}}>Next</Text>

        </TouchableOpacity>

      </View>

    </View>

  )
}

export default SecondPage