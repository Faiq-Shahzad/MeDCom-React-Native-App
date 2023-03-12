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
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {white} from 'react-native-paper/lib/typescript/styles/colors';
import {UserContext} from '../navigation/UserProvider';
import HandleAppointment from '../components/HandleAppointment';

const BookAppointment = ({navigation}) => {
  // const { data, doctorData, setDoctorData } = useContext(UserContext);

  const Timings = [
    {
      id: 0,
      aptTime: '05:00 PM',
      selected: false,
    },
    {
      key: 1,
      aptTime: '05:30 PM',
      selected: false,
    },
    {
      key: 2,
      aptTime: '06:00 PM',
      selected: false,
    },
    {
      key: 3,
      aptTime: '06:30 PM',
      selected: false,
    },
    {
      key: 4,
      aptTime: '07:00 PM',
      selected: false,
    },
    {
      key: 5,
      aptTime: '07:30 PM',
      selected: false,
    },
    {
      key: 6,
      aptTime: '08:00 PM',
      selected: false,
    },
  ];

  const setSelectedItem = id => {
    Timings.map((item, index) => {
      if (index == id) {
        Timings[index].selected = true;
      } else {
        Timings[index].selected = false;
      }
    });
  };

  const [doctor, setDoctor] = useState({
    name: 'Dr. Saima Riaz',
    specialization: 'Heart Surgeon',
    avatar: '../assets/avatar2.jpg',
    price: 'Rs. 1000/-',
    timings: '10AM - 4PM',
    days: 'Mon - Fri',
  });

  const HandleAppointment = () => {
    Alert.alert('Success', 'Appointment Booked Successfully!', [
      {text: 'OK', onPress: () => navigation.navigate('Home')},
    ]);
  };

  const [date, setDate] = useState('');
  const [time, setTime] = useState();
  const [availableTime, setAvailableTime] = useState(Timings);
  const [color, setColor] = useState('grey');
  const selectedDate = date ? date.toString() : '';

  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        width: '36.5%',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
      <TouchableOpacity
        style={{
          width: '70%',
          borderRadius: 50,
          backgroundColor: item.selected ? 'green' : 'grey',
          borderWidth: 1,
          padding: 5,
        }}
        onPress={() => {
          setSelectedItem(item.key);
          setColor('#44E354');
          setTime(item.aptTime);
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          {item.aptTime}
        </Text>
      </TouchableOpacity>
    </View>
  );

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
              {doctor.name}
            </Text>
            <Text>{doctor.specialization}</Text>
            <Text
              style={{
                marginTop: 5,
                fontStyle: 'italic',
                color: 'black',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{doctor.days}</Text>
              <Text> | </Text>
              <Text>{doctor.timings}</Text>
              <Text></Text>
            </Text>
          </Card.Content>
          <Text
            style={{
              fontSize: 15,
              color: 'green',
              fontWeight: '700',
            }}>
            {doctor.price}
          </Text>
        </View>
      </Card>

      <View
        style={{
          backgroundColor: '#E6EFF9',
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              padding: 10,
            }}>
            <MaterialCommunityIcons
              name="calendar-outline"
              size={20}
              color="grey"
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginLeft: 10,
              }}>
              Select Date:
            </Text>
          </View>

          <View style={{borderRadius: 10}}>
            <CalendarPicker onDateChange={setDate} minDate={new Date()} />
            <Text>{selectedDate}</Text>
          </View>

          <Text style={{textAlign: 'center', color: 'grey'}}>
            _________________________________________________________________
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              padding: 10,
            }}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={20}
              color="grey"
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginLeft: 10,
              }}>
              Select Time:
            </Text>
          </View>
          <View
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: 20,
            }}>
            <FlatList
              data={availableTime}
              renderItem={renderItem}
              numColumns={3}
              keyExtractor={item => item.key}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: '#555DF2',
            padding: 10,
            borderRadius: 5,
            width: '90%',
            marginTop: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          onPress={() => HandleAppointment()}>
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
    </SafeAreaView>
  );
};

export default BookAppointment;
