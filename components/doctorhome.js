import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../screens/Profile'
import DoctorAppointmentList from '../screens/DoctorAppointmentList';



export default function DoctorHome({navigation}) {

  const [doctor, setDoctor] = useState("doctor")

  const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator>
        <Tab.Screen name="Appointments" component={DoctorAppointmentList} options={{ title: "Appointments", tabBarIcon:({color})=>(
        <Icon name="check-circle" size={24} color={color} />)}}/>
        {/* <Tab.Screen name="Profile" component={Profile} initialParams={{doctor}} options={{ tabBarIcon:({color})=>(
        <MaterialCommunityIcons name="account" size={24} color={color} />)}}/> */}
    </Tab.Navigator>
  );
}