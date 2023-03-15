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

const Faqs = ({navigation}) => {
  const {doctor, setDoctor} = useContext(AuthContext);

  const doctorDetails = element => {
    setDoctor(element);
    // setDoctorData(element);
    console.log(element);
    navigation.navigate('Doctor Details');
  };

  const bookAppointment = element => {
    setDoctor(element);
    // setDoctorData(element);
    console.log(element);
    navigation.navigate('Book Appointment');
  };
  const Questions = [
    {
      key: 0,
      ques: 'How to book an appointment?',
      ans: 'Step 01: Search a Doctor. \nStep 02: Click Book Appointment Button. \nStep 03: Select Date. \nStep 04: Select Available Time. \nStep 05: Confirm Booking.',
    },
    {
      key: 1,
      ques: 'How to revoke medical access?',
      ans: 'Step 01: Go to Medical Access Screen. \nStep 02: Press Revoke.',
    },
    {
      key: 2,
      ques: 'How to change password?',
      ans: 'Step 01: Go to Menu tab. \nStep 02: In the bottom Press "Change Password". \nStep 03: Enter Old Password. \nStep 04: Enter New Password. \nStep 05: Click Change Password.',
    },
    {
      key: 3,
      ques: 'How to verify email?',
      ans: 'Step 01: After Signup, go to your email inbox. \nStep 02: A verification Link was sent. \nStep 03: Open the verification link. \nStep 04: You are now verified.',
    },
  ];

  const [questions, setQuestions] = useState(Questions);
  const [open, setOpen] = useState([]);
  const [display, setDisplay] = useState(false);

  const handleFAQs = element => {
    setOpen([...open, element.key]);
  };

  const deleteItem = key => {
    setOpen(list => open.filter(item => item.key != key));
  };

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
            <Text>
              {item.startTime} - {item.endTime}
            </Text>
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
        }}
        onPress={() => bookAppointment(item)}>
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
      <View
        style={{
          backgroundColor: '#E6EFF9',
          flex: 1,
          padding: 5,
          alignItems:'center'
        }}>
        <View style={{alignItems:'center', width:'100%'}}>
          <ScrollView style={{width:'100%'}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {questions.map((element, index) => {
              return (
                <View style={{alignItems:'center', width:'100%'}}>
                  <TouchableOpacity
                    style={{backgroundColor: 'white', width: '98%', padding: 10, flexDirection:'row', justifyContent:'space-between', borderRadius:5}}
                    onPress={() => handleFAQs(element)}>
                    <Text style={{fontSize:17}}>{element.ques}</Text>
                    <Icon
                      name="keyboard-arrow-down"
                      size={16}
                      color="grey"
                      onPress={() => deleteItem(element.key)}
                    />
                  </TouchableOpacity>

                  {open.includes(element.key) ? (
                    <View style={{width:'100%', padding:15}}>
                      <Text>{element.ans}</Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Faqs;
