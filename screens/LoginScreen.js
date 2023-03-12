import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import * as Animatable from 'react-native-animatable';
import {Constants, Svg} from 'react-native-svg';

export default function LoginScreen({navigation}) {
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [isDoctor, setIsDoctor] = useState(true);
  const [initializing, setInitializing] = useState(true);

  const {login} = useContext(AuthContext);

  const WIDTH = Dimensions.get('screen').width;

  return (
    <SafeAreaView style={{backgroundColor: '#555DF2', flex: 1}}>
      {/* <View style={{backgroundColor:'blue', padding:50, width:'100%', borderBottomRightRadius:100}}></View>
      <View style={{backgroundColor:'blue', padding:50, width:'100%', borderTopLeftRadius:100, bottom:0}}></View> */}

      <Animatable.View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          padding: 10,
          paddingTop: 30,
          backgroundColor: '#555DF2',
        }}
        animation="fadeInDownBig"
        duration={1500}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <MaterialCommunityIcons name="login" size={50} color={'#07f2e7'} />
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#07f2e7'}}>
            Login
          </Text>
        </View>
      </Animatable.View>
      <Animatable.View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'lightgrey',
          width: '100%',
          marginTop: 20,
          backgroundColor: '#07f2e7',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
        animation="fadeInUpBig"
        duration={1500}>
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: '25%',
          }}>
          <View style={{paddingLeft: 5, width: '80%', flexDirection: 'row'}}>
            <Icon name="perm-identity" size={21} color="black" style={{}} />
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                padding: 3,
                fontSize: 15,
              }}>
              CNIC
            </Text>
          </View>
          <TextInput
            placeholder="Type your CNIC"
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
          <View style={{paddingLeft: 5, width: '80%', flexDirection: 'row', marginTop:25}}>
            <Icon name="lock-outline" size={21} color="black" style={{}} />
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                padding: 3,
                fontSize: 15,
              }}>
              Password
            </Text>
          </View>
          <TextInput
            placeholder="Type your Password"
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
            value={password}
            onChangeText={setPassword}></TextInput>
          <TouchableOpacity
            style={{
              marginTop: 50,
              padding: 10,
              backgroundColor: '#555DF2',
              width: '100%',
              borderRadius: 20,
            }}
            onPress={() => login(cnic, password)}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '600',
                color: 'white',
              }}>
              Login
            </Text>
          </TouchableOpacity>

          <Text style={{color: 'grey'}}>
            _____________________________________________________________
          </Text>
          <Text style={{marginTop: 20, color: 'grey'}}>
            Dont have an account?
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 25,
              padding: 10,
              backgroundColor: 'green',
              width: '100%',
              borderRadius: 20,
            }}
            onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '600',
                color: 'white',
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
}
