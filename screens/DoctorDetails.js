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
import {AuthContext, AuthProvider} from '../navigation/AuthProvider';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import {Avatar, Card, Title, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {white} from 'react-native-paper/lib/typescript/styles/colors';
import {UserContext} from '../navigation/UserProvider';

const DoctorDetails = ({navigation}) => {
  const { doctor } = useContext(AuthContext);
  console.log(doctor);

  const [doctorArr, setDoctor] = useState({
    name: 'Dr. Saima Riaz',
    specialization: 'Heart Surgeon',
    avatar: '../assets/avatar2.jpg',
    price: 'Rs. 1000/-',
    timings: '10AM - 4PM',
    days: 'Mon - Fri',
  });

  const Reviews = [
    {
      name: 'Ali Khan',
      comment: 'Very Good Experience',
      rating: '5 Stars',
    },
    {
      name: 'Ali Khan',
      comment: 'Very Good Experience',
      rating: '5 Stars',
    },
    {
      name: 'Ali Khan',
      comment: 'Very Good Experience',
      rating: '5 Stars',
    },
    {
      name: 'Ali Khan',
      comment: 'Very Good Experience',
      rating: '5 Stars',
    },
    {
      name: 'Ali Khan',
      comment: 'Very Good Experience',
      rating: '5 Stars',
    },
    {
      name: 'Ali Khan',
      comment: 'Very Good Experience',
      rating: '5 Stars',
    },
    {
      name: 'Ali Khan',
      comment: 'Very Good Experience',
      rating: '5 Stars',
    },
  ];

  const [reviews, setReviews] = useState(Reviews);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#E6EFF9',
        marginTop: 0,
      }}>
      <Card
        style={{
          padding: 10,
          marginBottom: 15,
          borderRadius: 10,
          width: '90%',
          margin: 15,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
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
            source={require('../assets/avatar2.jpg')}
          />
          <Card.Content>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
              }}>
              {doctorArr.name}
            </Text>
            <Text>{doctorArr.specialization}</Text>
            <Text
              style={{
                marginTop: 5,
                fontStyle: 'italic',
                color: 'black',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{doctorArr.days}</Text>
              <Text> | </Text>
              <Text>{doctorArr.timings}</Text>
              <Text></Text>
            </Text>
          </Card.Content>
          <Text
            style={{
              fontSize: 15,
              color: 'green',
              fontWeight: '700',
            }}>
            {doctorArr.price}
          </Text>
        </View>
      </Card>

      <View
        style={{
          backgroundColor: '#E6EFF9',
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 10,
        }}>
        <View>
          {/* <hr></hr> */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
              Reviews
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#555DF2'}}>
              See all
            </Text>
          </View>

          <ScrollView style={{height:'75%', marginBottom:10, borderRadius:10, padding:5, backgroundColor:'white'}}>
            {reviews.map(item => {
              return (
                <Card
                  style={{
                    padding: 0,
                    marginBottom: 8,
                  }}>
                  <Card.Content>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontWeight: '600',
                      }}>
                      {item.name}
                    </Text>
                    <Text>{item.comment}</Text>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        fontWeight: '700',
                      }}>
                      {item.rating}
                    </Text>
                  </Card.Content>
                </Card>
              );
            })}
          </ScrollView>
          <TouchableOpacity
            style={{
              backgroundColor: '#555DF2',
              padding: 10,
              borderRadius: 5,
              width: '90%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }} onPress={() => navigation.navigate('Book Appointment')}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DoctorDetails;
