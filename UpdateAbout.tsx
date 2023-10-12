import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Image, View, FlatList, Button, Pressable, Alert, TouchableOpacity, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'

export function UpAbout({ route, navigation }) {

    const [about, setAbout] = useState();
    const[newAbout , setNewAbout] = useState();

    const ui = (

        <SafeAreaView style={{ flex: 1 }}>



            <View style={{ backgroundColor: "#45B42B", width: "100%" }}>
                <Text style={{ fontSize: 25, color: "white", fontWeight: "bold", padding: 10, marginHorizontal: 10, }}>Update Name</Text>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", marginHorizontal: 20, flex: 1 }}>
                <SelectDropdown
                    defaultButtonText="Select About"
                    data={newAbout}
                    onSelect={setNewAbout}
                    buttonStyle={{ width: "100%" }}
                />



                <Pressable style={{ backgroundColor: "#00ff80", borderRadius: 10, marginTop: 50, width: 100, justifyContent: "center", alignItems: "center" }} onPress={updateabout}>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: "white", padding: 5, }}>Save</Text>
                </Pressable>


            </View>




        </SafeAreaView>

    );

    function loadAbout() {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState == 4 && request.status == 200) {
            var aboutArray = JSON.parse(request.responseText);
            setNewAbout(aboutArray);
          }
        }
        request.open("GET", "http://10.0.2.2/message_chat/loadAbout.php", true)
        request.send();
    
      }
   

      useEffect(loadAbout,[]);

    function updateabout() {

        const formData = new FormData();
        formData.append("about", newAbout);
        formData.append("id", route.params.id);

        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                Alert.alert("message", request.responseText);
            }
        }
        request.open("POST", "http://10.0.2.2/message_chat/updateAbout.php", true);
        request.send(formData);

    }

    return ui;

}