import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, Image, View, FlatList, Button, Pressable, Alert, TouchableOpacity, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function SignIn({ navigation }) {

  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);

  const SignInUI = (


    <SafeAreaView style={styles.signInMain} >

      <ScrollView style={{ height: "100%" }}>

        <View style={styles.view}>


          <Image source={require('./images/logo.png')} style={styles.sginInImage} />


          <View style={styles.signInView1}>
            <Icon style={styles.signInIcon1} name="mobile" />
            <TextInput style={styles.signInInput1} autoCorrect={false} inputMode={"numeric"} maxLength={10} onChangeText={setMobile} placeholder="Mobile Number" />
          </View>

          <View style={styles.signInView1}>
            <Icon style={styles.signInIcon2} name="lock" />
            <TextInput style={styles.signInInput1} secureTextEntry={true} onChangeText={setPassword} placeholder="Password" />
          </View>

          <Pressable style={styles.signInButton1} onPress={signInProcess}>
            <Text style={styles.sginInButtonText2} >Sign In</Text>
          </Pressable>
          <Pressable onPress={signUp}>
            <Text style={{fontSize:18,fontWeight:"700",color:"#808080"}}>Are you New User? Sign Up</Text>
          </Pressable>

        </View>


      </ScrollView>

    </SafeAreaView>


  );

  

  function signUp() {
    navigation.navigate("Sign Up");
  }


  function signInProcess() {

    var javaScriptObject = {
      "mobile": mobile,
      "password": password,
    }

    var jsonRequestText = JSON.stringify(javaScriptObject);


    var formData = new FormData();
    formData.append("jsonRequestText", jsonRequestText);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        // Alert.alert("message", request.responseText);
        var jsResponesObject = request.responseText;

        var jsonResponesObject = JSON.parse(jsResponesObject);

        if (jsonResponesObject.message == "error") {
          Alert.alert("Inavlid Mobile Number or Password Plase Check.");
        } else {

          var userObject = jsonResponesObject.user;
          AsyncStorage.setItem("user", JSON.stringify(userObject));
          navigation.navigate('Home');
        }


          // }

        }
      };

      request.open("POST", "http://10.0.2.2/message_chat/signIn.php", true);
      request.send(formData);


    }

    return SignInUI;

  }


const styles = StyleSheet.create({

  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },


  signInMain: {
    flex: 1,
  },
  signInView1: {
    flexDirection: "row",
    alignItems: 'center',
  },
  signInIcon1: {
    fontSize: 27,
    position: "absolute",
    color: "#000000",
    start: 5,
  },
  signInIcon2: {
    fontSize: 25,
    position: "absolute",
    color: "#000000",
    start: 5,
  },
  signInInput1: {
    width: "80%",
    height: 45,
    fontSize: 20,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderBottomColor: "#45B42B",
    paddingHorizontal: 27,


  },
  signInButton1: {
    width: "80%",
    height: 45,
    backgroundColor: "#45B42B",
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    // opacity:0.8,
  },
  sginInButtonText2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#ffffff",
    justifyContent: 'center',

  },

  sginInButtonText1: {
    fontSize: 20,
    fontWeight: "400",
    color: "#000000",
    justifyContent: 'center',
    marginVertical: 10,
    opacity: 10,
  },

  sginInImage: {
    width: 200,
    height: 200,

  },

});

