import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';
import {Avatar, Card, Title, IconButton} from 'react-native-paper';

const Categories = ({navigation}) => {
  const Categories = [
    {
      key: 'a',
      title: 'Cardiologist',
      avatar: '../assets/Cardiologist.png',
    },
    {
      key: 'b',
      title: 'Orthopedic',
      avatar: '../assets/Cardiologist.png',
    },
    {
      key: 'c',
      title: 'Dentist',
      avatar: '../assets/Cardiologist.png',
    },
    {
      key: 'd',
      title: 'Eye Specialist',
      avatar: '../assets/Cardiologist.png',
    },
    {
      key: 'e',
      title: 'Otologist',
      avatar: '../assets/Cardiologist.png',
    },
    {
      key: 'f',
      title: 'Rhinologist',
      avatar: '../assets/Cardiologist.png',
    },
    {
      key: 'g',
      title: 'Neurosugeon',
      avatar: '../assets/Cardiologist.png',
    },
    {
      key: 'h',
      title: 'Generalsugeon',
      avatar: '../assets/Cardiologist.png',
    },
    {
      key: 'i',
      title: 'Dermatologist',
      avatar: '../assets/Cardiologist.png',
    },
    {
      key: 'j',
      title: 'Psycaterist',
      avatar: '../assets/Cardiologist.png',
    },
  ];

  const [categories, setCategories] = useState(Categories);

  const renderItem = ({item}) => (
    <Card
      style={{
        width: '42%',
        alignItems: 'center',
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3,
        margin: 13,
        borderRadius: 10,
      }}
      onPress={() => setCategories()}>
      <Card.Content style={{alignItems: 'center'}}>
        <Avatar.Image
          size={55}
          source={require('../assets/Cardiologist.png')}
        />
        <Title
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {item.title}
        </Title>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#E6EFF9',
        marginTop: 10,
      }}>
      <TextInput
        placeholder="Search"
        style={{
          padding: 4,
          backgroundColor: 'white',
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 5,
          shadowOpacity: 1,
          shadowRadius: 3,
          elevation: 3,
        }}></TextInput>

      <View
        style={{
          backgroundColor: '#E6EFF9',
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
        }}>
        <View style={{justifyContent: 'space-between'}}>
          <FlatList
            data={categories}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={item => item.key}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Categories;
