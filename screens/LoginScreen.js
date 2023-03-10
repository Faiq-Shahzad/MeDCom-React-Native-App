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
          <Icon
            name="login"
            size={50}
            color="#07f2e7"
            style={{fontWeight: 'bold'}}
          />
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#07f2e7'}}>
            Login
          </Text>
        </View>
        {/* <View style={{width: '40%', alignItems: 'flex-end'}}>
          <Animatable.Image
            animation="bounceIn"
            source={require('../assets/userlogo.png')}
            style={{alignSelf: 'flex-end', width: 100, height: 100}}
          />
        </View> */}
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
          <TextInput
            placeholder="CNIC"
            style={{
              color: 'black',
              borderColor: 'black',
              borderWidth: 1,
              marginTop: 10,
              width: 270,
              fontSize: 16,
              fontWeight: 'bold',
              borderRadius: 17,
              padding: 12,
              backgroundColor: 'rgba(52, 249, 245, 0.77)',
            }}
            value={cnic}
            onChangeText={setCnic}></TextInput>
          <TextInput
            placeholder="Password"
            style={{
              borderColor: 'black',
              borderBottomWidth: 1,
              marginTop: 10,
              width: 270,
              fontSize: 16,
              fontWeight: 'bold',
              backgroundColor: 'rgba(52, 249, 245, 0.77)',
            }}
            secureTextEntry
            value={password}
            onChangeText={setPassword}></TextInput>
          <TouchableOpacity
            style={{marginTop: 25, padding: 10, backgroundColor: '#555DF2', width:'100%', borderRadius:20}}
            onPress={() => login(cnic, password)}>
            <Text style={{textAlign:'center', fontSize:15, fontWeight:'600', color:'white'}}>Login</Text>
          </TouchableOpacity>

          <Text style={{color: 'grey'}}>
            _____________________________________________________________
          </Text>
          <Text style={{marginTop: 20, color: 'grey'}}>
            Dont have an account?
          </Text>
          <TouchableOpacity
            style={{marginTop: 25, padding: 10, backgroundColor: 'green', width:'100%', borderRadius:20}}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={{textAlign:'center', fontSize:15, fontWeight:'600', color:'white'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
}
