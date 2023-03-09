import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchDoctors from '../screens/SearchDoctors';
import HomePage from '../screens/HomePage';
import Categories from '../screens/Categories';
import RecentAppointments from '../screens/RecentAppointments';
import Profile from '../screens/Profile';
import {AuthContext} from '../navigation/AuthProvider.js';
import RecordScreen from '../screens/Record';
import CustomHeader from '../components/CustomHeader';
import Doctors from '../screens/Doctors';

export default function PatientTabMavigation({navigation}) {
  const [patient, setPatient] = useState('patient');

  const {user, logout} = useContext(AuthContext);

  const signout = () => {
    Alert.alert('Log Out', 'Confirm Logout!', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Confirm', onPress: () => logout()},
    ]);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={signout}>
          <MaterialCommunityIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          title: 'Categories',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {backgroundColor: '#555DF2'},
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="medical-bag"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Doctors"
        component={Doctors}
        options={{
          title: 'Doctors',
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {backgroundColor: '#555DF2'},
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="doctor" size={24} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Medical Access"
        component={SearchDoctors}
        options={{
          headerShown: false,
          title: 'Access',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="archive-lock" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Medical record"
        component={RecordScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="history" size={24} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Appointments"
        component={Profile}
        initialParams={{patient}}
        options={{
          headerShown: true,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="note-text" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Profile}
        initialParams={{patient}}
        options={{
          headerShown: true,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="menu" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
