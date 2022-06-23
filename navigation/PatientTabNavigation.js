import React, {useState, useEffect, useContext} from 'react';
import { Text, View, Image,FlatList, Alert, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchDoctors from '../screens/SearchDoctors';
import RecentAppointments from '../screens/RecentAppointments';
import Profile from '../screens/Profile';
import { AuthContext } from '../navigation/AuthProvider.js';


export default function PatientTabMavigation({navigation}) {
  const [patient, setPatient] = useState("patient");

  const {user, logout} = useContext(AuthContext);

  const signout = () =>{
    Alert.alert(
      "Log Out",
      "Confirm Logout!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Confirm", 
          onPress: () =>logout()

        }
      ]
    );

  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={signout}>
                <MaterialCommunityIcons name="logout" size={24} color="grey" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator>
        <Tab.Screen name="Search Doctors" component={SearchDoctors} options={{ headerShown: false, title: "Doctors", tabBarIcon:({color})=>(
        <MaterialCommunityIcons name="doctor" size={24} color={color} />)}}/>
        <Tab.Screen name="Recent Appointments" component={RecentAppointments} options={{headerShown: false, tabBarIcon:({color})=>(
        <MaterialCommunityIcons name="history" size={24} color={color} />)}}/>
        <Tab.Screen name="Profile" component={Profile} initialParams={{patient}} options={{ headerShown: false, tabBarIcon:({color})=>(
        <MaterialCommunityIcons name="account" size={24} color={color} />)}}/>
    </Tab.Navigator>
  );
}