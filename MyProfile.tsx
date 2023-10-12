import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, Touchable, TouchableHighlight, TouchableOpacity, View, ScrollView, Alert, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
// import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export function MyProfile({ route, navigation }) {

    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [about, setAbout] = useState();
    const [newName, setNewName] = useState();
    const [newProfile, setNewProfile] = useState(null);
    const [newAbout, setNewAbout] = useState();
    const [id, setId] = useState();

    var img;

    if (newProfile == null) {
        img = require("./images/user.png");
    } else {
        img = { uri: `${newProfile.uri}` };
    }

    const ui = (

        <SafeAreaView style={styles.main}>

            <View style={styles.titleView}>
                <Text style={styles.titleText}>Settings</Text>
            </View>

            <View style={styles.mainView}>

                <TouchableOpacity onPress={updateProfile}>
                    <Image source={{ uri: 'http://10.0.2.2/message_chat/' + profileImage}} style={styles.image} />
                </TouchableOpacity>

                <View style={styles.iconView}>
                    <TextInput style={styles.text}>{name}</TextInput>
                    <TouchableOpacity onPress={updateName}>
                        <Icon name="edit" style={styles.icon} />
                    </TouchableOpacity>

                </View>
            </View>



            <ScrollView style={{ width: "100%" }}>



                <View style={styles.nameView}>
                    <Text style={styles.nameText}>About : </Text>
                    <View style={styles.iconView}>
                        <Text style={styles.TextInput}>{about}</Text>
                        <TouchableOpacity onPress={updateAbout}>
                            <Icon name="edit" style={styles.icon} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.nameView}>
                    <Text style={styles.nameText}>Mobile Number : </Text>
                    <View style={styles.iconView}>
                        <Text style={styles.TextInput}>{mobile}</Text>
                        <TouchableOpacity >
                            <Icon name="edit" style={styles.icon} />
                        </TouchableOpacity>

                    </View>
                </View>





            </ScrollView>



        </SafeAreaView>

    );

    function updateProfile(){
        const object = { "name":name,"id":id,"mobile":mobile};
        navigation.navigate("Update Profile", object);
    }

    function updateName(){
        const object = { "name":name,"id":id};
        navigation.navigate("Update Name", object);
    }

    function updateAbout(){
        const object = { "about":about,"id":id};
        navigation.navigate("Update About", object);
    }

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

    useEffect(loadAbout, []);


    async function loadDetalis() {
        const user = await AsyncStorage.getItem("user");
        const userObject = JSON.parse(user);

        const formData = new FormData();
        formData.append("userObject", userObject.id);

        const request = new XMLHttpRequest()
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                // Alert.alert("message",request.responseText);
                var responseObject = JSON.parse(request.responseText);
                setName(responseObject.name);
                setMobile(responseObject.mobile);
                setProfileImage(responseObject.profile_url);
                setAbout(responseObject.about);
                setId(responseObject.id);

            }
        }
        request.open("POST", "http://10.0.2.2/message_chat/loadDetalis.php", true);
        request.send(formData);



    }

    function load() {
        setInterval(function () { loadDetalis(); }, 1000);
    }

    useEffect(load, []);




    return ui;

}




const styles = StyleSheet.create(
    {
        password: {
            borderBottomWidth: 2,
            borderBottomColor:  "#45B42B",
            width: "80%",
        },

        mobileNumber: {
            borderBottomWidth: 2,
            borderBottomColor: "#45B42B",
            width: "80%",

        },
        selectView: {
            marginTop: 30,
            justifyContent: "center",
            alignItems: "center",
        },
        aboutText: {
            fontWeight: "bold",
            fontSize: 20,
            color: "#ffffff",
            paddingVertical: 20,
        },

        bottomSheet: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:  "#45B42B",
        },
        iconView: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",

        },
        icon: {
            fontSize: 20,
            color:  "#45B42B",
            fontWeight: "900"

        },
        TextInput: {
            borderBottomWidth: 2,
            borderBottomColor:  "#45B42B",
            fontSize: 17,
            paddingVertical: 10,
            paddingHorizontal: 5,
            width: "90%",

        },
        nameText: {
            fontSize: 17,
            fontWeight: "600",

        },
        nameView: {
            width: "100%",
            paddingHorizontal: 45,
            paddingVertical: 20,
            // paddingBottom:10,
        },
        img: {
            borderWidth: 1,
            borderRadius: 50,
            width: 60,
            height: 60,
        },

        imgView: {
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
        },

        textName: {
            paddingHorizontal: 2,
            fontSize: 15,
            fontWeight: "800",
            marginTop: 3,
            color: "#000000",
        },
        input: {
            borderBottomWidth: 2,
            borderBottomColor:  "#45B42B",
            padding: 10,

        },
        view1: {
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 2,
        },

        titleText: {
            fontSize: 25,
            fontWeight: 'bold',
            paddingHorizontal: 20,
            paddingVertical: 20,
            color: "#ffffff",
        },

        titleView: {
            backgroundColor: "#45B42B",
        },

        textView: {
            width: "50%",
            paddingHorizontal: 20,
        },

        btnView: {
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
        },
        btnText: {
            color: "white",
            fontSize: 20,
            fontWeight: "700",
        },

        btn: {
            backgroundColor:  "#45B42B",
            borderRadius: 5,
            height: 42,
            width: "50%",
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 25,


        },

        newText: {
            fontSize: 16,
            color: "#000000",
            fontWeight: "500",
        },

        text1: {
            fontSize: 15,
            fontWeight: "500",
            color: "#c0c0c0",

        },


        mainView: {
            // flexDirection: "row",
            marginTop: 15,
            justifyContent: "center",
            alignItems: "center",
        },
        main: {
            flex: 1,
        },
        image: {
            height: 65,
            width: 65,
            borderRadius: 50,
            paddingHorizontal: 10,
            marginLeft: 10,
        },
        text: {
            borderBottomWidth: 2,
            borderBottomColor:  "#45B42B",
            paddingHorizontal: 10,
            fontSize: 18,
            fontWeight: "800",
            color: "#000000",
        },


    }
);