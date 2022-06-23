import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';

function MainScreen({navigation}) {
  return (

    <View style={{flex:1}}>

      <ImageBackground style={{flex: 1, alignItems:"center", width:"100%"}} source={{uri:"https://img.lovepik.com/background/20211029/medium/lovepik-flat-health-medical-service-hd-background-image_605816816.jpg"}} resizeMode="cover">

        <View style={{alignItems:"center", padding:13, backgroundColor:'rgba(255, 61, 61, 0.5)', marginTop:"20%", borderRadius:20}}>
          <View style={{flexDirection:"row", marginBottom:"20%"}}>
            <Text style={{fontSize:50, fontWeight:"bold", color:"dodgerblue"}}>MeD</Text>
            <Text style={{fontSize:50, fontWeight:"bold", color:"white"}}>Com</Text>
          </View>
          <Button mode='contained' style={{marginTop:20, padding:5, backgroundColor:"green", width:"70%"}} onPress={()=> navigation.navigate("Login")}>Login</Button>
          <Text style={{color:"grey"}}>__________________________________________</Text>
          <Button mode='contained' style={{marginTop:20, padding:5, backgroundColor:"blue", width:"65%"}} onPress={()=> navigation.navigate("Signup")}>Sign Up</Button>
        </View>
      </ImageBackground>
      
    </View>
  );
}

export default MainScreen;
  