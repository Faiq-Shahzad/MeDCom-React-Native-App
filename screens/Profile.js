import React, {useState, useContext, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Image} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';


export default function Profile({navigation, route}) {
  const data = route.params
  const {user, logout} = useContext(AuthContext);
  
  const [signup_name, setSignUpName] = useState("")
  const [signup_password, setSignUpPassword] = useState("")
  const [signup_confirm, setSignUpConfirm] = useState("")
  const [details, setDetails] = useState()
  // var details;
  const [loading, setLoading] = useState(true)
  const [disabled, setDisabled] = useState(true)

  const edit = () =>{
    setDisabled(false);
  }

  const getUser = async() => {
    await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setDetails(documentSnapshot.data());
        setLoading(false)
      }
    })
  }

  // const viewProfile = () =>{
  //   console.log(data.doctor)
  //   if (data.doctor === "doctor"){
  //     console.log("true")
  //     details = {"name":"Faiq Shahzad", "email":"faiqshahad933@gmail.com", "phn_number":"0331-5558407", "dob":"15-06-2001" }
  //     console.log(details)
  //   }else{
  //     details = {"name":"Muhammad Ahmed", "email":"th3Un1qu3m4n@gmail.com", "phn_number":"0320-2020720", "dob":"18-08-2000"}
  //   }
  // }

  // viewProfile();

  useEffect(() => {
    getUser();
  }, []);

  const DummyAvatar = "https://firebasestorage.googleapis.com/v0/b/medcom-e961c.appspot.com/o/avatar.png?alt=media&token=f6a81a27-c82c-4f22-9ba4-ca8ead95cb5a"

  if(loading){
    console.log("Some data")
    return(
      <View>
        <Text> Loading </Text>
      </View>
    )
  }else{

  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <ScrollView style={{width:"95%"}}>
        
        <View style={{borderWidth:1, padding:8, borderRadius:10, borderColor:"lightgrey", width:"100%", marginTop:20}}>
          <TouchableOpacity onPress={edit}><Icon style={{alignSelf:"flex-end"}} name="edit" size={24} color="black"/></TouchableOpacity>
          <Image style={{width: 150, height: 150, alignSelf:'center', borderRadius:100}}
                source={{ uri: details ? details.userImg || DummyAvatar : DummyAvatar}}/>
          <Text>First Name:</Text>
          <TextInput style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}} value={details.fname} editable={!disabled}></TextInput>
          <Text>Last Name:</Text>
          <TextInput style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}} value={details.lname} editable={!disabled}></TextInput>
          <Text style={{marginTop:15}}>Email:</Text>
          <TextInput style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}} value={details.email} editable={!disabled}></TextInput>
          <Text style={{marginTop:15}}>Phone Number:</Text>
          <TextInput style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}} value={details.phone} editable={!disabled}></TextInput>
        </View>
        <Button mode='outlined' style={{marginTop:20, padding:5, borderColor:"blue"}} disabled={disabled}>Update</Button> 
      </ScrollView>

    </View>

  );
  }
}