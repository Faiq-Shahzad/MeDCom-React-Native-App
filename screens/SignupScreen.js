import React, {useState, useEffect, useContext} from 'react';
import { Text, View, FlatList, Alert, TextInput, TouchableOpacity, ScrollView, Image} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../navigation/AuthProvider';
import DocumentPicker from 'react-native-document-picker';

export default function SignupScreen({navigation}) {

  const [email, setEmail] = useState()
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [phone, setPhone] = useState()
  const [cnic, setCnic] = useState()
  const [bloodGroup, setBloodGroup] = useState()
  const [nextOfKin, setNextOfKin] = useState()
  const [emergencyContact, setEmergencyContact] = useState()

  const [password, setPassword] = useState()
  const [signup_confirm, setSignUpConfirm] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false)
  const [gender, setGender] = React.useState('male');
  const [selectedDate, setSelectedDate] = useState();
  const [profile, setProfile] = useState();

  const {register} = useContext(AuthContext)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date)
    hideDatePicker();
  };

  const selectProfilePic = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log('res : ' + JSON.stringify(res));
      setProfile(res);
    } catch (err) {
      setProfile(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const registerUser = () =>{
    // register(email, password, fname, lname, phone, gender, selectedDate)
    register(email, password, fname, lname, cnic, bloodGroup, selectedDate, gender, nextOfKin, phone, emergencyContact, profile)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center'}}>

      <View style={{backgroundColor:"dodgerblue", width:"100%", alignItems:"center", padding:10, paddingTop:40}}>
        <Text style={{fontSize:25, fontWeight:"bold", color:"white"}}><MaterialCommunityIcons name="account-plus" size={24} color="white" style={{fontWeight:"bold"}}/> Sign Up</Text>
        
      </View>

      <ScrollView style={{width:"95%"}}>
        
        <View style={{borderWidth:1, padding:8, borderRadius:10, borderColor:"white", width:"100%", marginTop:20}}>

          <Text>First Name:</Text>
          <TextInput value={fname} onChangeText={setFname} placeholder="e.g: Faiq" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}}></TextInput>
          <Text style={{marginTop:15}}>Last Name:</Text>
          <TextInput value={lname} onChangeText={setLname} placeholder="e.g: Shahzad" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}}></TextInput>
          <Text style={{marginTop:15}}>Email:</Text>
          <TextInput  placeholder="e.g: abcdef@gmail.com" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}} value={email} onChangeText={setEmail}></TextInput>
          <Text  style={{marginTop:15}}>Password:</Text>
          <TextInput  secureTextEntry placeholder="********" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}} value={password} onChangeText={setPassword}></TextInput>
          <Text style={{marginTop:15}}>Confirm Password:</Text>
          <TextInput secureTextEntry  placeholder="********" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}}></TextInput>
          <Text style={{marginTop:15}}>Cnic:</Text>
          <TextInput  value={cnic} onChangeText={setCnic} placeholder="********" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}}></TextInput>
          <Text style={{marginTop:15}}>Next of Kin:</Text>
          <TextInput   value={nextOfKin} onChangeText={setNextOfKin} placeholder="********" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}}></TextInput>
          <Text style={{marginTop:15}}>Phone Number:</Text>
          <TextInput   value={phone} onChangeText={setPhone} placeholder="********" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}}></TextInput>
          <Text style={{marginTop:15}}>Emergency Contact:</Text>
          <TextInput value={emergencyContact} onChangeText={setEmergencyContact} placeholder="e.g: 0333-5558444" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}}></TextInput>
          <Text style={{marginTop:15}}>Blood Group:</Text>
          <TextInput value={bloodGroup} onChangeText={setBloodGroup} placeholder="e.g AB-" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}}></TextInput>
          <Text style={{marginTop:15}}>Date of Birth:</Text>
          <TouchableOpacity style={{alignItems:"center", borderWidth:1, padding:5, borderRadius:5, borderColor:"lightgrey"}} onPress={showDatePicker}>
            <Text style={{fontSize:15}}>{selectedDate?selectedDate.toLocaleDateString():'Select Date'}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={{marginTop:15}}>Gender:</Text>

          <View style={{borderColor:"lightgrey", borderWidth:1, borderRadius:10}}>
          <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
            <RadioButton.Item mode='android' label="Male" labelStyle={{fontSize:13}} value="male" color='red' />
            <RadioButton.Item mode='android' label="Female" labelStyle={{fontSize:13}} value="female" color='red' />
            <RadioButton.Item mode='android' label="Custom" labelStyle={{fontSize:13}} value="custom" color='red' />
          </RadioButton.Group>
          </View>

          <Text style={{marginTop:15}}>Profile Picture:</Text>
          <TouchableOpacity onPress={selectProfilePic} style={{alignItems:"center", backgroundColor:"antiquewhite", padding:5, borderRadius:5, borderWidth:1, borderColor:"lightgrey", marginTop:5}}>
            <Text style={{fontSize:12}}>
            {profile?.name
                ? (profile?.name).substring(0, 10) + '...'
                : 'Upload Image'
            }
            </Text>
          </TouchableOpacity> 
          {profile && 
          <Image style={{width: 150, height: 150, margin:10, alignSelf:'center', borderRadius:100}}
                source={{ uri: profile?.uri }}/>}
        </View>
        <Button mode='contained' style={{marginTop:20, padding:5}} onPress={()=>registerUser()}>Sign Up</Button> 

        <Text style={{marginTop:30, textAlign:"center"}}>Already have an account?</Text>
        <Button mode='outlined' style={{marginTop:20, padding:5, marginBottom: 20}} onPress={() => navigation.navigate("Login")}>Login</Button> 
      </ScrollView>

    </View>

  );


}