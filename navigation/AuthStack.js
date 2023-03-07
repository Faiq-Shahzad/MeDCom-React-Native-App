import React, {useState, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/LoginScreen.js";
import SignupScreen from "../screens/SignupScreen.js";
import MainScreen from "../screens/MainScreen.js";
import FirstScreen from '../screens/FirstScreen.js';


const Stack = createNativeStackNavigator();

const AuthStack =  () => {
  return (

    <Stack.Navigator>
      <Stack.Screen name="FirstPage" component={FirstScreen} options={{ headerShown:false }}/>
      <Stack.Screen name="Home" component={MainScreen} options={{ headerShown:false }}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false }}/>
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown:false }}/>
      
    </Stack.Navigator>
  );
}

export default AuthStack;
  