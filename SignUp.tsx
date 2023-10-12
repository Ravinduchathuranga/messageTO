import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Image, View, FlatList, Button, Pressable, Alert, TouchableOpacity, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export function SignUp({navigation}) {

    const [country, setCountry] = useState();
    const [images, setImages] = useState(null);
    const [name,setName] = useState("");
    const [mobile,setMobile] = useState("");
    const [password , setPassword] = useState("");


    var img;

    if (images == null) {
        img = require("./images/user.png");
    } else {
        img = { uri: `${images.uri}` };
    }


    const ui = (

        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Pressable onPress={selectProfilePicture}>
                <Image source={img} style={{ width: 100, height: 100, borderRadius: 50, }} />
            </Pressable>

            <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 20, width: "100%" }}>

                <TextInput placeholder="Name" style={{ borderBottomColor: "#45B42B", borderBottomWidth: 2, width: "100%",marginTop:10,fontSize:18, }} autoCorrect={false} onChangeText={setName}/>

                <View style={{ width: "100%", flexDirection: "row",marginTop:10, }}>

                    <View style={{ width: "50%", marginHorizontal: 2 }}>
                        <TextInput placeholder="Mobile Number" keyboardType="numeric" maxLength={10} style={{ borderBottomColor: "#45B42B", borderBottomWidth: 2, width: "100%",fontSize:18,padding:5 }} onChangeText={setMobile}/>
                    </View>

                    <View style={{ width: "48%", marginHorizontal: 5 }}>
                        <TextInput placeholder="Password" secureTextEntry={true} style={{ borderBottomColor: "#45B42B", borderBottomWidth: 2, width: "100%",fontSize:18,padding:5 }} onChangeText={setPassword}/>
                    </View>

                </View>

                <SelectDropdown
                    defaultButtonText="Select Country"
                    data={country}
                    onSelect={setCountry}
                    buttonStyle={{ width: "100%", marginTop: 20, }}
                />

                <Pressable style={{ marginTop: 20, marginBottom: 10, backgroundColor: "#45B42B", width: 150, height: 50, justifyContent: "center", alignItems: "center", borderRadius: 20, }} onPress={uploadDetalis}>
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, }}>Sign Up</Text>
                </Pressable>

                <Pressable onPress={signIn}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#808080" }}>Are You Sign Up? Sign In</Text>
                </Pressable>

            </View>

        </SafeAreaView>

    );

    function signIn() {
        navigation.navigate("Sign In");
    }

    async function selectProfilePicture() {
        const options = {
            mediaType: 'photo',
            // camaraType: 'front',
        };

        const result = await launchImageLibrary(options);
        // const result = await launchCamera(options);

        if (result.didCancel) {
            Alert.alert('Alert', 'No select Image');
        } else {
            const imageObjet = {
                uri: result.assets[0].uri,
                name: 'profile.png',
                type: 'image/png',
            };

            setImages(imageObjet);
        }
    }

    function uploadDetalis(){

        const formData = new FormData();
        formData.append("name",name);
        formData.append("mobile",mobile);
        formData.append("country",country);
        formData.append("password",password);
        formData.append("profileImg",images);

        const request = new XMLHttpRequest();

        request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                if (request.responseText == "Success") {
                    navigation.navigate('Sign In');
                } else {
                    Alert.alert("Message", request.responseText);
                }
            }
        }

        request.open("POST","http://10.0.2.2/message_chat/signUp.php",true);
        request.send(formData);

    }

    function loadCountry(){

        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState == 4&& request.status ==200){
       
                var countryArray = JSON.parse(request.responseText);
            
                setCountry(countryArray);
            }
        }
        request.open("GET","http://10.0.2.2/message_chat/loadCountry.php",true)
        request.send();

    }

    loadCountry();

    return ui;

}