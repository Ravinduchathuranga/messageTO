import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Image, View, FlatList, Button, Pressable, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

export function UpdateProfileImg({ route, navigation }) {

    const [profileImage, setProfileImg] = useState(null);

    var img;

    if (profileImage == null) {
        img = require("./images/user.png");
    } else {
        img = { uri: `${profileImage.uri}` };
    }

    const ui = (

        <SafeAreaView style={{ flex: 1 }}>



            <View style={{ backgroundColor: "#45B42B", width: "100%" }}>
                <Text style={{ fontSize: 25, color: "white", fontWeight: "bold", padding: 10, marginHorizontal: 10, }}>Update Name</Text>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", marginHorizontal: 20, flex: 1 }}>

                <Pressable onPress={selectProfilePicture}>
                    <View style={{width: 100, height: 100, borderRadius: 80,justifyContent:"center",alignItems:"center", }}>
                        {/* <Icon name="photo" style={{fontSize: 25, position: "absolute",}}/> */}
                        <Image source={img} style={{ width: 160, height: 160, borderRadius: 80, }} />
                    </View>
                </Pressable>

                <Pressable style={{ backgroundColor: "#00ff80", borderRadius: 10, marginTop: 50, width: 100, justifyContent: "center", alignItems: "center" }} onPress={updateProfileImg}>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: "white", padding: 5, }}>Save</Text>
                </Pressable>


            </View>




        </SafeAreaView>

    );

    

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

            setProfileImg(imageObjet);
        }
    }


    function updateProfileImg() {

        var formData = new FormData();
        formData.append("id", route.params.id);
        formData.append("newProfile", profileImage);
        formData.append("mobile",route.params.mobile);
    
        var request = new XMLHttpRequest();
    
        request.onreadystatechange = function () {
          if (request.readyState == 4 && request.status == 200) {
            Alert.alert("Message", request.responseText);
          }
        }
    
        request.open("POST", "http://10.0.2.2/message_chat/updateProfileImg.php", true);
        request.send(formData);
    
      }
    return ui;

}