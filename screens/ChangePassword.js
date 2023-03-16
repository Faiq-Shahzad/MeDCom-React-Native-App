import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState} from 'react';

const ChangePassword = ({navigation}) => {
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [cnfrmPass, setCnfrmPass] = useState();

  const changePass = () =>{
    if (newPass == cnfrmPass){
      Alert.alert('Success', 'Password Changed Successfully!', [
        {text: 'OK', onPress: () => navigation.navigate('Menu')},
      ]);
    } else{
      Alert.alert('Failed', 'Wrong Input!', [
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
        <Icon name="lock-open" size={21} color="black" style={{}} />
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            padding: 3,
            fontSize: 15,
          }}>
          Old Password
        </Text>
      </View>
      <TextInput
        placeholder="Type old Password"
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
        value={oldPass}
        onChangeText={setOldPass}></TextInput>
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
          width: '100%',
          borderRadius: 20,
        }}
        onPress={() => changePass()}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '600',
            color: 'white',
          }}>
          Change Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;