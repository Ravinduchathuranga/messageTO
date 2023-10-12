import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Image, View, FlatList, Button, Pressable, Alert, TouchableOpacity, ScrollView } from 'react-native';

export function UpName({ route, navigation }) {

    const [name, setName] = useState();

    const ui = (

        <SafeAreaView style={{ flex: 1 }}>



            <View style={{ backgroundColor: "#45B42B", width: "100%" }}>
                <Text style={{ fontSize: 25, color: "white", fontWeight: "bold", padding: 10, marginHorizontal: 10, }}>Update Name</Text>
            </View>

            <View style={{ justifyContent: "center", alignItems: "center", marginHorizontal: 20, flex: 1 }}>
                <TextInput style={{ borderBottomWidth: 2, borderBottomColor: "#45B42B", width: "100%" }} placeholder="New Name" onChangeText={setName}>{name}</TextInput>



                <Pressable style={{ backgroundColor: "#00ff80", borderRadius: 10, marginTop: 50, width: 100, justifyContent: "center", alignItems: "center" }} onPress={updatename}>
                    <Text style={{ fontSize: 20, fontWeight: "700", color: "white", padding: 5, }}>Save</Text>
                </Pressable>


            </View>




        </SafeAreaView>

    );


    function updatename() {

        const formData = new FormData();
        formData.append("name", name);
        formData.append("id", route.params.id);

        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                Alert.alert("message", request.responseText);
            }
        }
        request.open("POST", "http://10.0.2.2/message_chat/updateName.php", true);
        request.send(formData);

    }

    return ui;

}