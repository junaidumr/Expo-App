import { router, Router } from 'expo-router'
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native'
import React, { use, useState } from 'react'

const profile = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "black" }}>

            <View style={{ alignItems: "center" }}>

                <Text style={{ color: "white", fontSize: 20, top: 20, fontWeight: "bold" }}>Profile</Text>
                <Image source={require("../../assets/images/profile.png")} style={{ marginTop: 30 }} />
                <Text style={{ color: "white", fontSize: 20, marginTop: 10 }}>Martha Hays</Text>
            </View>

            <View style={{ justifyContent: "space-evenly", flexDirection: "row", marginTop: 20 }}>
                <TouchableOpacity style={{ backgroundColor: "#363636", width: 100, height: 40, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}> 10 task left</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ backgroundColor: "#363636", width: 100, height: 40, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "white", fontWeight: "bold" }}> 5 task dine</Text>
                </TouchableOpacity>
            </View>


            <View style={{ gap: 10, marginTop: 20, alignItems: "center" }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>Settings</Text>
                <TouchableOpacity onPress={() => setModalVisible2(true)}>
                    <Image source={require("../../assets/images/account3.png")} />
                </TouchableOpacity>
                <Modal visible={modalVisible2} animationType='slide' transparent onRequestClose={() => setModalVisible2(false)}>
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
                        <View style={{ backgroundColor: "#363636", width: 400, height: 200, alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "white", top: 10 }}>
                                Change account Image
                            </Text>

                            <View style={{ top: 30 }}>
                                <Image source={require("../../assets/images/new.png")} style={{}} />

                                <View style={{ gap: 10, top: 20 }}>
                                    <TouchableOpacity onPress={() => setModalVisible2(false)}>
                                        <Text style={{ color: "white", fontSize: 20 }}>Tack picture </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>

                                        <Text style={{ color: "white", fontSize: 20 }}>Import from gallery</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>

                                        <Text style={{ color: "white", fontSize: 20 }}>Import from Google Drive</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    </View>

                </Modal>
                <Text style={{ color: "white", fontWeight: "bold" }}>Account</Text>

                <View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image source={require("../../assets/images/account1.png")} />
                    </TouchableOpacity>

                    <Modal
                        visible={modalVisible}
                        animationType="fade"
                        transparent
                        onRequestClose={() => setModalVisible(false)}

                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "rgba(0,0,0,0.5)",
                                justifyContent: "center",
                                alignItems: "center",

                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "white",
                                    padding: 60,
                                    borderRadius: 10,
                                    width: "85%",
                                    alignItems: "center",


                                }}
                            >
                                <View style={{ justifyContent: "space-evenly", gap: 10 }}>

                                    <Text style={{ color: "black", fontSize: 18, marginBottom: 15 }}>
                                        Change account name
                                    </Text>
                                    <TextInput placeholder='Set name' placeholderTextColor={"black"} style={{ width: 230, height: 40, }}>
                                    </TextInput>

                                    <TextInput placeholder='Confirm your name'
                                        placeholderTextColor={"black"} secureTextEntry>

                                    </TextInput>


                                    <TouchableOpacity onPress={() => { setModalVisible(false); Alert.alert("Successfully changed!") }}
                                        style={{
                                            backgroundColor: "#363636",
                                            paddingVertical: 10,
                                            paddingHorizontal: 25,
                                            borderRadius: 8,
                                            marginBottom: 10,
                                        }}
                                    >
                                        <Text style={{ color: "white", fontWeight: "bold" }}>Update</Text>
                                    </TouchableOpacity>
                                </View>


                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={{
                                        backgroundColor: "#363636",
                                        paddingVertical: 10,
                                        paddingHorizontal: 25,
                                        borderRadius: 8,
                                        marginBottom: 10,
                                        width: 230,
                                        height: 38
                                    }}
                                >
                                    <Text style={{ color: "white", fontWeight: "bold" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>


                <View style={{}}>

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image source={require("../../assets/images/account2.png")} />
                    </TouchableOpacity>
                    <Modal visible={modalVisible} animationType='fade' transparent onRequestClose={() => setModalVisible(false)}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#rgba(0,0,0,0.5)", width: 100 }}>
                            <View style={{ width: 100 }}>

                            </View>

                        </View>

                    </Modal>

                </View>
                <TouchableOpacity>
                    <Image source={require("../../assets/images/account3.png")} />
                </TouchableOpacity>
                <Text style={{ color: "white" }}>Uptodo</Text>





                <View>
                    <TouchableOpacity onPress={() => setModalVisible1(true)}>
                        <Image source={require("../../assets/images/uptodo1.png")} />
                    </TouchableOpacity>
                    <Modal visible={modalVisible1} animationType='fade' transparent onRequestClose={() => setModalVisible1(false)}>
                        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignContent: "center" }}>
                            <View style={{ backgroundColor: "#829B85", width: 400, height: 400, justifyContent: "center" }}>
                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 32 }}>
                                    Welcome to our app! This application is designed to make your daily
                                    tasks easier and more organized. Our goal is to provide a simple,
                                    clean, and user-friendly experience for everyone.
                                </Text>

                                <TouchableOpacity onPress={() => setModalVisible1(false)} style={{ width: 350, height: 50, backgroundColor: "black", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                    <Text style={{ color: "white", fontWeight: "bold" }}>
                                        Go Back
                                    </Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    </Modal>
                </View>





                <TouchableOpacity>
                    <Image source={require("../../assets/images/uptodo2.png")} />
                </TouchableOpacity>


                <View>
                    <TouchableOpacity onPress={() => setModalVisible3(true)}>
                        <Image source={require("../../assets/images/uptodo3.png")} />
                    </TouchableOpacity>
                    <Modal visible={modalVisible3} animationType="slide" transparent onRequestClose={() => setModalVisible3(false)}>
                        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignContent: "center" }}>
                            <View style={{ width: "100%", height: 400, backgroundColor: "#6082B6", justifyContent:"center", borderRadius:20, alignItems:"center" }}>
                                <View style={{ alignItems:"center", justifyContent:"center"}}>
                                <Text style={{fontSize:20, fontWeight:"bold", justifyContent:"center", alignSelf:"center", alignItems:"center"  }}>
                                    Help & Feedback
                                    If you face any problem while using the app or have suggestions to improve it, please share your feedback with us.
                                    You can contact our support team at support@example.com
                                    or use the form below to send your message.
                                    We value your opinion and try our best to respond as soon as possible.
                                </Text>
                                <TouchableOpacity onPress={()=> setModalVisible3(false)} style={{ width:60, height:40 , backgroundColor:"blue"}}>
                                    <Text style={{alignItems:"center"}}>
                                        Got it 
                                    </Text>
                                </TouchableOpacity>
                                </View>

                            </View>

                        </View>

                    </Modal>
                </View>


                <TouchableOpacity>
                    <Image source={require("../../assets/images/uptodo4.png")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push("./login")}>
                    <Image source={require("../../assets/images/uptodo5.png")} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default profile