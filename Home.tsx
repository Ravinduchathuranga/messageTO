import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Image, View, FlatList, Button, Pressable, Alert, TouchableOpacity, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContextMenu from "react-native-context-menu-view";


export function Home({ navigation }) {

    const [items, setItems] = useState([]);

    const homeUI = (

        <SafeAreaView style={styles.HomeMain}>

            <View style={styles.body}>
                <View style={styles.view}>
                    <Text style={styles.homeText}>Message</Text>
                </View>

                <View style={styles.iconBtn}>
                    <Pressable >
                        <Icon name="search" style={styles.icon} />
                    </Pressable>
                    <Icon name="camera" style={styles.icon} />
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
                            navigation.navigate("MyProfile");
                        }
                    }}
                    >

                        <Pressable>
                            <Icon name="ellipsis-v" style={styles.icon} />
                        </Pressable>

                    </ContextMenu>
                </View>

            </View>


            {/* <FlatList data={items} renderItem={user} style={{ flex: 1, }} /> */}

            <FlatList data={items} renderItem={user} style={{ flex: 1 }} />

            <TouchableOpacity onPress={list}>
                <View style={styles.profileBtn} >
                    <Icon name="users" style={styles.btnImg} />
                </View>
            </TouchableOpacity>

        </SafeAreaView>

    );

    function list() {
        navigation.navigate("ContactList");
    }

    async function loadUser(text) {

        const userJsonText = await AsyncStorage.getItem("user");

        var formData = new FormData();
        formData.append("userJSONText", userJsonText);
        formData.append("text", text);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                // Alert.alert("Message", request.responseText);
                setItems(JSON.parse(request.responseText));
            }
        }
        request.open("POST", "http://10.0.2.2/message_chat/loadUser.php", true);
        request.send(formData);

    }

    function strat() {
        setInterval(function(){loadUser("");}, 1000);

    };

    useEffect(strat, []);


    function user({ item }) {

        const UI = (

            <Pressable onPress={userChat}>
                <View style={styles.homeBody}>
                    <Image source={require('./images/user.png')} style={styles.homeImages} />
                    <View style={styles.homeBodyMsgView1}>
                        <Text style={styles.homeBodyMsgName}>{item.name}</Text>
                        <Text style={styles.homeBodyMsgText}>{item.message}</Text>
                    </View>
                    <View style={styles.homeBodyMsgView2}>
                        <Text style={styles.homeBodyMsgText}>{item.time}</Text>
                        <View style={item.count == 0 ? styles.hideView : styles.countCircle}>
                            <Text style={styles.homeBodyMsgTextCount}>{item.count}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>

        );

        return UI;


        function userChat() {
            const object = { "name": item.name, "id": item.id };
            navigation.navigate('Chat', object);
        }


    }


    return homeUI;


}

const styles = StyleSheet.create(
    {
        iconBtn: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "60%",

        },

        body: {
            backgroundColor: "#45B42B",
            flexDirection: "row",
            width: "100%",
        },
        icon: {
            marginHorizontal: 20,
            color: "white",
            fontSize: 25,
        },
        hideView: {
            display: "none",
        },

        dropDown: {
            fontSize: 25,
            color: "#ffffff",
            alignItems: "flex-end",
            marginHorizontal: 30,
        },
        bottomSheet: {
            justifyContent: "center",
            backgroundColor: "#45B42B",
        },

        flatList: {
            flex: 1,
        },
        btnImg: {
            fontSize: 35,
            color: "#45B42B",
            position: "absolute",

        },
        profileBtn: {
            alignSelf: "flex-end",
            justifyContent: "flex-end",
            width: 40,
            position: "absolute",
        },

        view: {
            width: "50%",


        },
        homeInput: {
            borderBottomColor: "#ffffff",
            borderBottomWidth: 1,
            width: "80%",
            height: 40,
            padding: 10,
            fontSize: 15,
            borderRadius: 0,
            color: "#ffffff",

        },
        HomeMain: {
            flex: 1,
        },
        homeText: {
            fontSize: 25,
            fontWeight: 'bold',
            paddingHorizontal: 30,
            paddingVertical: 30,
            color: "#ffffff",


        },
        homeBodyMsgTextCount: {
            fontSize: 17,
            fontWeight: "800",
            color: '#ffffff',

        },

        homeBodyMsgView2: {
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 5,
            width: '20%',

        },

        homeBodyMsgText: {
            fontSize: 17,

        },

        homeBodyMsgName: {
            fontSize: 18,
            fontWeight: 'bold',

        },

        homeBodyMsgView1: {
            justifyContent: 'center',
            width: "60%",
            padding: 10,
        },

        homeImages: {
            height: 60,
            width: 60,
            borderRadius: 50,


        },

        homeBody: {
            paddingVertical: 5,
            flexDirection: 'row',
            paddingHorizontal: 5,
            justifyContent: 'center',
            alignItems: 'center',


        },

        countCircle: {
            width: 25,
            height: 25,
            borderRadius: 20,
            backgroundColor: "#45B42B",
            justifyContent: 'center',
            alignItems: 'center',

        },
    }
);