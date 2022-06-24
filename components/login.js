import React, {useState, useEffect, useContext} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, TextInput, SafeAreaView} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../navigation/AuthProvider';


export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [isDoctor, setIsDoctor] = useState(true);
  const [initializing, setInitializing] = useState(true);
  
  const {login} = useContext(AuthContext)


  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>

      <ImageBackground style={{alignItems:"center", width:"100%", height:"100%"}} source={{uri:"https://i.pinimg.com/originals/b9/a5/0a/b9a50af2c61f9337826cd72583ef7335.jpg"}} resizeMode="cover">

        <View style={{backgroundColor:"#db4646", width:"100%", alignItems:"center", justifyContent:"center", padding:10, paddingTop:40, flexDirection:"row"}}>
          <Text style={{fontSize:30, fontWeight:"bold", color:"dodgerblue"}}>MeD</Text>
          <Text style={{fontSize:25, fontWeight:"bold", color:"white"}}>Com</Text>
        </View>
        <View style={{backgroundColor:"dodgerblue", width:"100%", alignItems:"center", padding:10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
          <Text style={{fontSize:25, fontWeight:"bold", color:"white"}}><Icon name="login" size={24} color="white" style={{fontWeight:"bold"}}/> Login</Text>
        </View>
        
        <View style={{marginTop:"30%", justifyContent:"center", alignItems:"center"}}>
          <TextInput placeholder="Email" style={{borderColor:"black",borderWidth:1, marginTop:10, width:270, fontSize:16, fontWeight:"bold", borderRadius:17, backgroundColor:'rgba(225, 45, 45, 0.35)'}} value={email} onChangeText={setEmail}></TextInput>
          <TextInput placeholder="Password" style={{borderColor:"black", borderWidth:1, marginTop:10, width:270, fontSize:16, fontWeight:"bold", borderRadius:17, backgroundColor:'rgba(225, 45, 45, 0.35)'}} secureTextEntry value={password} onChangeText={setPassword}></TextInput>
          <Button mode='contained' style={{marginTop:20, padding:5, backgroundColor:"green"}} onPress={()=> login(email, password)}>Login</Button>

          <Text style={{color:"grey"}}>__________________________________________</Text>
          <Text style={{marginTop:20}}>Dont have an account?</Text>
          <Button mode='contained' style={{marginTop:20, padding:5, marginBottom:20, borderWidth:1, borderColor:"black", backgroundColor:"rgba(0, 0, 0, 0.25)"}} onPress={()=> navigation.navigate("Signup")}>Sign Up</Button>
        </View>

      </ImageBackground>
      
      
    </SafeAreaView>
  );
}
