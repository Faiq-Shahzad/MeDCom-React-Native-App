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
import {Avatar, Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

const HomePage = ({navigation}) => {

  const {doctor, setDoctor} = useContext(AuthContext);

  const Categories = [
    {
      title: 'Cardiologist',
      avatar: require('../assets/c1.png'),
    },
    {
      title: 'Dermatologist',
      avatar: require('../assets/c9.png'),
    },
    {
      title: 'Dentist',
      avatar: require('../assets/c3.png'),
    },
  ];

  const PopularDoctors = [
    {
      key: 0,
      name: 'Dr. Faiq Shahzad',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar.jpg'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 1,
      name: 'Dr. Arif Shahzad',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 2000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 2,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar4.jpg'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 3,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar3.png'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 4,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar.jpg'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
  ];

  const handleBookAppointment = (element) =>{
    setDoctor(element);
    navigation.navigate('Book Appointment');
  }

  const [categories, setCategories] = useState(Categories);
  const [popular, setPopular] = useState(PopularDoctors);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#555DF2',
        marginTop: 0,
      }}>
      <TouchableOpacity
        style={{
          marginTop: 15,
          marginLeft: 'auto',
          marginRight: '5%',
          flexDirection: 'row',
        }}
        onPress={() => viewNotifications()}>
        <Icon
          name="notifications"
          size={25}
          color="white"
          style={{fontWeight: 'bold'}}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
          marginTop: 30,
          marginLeft: 20,
          marginRight: 20,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 30,
            marginTop: 5,
          }}>
          <Text>Med</Text>
          <Text style={{color: '#44E354'}}>Com</Text>
        </Text>
        <View>
          <Text style={{color: 'white'}}>Find your desired</Text>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 23}}>
            Doctor Right Now!
          </Text>
        </View>
      </View>
      <TextInput
        placeholder="Search"
        style={{
          padding: 4,
          backgroundColor: 'white',
          marginBottom: 20,
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 5,
        }}></TextInput>

      <View
        style={{
          backgroundColor: '#E6EFF9',
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 10,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
              Categories
            </Text>
            <Text
              style={{fontWeight: 'bold', fontSize: 15, color: '#555DF2'}}
              onPress={() => navigation.navigate('Categories')}>
              See all
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {categories.map((element, index) => {
              return (
                <Card style={{width: '32%', alignItems: 'center'}}>
                  <Card.Content style={{alignItems: 'center'}}>
                    <Avatar.Image
                      size={45}
                      source={element.avatar}
                    />
                    <Title
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {element.title}
                    </Title>
                  </Card.Content>
                </Card>
              );
            })}
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
              Popular Doctors
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#555DF2'}} onPress={() => navigation.navigate('Doctors')}>
              See all
            </Text>
          </View>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {popular.map((item, index) => {
              return (
                <Card
                  style={{
                    padding: 5,
                    marginBottom: 8,
                  }}>
                  <View
                    style={{
                      padding: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
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
                          fontWeight: '700',
                        }}>
                        {item.name}
                      </Text>
                      <Text>{item.specialization}</Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'green',
                          fontWeight: '700',
                        }}>
                        {item.price}
                      </Text>
                    </Card.Content>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#555DF2',
                        padding: 5,
                        borderRadius: 5,
                        width: '25%',
                        height: '50%',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                      }}
                      onPress={() => handleBookAppointment(item)}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        Book
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
