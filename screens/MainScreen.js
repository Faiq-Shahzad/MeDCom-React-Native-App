import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

function MainScreen({navigation}) {
  return (

    <View style={{flex:1, backgroundColor:"#07f2e7"}}>

      <Animatable.View style={{justifyContent: 'center', alignItems: 'center', height:"35%", backgroundColor:"#07f2e7"}} animation="fadeInDownBig" duration={1500}>
        <Animatable.Image animation="bounceIn" source = {require('../assets/mainscreen.png')} style={{width:200, height:200}} resizeMode="stretch" />
      </Animatable.View>

      <Animatable.View style={{flex: 1, alignItems:"center", width:"100%",backgroundColor:"#555DF2", borderTopLeftRadius:40, borderTopRightRadius:40}} animation="fadeInUpBig" duration={1500}> 
        <View style={{alignItems:"center", padding:13, marginTop:"7%", borderRadius:20}}>
          <View style={{flexDirection:"row", marginBottom:"20%"}}>
            <Text style={{fontSize:50, fontWeight:"bold", color:"white"}}>MeD</Text>
            <Text style={{fontSize:50, fontWeight:"bold", color:"#44E354"}}>Com</Text>
          </View>
          <Button mode='contained' style={{marginTop:20, padding:5, backgroundColor:"green", width:"70%"}} onPress={()=> navigation.navigate("Login")}>Login</Button>
          <Text style={{color:"white"}}>__________________________________________</Text>
          <Button mode='contained' style={{marginTop:20, padding:5, backgroundColor:"#eb5c34", width:"65%"}} onPress={()=> navigation.navigate("Signup")}>Sign Up</Button>
        </View>
      </Animatable.View>
      
    </View>
  );
}

export default MainScreen;
  