import React, { useState } from "react";
import { SignIn } from "./SignIn";
import { Home } from "./Home";
import { Chat } from "./Chat";
import { ContactList } from "./ContactList";
import { MyProfile } from "./MyProfile";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UpName } from "./UpName";
import { UpAbout } from "./UpdateAbout";
import { UpdateProfileImg } from "./UpdateProfileImg";
import { SignUp } from "./SignUp";
import { Splash } from "./Splash";

const Stack = createNativeStackNavigator();

function App() {

  // async function user() {
  //   const user = await AsyncStorage.getItem('user');
  //   return user;
  // }

  const ui = (

    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Splash"}>
        <Stack.Screen name='Sign In' component={SignIn} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Chat' component={Chat} />
        <Stack.Screen name='ContactList' component={ContactList} />
        <Stack.Screen name='MyProfile' component={MyProfile} />
        <Stack.Screen name='Update Name' component={UpName} />
        <Stack.Screen name='Update About' component={UpAbout} />
        <Stack.Screen name='Update Profile' component={UpdateProfileImg} />
        <Stack.Screen name='Sign Up' component={SignUp} />
        <Stack.Screen name='Splash' component={Splash} /> 
      </Stack.Navigator>
    </NavigationContainer>


  );

  return ui;

}


export default App;