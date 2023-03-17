import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useContext, useState} from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import axios from 'axios';

const ForgetPassword = ({navigation}) => {
  const {backendUrl } = useContext(AuthContext);
  const [cnic, setCnic] = useState();
  const [code, setCode] = useState();
  const [newPass, setNewPass] = useState();
  const [cnfrmPass, setCnfrmPass] = useState();

  const getResetCode = async () => {

      try {
        // console.log("Getting Profile ", token)
        const response = await axios.post(backendUrl + 'auth/getResetCode', {cnic: cnic, role: 'patient'});
        console.log(response.data);
        if(response.data.message){
          Alert.alert('Success', response.data.message, [
            {text: 'OK'},
          ]);
        }else{
          Alert.alert('Failed', response.data.message, [
            {text: 'OK'},
          ]);

        }
      } catch (error) {
        console.log(error)
        console.log(error.response.data)
        Alert.alert('Failed', error.response.data.message, [
          {text: 'OK'},
        ]);
      }

  };

  const resetPassword = async () =>{
    if (newPass == cnfrmPass){

      try {
        // console.log("Getting Profile ", token)
        const response = await axios.post(backendUrl + 'auth/resetPassword', {cnic: cnic, role: 'patient', code: code, new_password: newPass});
        console.log(response.data);
        if(response.data.message){
          Alert.alert('Response', response.data.message, [
            {text: 'OK'},
          ]);
        }else{
          Alert.alert('Success', 'Password Changed Successfully!', [
            {text: 'OK', onPress: () => navigation.navigate('Login')},
          ]);

        }
      } catch (error) {
        console.log(error)
        console.log(error.response.data)
        Alert.alert('Failed', error.response.data.message, [
          {text: 'OK'},
        ]);
      }

    } else{
      Alert.alert('Failed', 'New password doesnot match', [
        {text: 'OK'},
      ]);
    }
  }
  return (
    <View
      style={{
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 'auto',
        marginBottom: 'auto',
      }}>
      <View style={{paddingLeft: 5, width: '80%', flexDirection: 'row'}}>
        <Icon name="mail-outline" size={21} color="black" style={{}} />
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            padding: 3,
            fontSize: 15,
          }}>
          Cnic
        </Text>
      </View>
      <TextInput
        placeholder="Enter Valid Cnic"
        style={{
          color: 'black',
          borderColor: '#4baba0',
          borderBottomWidth: 1,
          width: '80%',
          fontSize: 16,
          paddingTop: 0,
          paddingBottom: 2,
          paddingLeft: 5,
          paddingRight: 5,
        }}
        value={cnic}
        onChangeText={setCnic}></TextInput>

      <TouchableOpacity
        style={{
          marginTop: 10,
          marginBottom: 20,
          padding: 10,
          backgroundColor: '#555DF2',
          width: '40%',
          borderRadius: 20,
        }}
        onPress={() => getResetCode()}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '600',
            color: 'white',
          }}>
          Get Code
        </Text>
      </TouchableOpacity>

      <View
        style={{
          paddingLeft: 5,
          width: '80%',
          flexDirection: 'row',
          marginTop: 25,
        }}>
        <Icon name="card-membership" size={21} color="black" style={{}} />
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            padding: 3,
            fontSize: 15,
          }}>
          Reset Code
        </Text>
      </View>
      <TextInput
        placeholder="Type Reset Code"
        style={{
          color: 'black',
          borderColor: '#4baba0',
          borderBottomWidth: 1,
          width: '80%',
          fontSize: 16,
          paddingTop: 0,
          paddingBottom: 2,
          paddingLeft: 5,
          paddingRight: 5,
        }}
        secureTextEntry
        value={code}
        onChangeText={setCode}></TextInput>

        
      <View
        style={{
          paddingLeft: 5,
          width: '80%',
          flexDirection: 'row',
          marginTop: 25,
        }}>
        <Icon name="lock-outline" size={21} color="black" style={{}} />
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            padding: 3,
            fontSize: 15,
          }}>
          New Password
        </Text>
      </View>
      <TextInput
        placeholder="Type your new Password"
        style={{
          color: 'black',
          borderColor: '#4baba0',
          borderBottomWidth: 1,
          width: '80%',
          fontSize: 16,
          paddingTop: 0,
          paddingBottom: 2,
          paddingLeft: 5,
          paddingRight: 5,
        }}
        secureTextEntry
        value={newPass}
        onChangeText={setNewPass}></TextInput>
      <View
        style={{
          paddingLeft: 5,
          width: '80%',
          flexDirection: 'row',
          marginTop: 25,
        }}>
        <Icon name="lock-outline" size={21} color="black" style={{}} />
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            padding: 3,
            fontSize: 15,
          }}>
          New Password
        </Text>
      </View>
      <TextInput
        placeholder="Re-type your new Password"
        style={{
          color: 'black',
          borderColor: '#4baba0',
          borderBottomWidth: 1,
          width: '80%',
          fontSize: 16,
          paddingTop: 0,
          paddingBottom: 2,
          paddingLeft: 5,
          paddingRight: 5,
        }}
        secureTextEntry
        value={cnfrmPass}
        onChangeText={setCnfrmPass}></TextInput>
      <TouchableOpacity
        style={{
          marginTop: 50,
          padding: 10,
          backgroundColor: '#555DF2',
          width: '40%',
          borderRadius: 20,
        }}
        onPress={() => resetPassword()}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '600',
            color: 'white',
          }}>
          Reset Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;
