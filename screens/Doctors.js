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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import {Avatar, Card, Title, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

const Doctors = ({navigation}) => {
  const { doctor, setDoctor } = useContext(AuthContext);

  const doctorDetails = element => {
    setDoctor(element);
    // setDoctorData(element);
    console.log(element);
    navigation.navigate('Doctor Details');
  };
  const PopularDoctors = [
    {
      key: 0,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      timings: '10AM - 4PM',
      days: 'Mon - Fri',
    },
    {
      key: 1,
      name: 'Dr. Arif Shahzad',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 2000/-',
      timings: '10AM - 4PM',
      days: 'Mon - Sat',
    },
    {
      key: 2,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      timings: '10AM - 4PM',
      days: 'Mon - Fri',
    },
    {
      key: 3,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      timings: '10AM - 4PM',
      days: 'Mon - Fri',
    },
    {
      key: 4,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      timings: '10AM - 4PM',
      days: 'Mon - Fri',
    },
    {
      key: 5,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      timings: '10AM - 4PM',
      days: 'Mon - Fri',
    },
    {
      key: 5,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      timings: '10AM - 4PM',
      days: 'Mon - Fri',
    },
    {
      key: 6,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      timings: '10AM - 4PM',
      days: 'Mon - Fri',
    },
    {
      key: 7,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      timings: '10AM - 4PM',
      days: 'Mon - Fri',
    },
  ];

  const [popular, setPopular] = useState(PopularDoctors);

  const renderItem = ({item}) => (
    <Card
      style={{
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
      }}
      onPress={() => doctorDetails(item)}>
      <View
        style={{
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 5,
        }}>
        <Avatar.Image
          style={{marginTop: 'auto', marginBottom: 'auto'}}
          size={60}
          source={item.avatar}
        />
        <Card.Content>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: 'bold',
            }}>
            {item.name}
          </Text>
          <Text>{item.specialization}</Text>
          <Text
            style={{
              marginTop: 5,
              fontStyle: 'italic',
              color: 'black',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>{item.days}</Text>
            <Text> | </Text>
            <Text>{item.timings}</Text>
            <Text></Text>
          </Text>
        </Card.Content>
        <Text
          style={{
            fontSize: 15,
            color: 'green',
            fontWeight: '700',
          }}>
          {item.price}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#555DF2',
          padding: 5,
          borderRadius: 5,
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Book
        </Text>
      </TouchableOpacity>
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
        <View>
          <FlatList
            data={popular}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Doctors;
