import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

function MainScreen({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#07f2e7'}}>
      <Animatable.View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '35%',
          backgroundColor: '#07f2e7',
        }}
        animation="fadeInDownBig"
        duration={1500}>
        <Animatable.Image
          animation="bounceIn"
          source={require('../assets/mainscreen.png')}
          style={{width: 200, height: 200}}
          resizeMode="stretch"
        />
      </Animatable.View>

      <Animatable.View
        style={{
          flex: 1,
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#07f2e7',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
        animation="fadeInUpBig"
        duration={1500}>
        <View
          style={{
            alignItems: 'center',
            padding: 13,
            marginTop: '1%',
            width: '90%',
            borderRadius: 20,
          }}>
          <View style={{flexDirection: 'row', marginBottom: '20%'}}>
            <Text style={{fontSize: 50, fontWeight: 'bold', color: 'grey'}}>
              MeD
            </Text>
            <Text style={{fontSize: 50, fontWeight: 'bold', color: 'green'}}>
              Com
            </Text>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 50,
              padding: 10,
              backgroundColor: '#555DF2',
              width: '100%',
              borderRadius: 20,
            }}
            onPress={() => navigation.navigate('Login')}>
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
            ___________________________________________________________
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
    </View>
  );
}

export default MainScreen;
