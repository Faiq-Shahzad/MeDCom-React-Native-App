import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Image} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import Onboarding from 'react-native-onboarding-swiper';

function FirstScreen({navigation}) {
  return (

    <Onboarding
      onSkip = {() => navigation.navigate('Home')}
      onDone = {() => navigation.navigate('Home')}
      pages={[
        {
          backgroundColor: '#809692',
          image: <Image source={require('../assets/firstscreen.png')} style={{width:200, height:200}}/>,
          title: 'MeDCom',
          subtitle: 'An EHR application for patients to search Doctors and Make Appointments',
        },
        {
          backgroundColor: "#b5bab9",
          image: <Image source={require("../assets/secondscreen.png")} style={{width:200, height:200}}/>,
          title: 'Medical Records',
          subtitle: "Manage and Prescribe Medicines to the Patients"
        },
      ]}
    />

  );
}

export default FirstScreen;