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

  const {setSelectedCat} = useContext(AuthContext);

  const Categories = [
    {
      key: 'a',
      title: 'Cardiologist',
      avatar: require('../assets/c1.png'),
    },
    {
      key: 'b',
      title: 'Orthopedic',
      avatar: require('../assets/c2.png'),
    },
    {
      key: 'c',
      title: 'Dentist',
      avatar: require('../assets/c3.png'),
    },
    {
      key: 'd',
      title: 'Eye Specialist',
      avatar: require('../assets/c4.png'),
    },
    {
      key: 'e',
      title: 'Otologist',
      avatar: require('../assets/c5.png'),
    },
    {
      key: 'f',
      title: 'Rhinologist',
      avatar: require('../assets/c6.png'),
    },
    {
      key: 'g',
      title: 'Neurosugeon',
      avatar: require('../assets/c7.png'),
    },
    {
      key: 'h',
      title: 'Generalsugeon',
      avatar: require('../assets/c8.png'),
    },
    {
      key: 'i',
      title: 'Dermatologist',
      avatar: require('../assets/c9.png'),
    },
    {
      key: 'j',
      title: 'Psycaterist',
      avatar: require('../assets/c10.png'),
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
      onPress={() =>
        {
        setSelectedCat({title: item.title, avatar: item.avatar})
        navigation.navigate('Doctors')
        }
      }>
      <Card.Content style={{alignItems: 'center'}}>
        <Avatar.Image size={55} source={item.avatar} />
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
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
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
