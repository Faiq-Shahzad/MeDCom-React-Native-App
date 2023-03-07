import React, {useState, useEffect, useContext} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, TextInput, SafeAreaView} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../navigation/AuthProvider';
import * as Animatable from 'react-native-animatable';


export default function LoginScreen({navigation}) {
  const [cnic, setCnic] = useState("")
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
      <Animatable.View style={{flex:1, borderWidth:1, borderColor:"lightgrey", width:"100%", marginTop:20, backgroundColor:"#555DF2", borderTopRightRadius:40, borderTopLeftRadius:40}} animation="fadeInUpBig" duration={1500}>
            
            <View style={{alignItems:"center", paddingHorizontal:20, marginTop:"25%"}}>  
              <TextInput placeholder="CNIC" style={{color:"black", borderColor:"black",borderWidth:1, marginTop:10, width:270, fontSize:16, fontWeight:"bold", borderRadius:17, padding:12, backgroundColor:"rgba(52, 249, 245, 0.77)"}} value={cnic} onChangeText={setCnic}></TextInput>
              <TextInput placeholder="Password" style={{borderColor:"black", borderWidth:1, marginTop:10, width:270, fontSize:16, fontWeight:"bold", borderRadius:17, backgroundColor:"rgba(52, 249, 245, 0.77)"}} secureTextEntry value={password} onChangeText={setPassword}></TextInput>
              <Button mode='contained' style={{marginTop:20, padding:5, backgroundColor:"green"}} onPress={()=> login(cnic, password)}>Login</Button>

              <Text style={{color:"white"}}>__________________________________________</Text>
              <Text style={{marginTop:20, color:"white"}}>Dont have an account?</Text>
              <Button mode='contained' style={{marginTop:20, padding:5, marginBottom:20, borderWidth:1, borderColor:"blue", backgroundColor:"#eb5c34"}} onPress={()=> navigation.navigate("Signup")}>Sign Up</Button>
            </View>

          </Animatable.View>

      {/* <ImageBackground style={{alignItems:"center", width:"100%", height:"100%"}} source={{uri:"https://i.pinimg.com/originals/b9/a5/0a/b9a50af2c61f9337826cd72583ef7335.jpg"}} resizeMode="cover">

        <View style={{backgroundColor:"#db4646", width:"100%", alignItems:"center", justifyContent:"center", padding:10, paddingTop:40, flexDirection:"row"}}>
          <Text style={{fontSize:30, fontWeight:"bold", color:"dodgerblue"}}>MeD</Text>
          <Text style={{fontSize:25, fontWeight:"bold", color:"white"}}>Com</Text>
        </View>
        <View style={{backgroundColor:"dodgerblue", width:"100%", alignItems:"center", padding:10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
          <Text style={{fontSize:25, fontWeight:"bold", color:"white"}}><Icon name="login" size={24} color="white" style={{fontWeight:"bold"}}/> Login</Text>
        </View>
        
        <View style={{marginTop:"30%", justifyContent:"center", alignItems:"center"}}>
          <TextInput placeholder="Cnic" style={{borderColor:"black",borderWidth:1, marginTop:10, width:270, fontSize:16, fontWeight:"bold", borderRadius:17, backgroundColor:'rgba(225, 45, 45, 0.35)'}} value={cnic} onChangeText={setCnic}></TextInput>
          <TextInput placeholder="Password" style={{borderColor:"black", borderWidth:1, marginTop:10, width:270, fontSize:16, fontWeight:"bold", borderRadius:17, backgroundColor:'rgba(225, 45, 45, 0.35)'}} secureTextEntry value={password} onChangeText={setPassword}></TextInput>
          <Button mode='contained' style={{marginTop:20, padding:5, backgroundColor:"green"}} onPress={()=> login(cnic, password)}>Login</Button>

          <Text style={{color:"grey"}}>__________________________________________</Text>
          <Text style={{marginTop:20}}>Dont have an account?</Text>
          <Button mode='contained' style={{marginTop:20, padding:5, marginBottom:20, borderWidth:1, borderColor:"black", backgroundColor:"rgba(0, 0, 0, 0.25)"}} onPress={()=> navigation.navigate("Signup")}>Sign Up</Button>
        </View>

      </ImageBackground>
       */}
      
    </SafeAreaView>
  );
}
