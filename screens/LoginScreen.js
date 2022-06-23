import React, {useState, useEffect, useContext} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, TextInput, SafeAreaView} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../navigation/AuthProvider';
import * as Animatable from 'react-native-animatable';




export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [isDoctor, setIsDoctor] = useState(true);
  const [initializing, setInitializing] = useState(true);
  
  const {login} = useContext(AuthContext)


  return (
    <SafeAreaView style={{backgroundColor:"#07f2e7", flex: 1, alignItems: 'center'}}>
          <Animatable.View style={{flexDirection:"row", width:"100%", alignItems:"center", padding:10, paddingTop:30, backgroundColor:"#07f2e7"}} animation="fadeInDownBig" duration={1500}>
            <View style={{width:"60%", alignItems:"flex-end"}}>
              <Icon name="login" size={50} color="black" style={{fontWeight:"bold"}}/>
              <Text style={{fontSize:25, fontWeight:"bold", color:"black"}}>Login</Text>
            </View>
            <View style={{width:"40%", alignItems:"flex-end"}}>
              <Animatable.Image animation="bounceIn" source = {require('../assets/userlogo.png')} style={{alignSelf:"flex-end", width: 100, height: 100}}/>
            </View>
          </Animatable.View>
          
          <Animatable.View style={{flex:1, borderWidth:1, borderColor:"lightgrey", width:"100%", marginTop:20, backgroundColor:"#4db8d1", borderTopRightRadius:40, borderTopLeftRadius:40}} animation="fadeInUpBig" duration={1500}>
            
            <View style={{alignItems:"center", paddingHorizontal:20, marginTop:"25%"}}>  
              <TextInput placeholder="Email" style={{color:"black", borderColor:"black",borderWidth:1, marginTop:10, width:270, fontSize:16, fontWeight:"bold", borderRadius:17, padding:12, backgroundColor:"rgba(52, 249, 245, 0.77)"}} value={email} onChangeText={setEmail}></TextInput>
              <TextInput placeholder="Password" style={{borderColor:"black", borderWidth:1, marginTop:10, width:270, fontSize:16, fontWeight:"bold", borderRadius:17, backgroundColor:"rgba(52, 249, 245, 0.77)"}} secureTextEntry value={password} onChangeText={setPassword}></TextInput>
              <Button mode='contained' style={{marginTop:20, padding:5, backgroundColor:"green"}} onPress={()=> login(email, password)}>Login</Button>

              <Text style={{color:"grey"}}>__________________________________________</Text>
              <Text style={{marginTop:20}}>Dont have an account?</Text>
              <Button mode='contained' style={{marginTop:20, padding:5, marginBottom:20, borderWidth:1, borderColor:"blue", backgroundColor:"rgba(7, 74, 242, 0.67)"}} onPress={()=> navigation.navigate("Signup")}>Sign Up</Button>
            </View>

          </Animatable.View>
      
    </SafeAreaView>
  );
}

