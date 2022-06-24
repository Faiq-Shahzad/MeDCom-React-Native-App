import React, {useState, useContext, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Image} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import Onboarding from 'react-native-onboarding-swiper';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../navigation/AuthProvider';

function MainScreen({navigation}) {
  const {doctor_id, setDoctor} = useContext(AuthContext);
  return (

    <View style={{flex:1, backgroundColor:"#07f2e7"}}>
      <Animatable.View style={{justifyContent: 'center', alignItems: 'center', height:"35%", backgroundColor:"#07f2e7"}} animation="fadeInDownBig" duration={1500}>
        <Animatable.Image animation="bounceIn" source = {require('../assets/mainscreen.png')} style={{width:200, height:200}} resizeMode="stretch" />
      </Animatable.View>

      {/* <ImageBackground style={{flex: 1, alignItems:"center", width:"100%"}} source={{uri:"https://img.lovepik.com/background/20211029/medium/lovepik-flat-health-medical-service-hd-background-image_605816816.jpg"}} resizeMode="cover"> */}
      <Animatable.View style={{flex: 1, alignItems:"center", width:"100%",backgroundColor:"#fc424b", borderTopLeftRadius:40, borderTopRightRadius:40}} animation="fadeInUpBig" duration={1500}> 
        <View style={{alignItems:"center", padding:13, marginTop:"7%", borderRadius:20}}>
          <View style={{flexDirection:"row", marginBottom:"20%"}}>
            <Text style={{fontSize:50, fontWeight:"bold", color:"dodgerblue"}}>MeD</Text>
            <Text style={{fontSize:50, fontWeight:"bold", color:"white"}}>Com</Text>
          </View>
          <Button mode='contained' style={{marginTop:20, padding:5, backgroundColor:"green", width:"70%"}} onPress={()=> navigation.navigate("Login")}>Login</Button>
          <Text style={{color:"grey"}}>__________________________________________</Text>
          <Button mode='contained' style={{marginTop:20, padding:5, backgroundColor:"dodgerblue", width:"65%"}} onPress={()=> navigation.navigate("Signup")}>Sign Up</Button>
          <Text style={{color:"grey"}}>__________________________________________</Text>
          <Button mode='contained' style={{marginTop:20, padding:5, backgroundColor:"lightblue", width:"65%"}} onPress={()=> setDoctor("BgSp51Pn9CIB3tPdEF1s")}>DOCTOR</Button>
        </View>
      </Animatable.View>
      {/* </ImageBackground> */}
      
    </View>
  );
}

export default MainScreen;
  