import React, {useState, useContext, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Image} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';


export default function Profile({navigation, route}) {
  const {user, logout} = useContext(AuthContext);
  
  const [details, setDetails] = useState()
  // var details;
  const [loading, setLoading] = useState(true)
  const [disabled, setDisabled] = useState(true)

  const edit = () =>{
    setDisabled(!disabled);
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false)
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDetails({...details, dob:date})
    hideDatePicker();
  };


  const getUser = async () => {
    await firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        // console.log('User Data', documentSnapshot.data());
        // setDetails({...documentSnapshot.data(), dob:(new Date(documentSnapshot.data().dob.seconds))});
        setDetails({...documentSnapshot.data(), dob:(new Date(documentSnapshot.data().dob.seconds * 1000))});
        // console.log('Details Data', details.dob);
        setLoading(false)
      }
    })
  }

  const handleProfileUpdate = async () => {
    setDisabled(true);
    let imgUrl = details.userImg
    await firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      fname: details.fname,
      lname: details.lname,
      email: details.email,
      phone: details.phone,
      gender: details.gender,
      dob: details.dob,
      createdAt: details.createdAt,
      userImg: imgUrl,
    }).then(()=>{
      console.log('User Updated')
      Alert.alert('Profile', 'Your Profile Updated Successfully.')
    })
  }


  useEffect(() => {
    getUser();
    
  }, []);


  if(loading){
    console.log("Some data")
    return(
      <View>
        <Text> Loading </Text>
      </View>
    )
  }else{

  return (
    <View style={{ flex: 1,
    alignItems: 'center',
    }}>
      <ScrollView style={{width:"95%"}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        
        <View style={{padding:8, borderRadius:10, width:"100%", backgroundColor:'white', marginVertical:20,
                      shadowColor: "#000",
                      shadowOffset: {
                          width: 0,
                          height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4.84,    
                      elevation: 5,}}>
          <TouchableOpacity onPress={edit}><Icon style={{alignSelf:"flex-end"}} name="edit" size={24} color="black"/></TouchableOpacity>
          <Image style={{width: 150, height: 150, marginBottom:50, alignSelf:'center', borderRadius:100}}
                source={{ uri: details.userImg }}/>
        </View>
        <View style={{paddingHorizontal:10}}>
        <View style={{flexDirection:'row', marginTop:10}}>
          <View style={{width:'48%', marginRight:10}}>
            <Text>First Name:</Text>
            <TextInput style={{marginTop:5, backgroundColor:'white', paddingHorizontal:10, borderColor:"lightgrey", borderRadius:5,  padding:3}} value={details.fname} onChangeText={(val)=>setDetails({...details, fname:val})} editable={!disabled}></TextInput>
          </View>
          <View style={{width:'48%', marginLeft:10}}>
            <Text>Last Name:</Text>
            <TextInput style={{marginTop:5, backgroundColor:'white', paddingHorizontal:10, borderColor:"lightgrey", borderRadius:5,  padding:3}} value={details.lname} onChangeText={(val)=>setDetails({...details, lname:val})} editable={!disabled}></TextInput>
          </View>
        </View>
        <View style={{flexDirection:'row', marginTop:10}}>
          <View style={{width:'50%'}}>
            <Text style={{marginTop:15}}>Phone Number:</Text>
            <TextInput style={{marginTop:5, backgroundColor:'white', paddingHorizontal:10, borderColor:"lightgrey", borderRadius:5,  padding:3}} value={details.phone} onChangeText={(val)=>setDetails({...details, phone:val})} editable={!disabled}></TextInput>
            <Text style={{marginTop:15}}>Date of Birth:</Text>
            <TouchableOpacity style={{alignItems:"center", backgroundColor:disabled?'lightgray':'rgb(120,220,140)', borderWidth:1, padding:10, borderRadius:5, borderColor:"lightgrey"}} onPress={showDatePicker} disabled={disabled}>
              <Text style={{fontSize:15, color:'white'}}>{details.dob.toLocaleDateString()}</Text>
            </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
          </View >
          <View style={{width:'50%'}}>

            <View style={{backgroundColor:'white', marginHorizontal:10, borderRadius:10}}>
            <Text style={{marginTop:15, alignSelf:'center'}}>Gender:</Text>
            <RadioButton.Group onValueChange={(val)=>setDetails({...details, gender:val})} value={details.gender} >
              <RadioButton.Item mode='android' label="Male" labelStyle={{fontSize:13}} value="male" color='red' disabled={disabled}/>
              <RadioButton.Item mode='android' label="Female" labelStyle={{fontSize:13}} value="female" color='red' disabled={disabled}/>
              <RadioButton.Item mode='android' label="Custom" labelStyle={{fontSize:13}} value="custom" color='red' disabled={disabled}/>
            </RadioButton.Group>
            </View>
          </View>
        </View>


        <Button mode='contained' style={{marginTop:20, padding:5, borderColor:"blue"}} disabled={disabled} onPress={handleProfileUpdate} >Update</Button> 
        </View>
      </ScrollView>

    </View>

  );
  }
}