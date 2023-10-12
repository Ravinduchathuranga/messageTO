import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function Splash({ navigation }) {

    function load(){
        check();
    }

    async function check() {

        const splash = await AsyncStorage.getItem("user");

        if(splash == null){
            navigation.navigate("Sign In");
        }else{
            navigation.navigate("Home");
        }

    }

    const ui = (
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>

        </SafeAreaView>
    );

    useEffect(load,[]);

    return ui;
}