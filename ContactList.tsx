import React, { useState,useEffect } from "react";
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, Touchable, TouchableHighlight, TouchableOpacity, View, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ContextMenu from "react-native-context-menu-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ContactList({ navigation }) {

    const [items, setItems] = useState()

    const ui = (

        <SafeAreaView style={styles.contactMain}>

            <View style={styles.view}>

                <View style={styles.body}>
                    <Text style={styles.homeText}>Select Contact</Text>
                </View>
                <View style={styles.iconBtn}>

                    <Pressable onPress={search}>
                        <View style={{ flexDirection: "row", }}>
                            <Icon name="search" style={styles.icon} />
                            <ContextMenu actions={[{ title: 'LogOut' }, { title: 'Settings' }]} dropdownMenuMode={true} onPress={e => {
                                if (e.nativeEvent.index == 0) {
                                    Alert.alert('Log Out', 'Log Out Your Account', [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Log Out',
                                            onPress: () => {
                                                AsyncStorage.setItem('user', '');
                                                navigation.navigate({ name: 'Sign In' });
                                            },
                                        },
                                    ]);
                                } else if (e.nativeEvent.index == 1) {
                                    navigation.navigate("My Profile");
                                }
                            }}
                            >

                                <Pressable>
                                    <Icon name="ellipsis-v" style={styles.icon} />
                                </Pressable>

                            </ContextMenu>

                        </View>
                    </Pressable>
                </View>
                {/* <TextInput style={styles.homeInput} placeholderTextColor="white" placeholder="Search here" /> */}



            </View>



            <FlatList data={items} renderItem={ItemUi} />


        </SafeAreaView>

    );



    function search() {
        navigation.navigate("SerachUser");
    }

    async function loadUser(text) {

        const userJsonText = await AsyncStorage.getItem('user');

        var formData = new FormData();
        formData.append("userJSONText", userJsonText);
        formData.append("text", text);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                // Alert.alert("message",request.responseText);
                setItems(JSON.parse(request.responseText));
                // Alert.alert("message",request.responseText);
            }
        }

        request.open("POST", "http://10.0.2.2/message_chat/newChatUser.php", true);
        request.send(formData);
    }

    function strat() {
        setInterval(function () { loadUser(""); }, 1000);

    }

    useEffect(strat, []);

    return ui;

    function ItemUi({ item }) {

        const ui = (
            <Pressable onPress={chat}>
                <View style={styles.homeBody}>
                    <Image source={{ uri: "http://10.0.2.2/message_chat/" + item.pic }} style={styles.homeImages} />
                    <View style={styles.homeBodyMsgView1}>
                        <Text style={styles.homeBodyMsgName}>{item.name}</Text>
                        <Text style={styles.homeBodyMsgText}>{item.about}</Text>
                    </View>
                    <View style={styles.homeBodyMsgView2}>
                        <Text style={styles.homeBodyMsgText}>{item.time}</Text>
                    </View>
                </View>
            </Pressable>
        );

        return ui;

        function chat() {
            const object = { "name": item.name, "id": item.id, "uri": "http://10.0.2.2/message_chat/" + item.pic, };
            navigation.navigate("Chat", object);
        }

    }

}



const styles = StyleSheet.create(
    {

        icon: {
            marginHorizontal: 35,
            color: "white",
            fontSize: 25,
        },
        iconBtn: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "60%",

        },
        homeText: {
            fontSize: 25,
            fontWeight: 'bold',
            paddingHorizontal: 15,
            paddingVertical: 30,
            color: "#ffffff",


        },
        view: {
            backgroundColor:  "#45B42B",
            flexDirection: "row",
            // width:"90%"
            // justifyContent: "center",
            // alignItems: "center",

        },
        body: {
            flexDirection: "row",
            // justifyContent: "center",
            // alignItems: "center",
            width: "50%",
            // paddingHorizontal: 10,
        },
        contactMain: {
            flex: 1,
        },
        contactText: {
            fontSize: 25,
            fontWeight: 'bold',
            paddingHorizontal: 20,
            paddingVertical: 20,
            color: '#ffffff',
        },
        homeBodyMsgTextCount: {
            fontSize: 17,
            fontWeight: "800",
            color: '#ffffff',
            // backgroundColor: '#158aea',
            // padding:5,
            // borderRadius:50,
        },

        homeBodyMsgView2: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            paddingHorizontal: 40,
            left: 25,

        },

        homeBodyMsgText: {
            fontSize: 17,

        },

        homeBodyMsgName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: "#000000",

        },

        homeBodyMsgView1: {
            justifyContent: 'center',
            // alignItems:'center',
            padding: 10,
        },

        homeImages: {
            height: 60,
            width: 60,
            borderRadius: 50,


        },

        homeBody: {
            paddingVertical: 7,
            flexDirection: 'row',
            paddingHorizontal: 20,
            // justifyContent: 'center',
            // alignItems: 'center',

        },

        homeInputView1: {


        },
        homeInputView2: {

        },
        homeInput: {

            borderBottomWidth: 3,
            borderStyle: "solid",
            width: "62%",
            height: 42,
            padding: 12,
            fontSize: 18,
            // borderRadius: 10,
            borderBottomColor: '#ffffff',

        },
        countCircle: {
            width: 25,
            height: 25,
            borderRadius: 20,
            backgroundColor: "#00acbf",
            justifyContent: 'center',
            alignItems: 'center',

        },

    }
);
