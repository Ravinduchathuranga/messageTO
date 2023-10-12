import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Chat({ route, navigation }) {
    const [chatText, setChatText] = useState();
    const [chatHistory, setChatHistory] = useState();

    const chatUI = (

        <SafeAreaView style={styles.chatSafeArea}>

            <View style={styles.chatView}>
                <View style={{ width: "70%", flexDirection: "row", alignItems: "center" }}>
                    <Image source={require('./images/user.png')} style={styles.chatImage} />
                    <Text style={styles.chatUserName}>{route.params.name}</Text>
                </View>
                <View style={{ width: "30%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Icon name="phone-plus" style={styles.icon} />
                    <Icon name="dots-vertical" style={styles.icon} />
                </View>
            </View>




            <FlatList data={chatHistory} renderItem={ChatItem} style={styles.chatList} />

            <View style={styles.textInputView}>
                <Icon style={styles.inputIcon} name="emoticon-outline" />
                <TextInput style={styles.input} placeholder="Type a message" onChangeText={setChatText} >{chatText}</TextInput>

                <Pressable style={styles.iconBtn}>
                    <Icon style={styles.inputIcon2} name="camera" />
                </Pressable>


                <TouchableOpacity style={styles.btn} onPress={saveChat}>
                    <Icon style={styles.btnText} name="send" />
                </TouchableOpacity>
            </View>

            {/* <TouchableOpacity style={{ opacity: 0.6 }} >
                <View style={styles.profileBtn} >
                    <Icon name="user-plus" style={styles.btnImg} />
                </View>
            </TouchableOpacity> */}

        </SafeAreaView>

    );

    async function messageSend() {

        var userJsonText = await AsyncStorage.getItem('user');
        var userJavaScriptObject = JSON.parse(userJsonText);



        const formData = new FormData();
        formData.append("formUser", userJavaScriptObject.id);
        formData.append("toUser", route.params.id);

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                var responseText = request.responseText
                // Alert.alert("Message",responseText);
                var responseArray = JSON.parse(responseText);
                setChatHistory(responseArray);
            }
        };
        request.open("POST", "http://10.0.2.2/message_chat/loadChat.php", true);
        request.send(formData);

    }


    async function saveChat() {

        var userJsonObject = await AsyncStorage.getItem('user');
        var formUserObject = JSON.parse(userJsonObject);

        var requestObject = { "user_form_id": formUserObject.id, "user_to_id": route.params.id, "message": chatText, };


        const formData = new FormData();
        formData.append("requestJSON", JSON.stringify(requestObject));

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                { setChatText(''); }
                // Alert.alert("message", request.responseText);
            }
        }
        request.open("POST", "http://10.0.2.2/message_chat/saveChat.php", true);
        request.send(formData);

    }

    function chatStart() {
        setInterval(messageSend, 3000);
    }

    useEffect(chatStart, []);

    return chatUI;
}

function ChatItem({ item }) {
    const chatUi = (
        <View style={item.side == "right" ? styles.chatMsgSendRight : styles.chatMsgSendLeft}>
            <Text style={styles.chatMsgSendText}>{item.msg}</Text>
            <View style={styles.chatMsgTextTimeView}>
                <Text style={styles.chatTime}>{item.time}</Text>
            </View>
        </View>
    );
    return chatUi;
}

const styles = StyleSheet.create(
    {
        btnImg: {
            fontSize: 35,
            color: "#00acbf",
            position: "absolute",
          },
        profileBtn: {
            alignSelf: "flex-end",
            justifyContent: "flex-end",
            width: 40,
            position: "absolute",
        },
        inputIcon1: {
            position: "absolute",
            fontSize: 25,
            color: "#808b96",
            padding: 10

        },
        iconBtn: {
            color: "#808b96",
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",

        },

        inputIcon2: {
            position: "absolute",
            fontSize: 25,
            color: "#808b96",

        },
        inputIcon: {
            position: "absolute",
            fontSize: 25,
            color: "#808b96",
            start: 8,
        },
        icon: {
            fontSize: 27,
            color: "#ffffff",
            marginHorizontal: 20,
        },
        btnText: {
            color: "#ffffff",
            fontWeight: "700",
            fontSize: 20,
        },

        btn: {
            backgroundColor: "#45B42B",
            width: 40,
            height: 40,
            padding: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            marginLeft: 0,
            start: 1,
        },
        input: {
            width: "80%",
            paddingHorizontal: 40,
        },

        textInputView: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
            // backgroundColor:"#a93226",
        },
        chatList: {
            width: "100%",
            padding: 10,
        },

        chatMsgTextTimeView: {
            justifyContent: 'center',
            alignItems: 'center',
            // flex:1,
        },

        chatTime: {
            fontSize: 10,
            fontWeight: "200",
            color: "#ffffff",

        },

        chatMsgSendRight: {
            backgroundColor: "#45B42B",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            alignSelf: "flex-end",
            marginRight: 5,
            flexDirection: "row",
            marginBottom: 2,
        },

        chatMsgSendText: {
            color: "#ffffff",
            fontSize: 16,
            padding: 4,
            fontWeight: "500",
        },

        chatMsgSendLeft: {
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            alignSelf: "flex-start",
            marginLeft: 5,
            backgroundColor: " #f7dc6f",
            flexDirection: "row",
            marginBottom: 2,
        },

        chatUserName: {
            fontSize: 18,
            fontWeight: "700",
            padding: 10,
            color: "#ffffff",
        },

        chatImage: {
            height: 65,
            width: 65,
            // paddingVertical:20,
            borderRadius: 50,
            marginBottom: 3,

        },

        chatView: {
            flexDirection: "row",
            // marginVertical: 20,
            paddingHorizontal: 8,
            backgroundColor: "#45B42B",
            padding: 2,
            marginBottom: 10,

        },


        chatSafeArea: {
            flex: 1,
        },

    }

);