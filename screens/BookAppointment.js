import React, {useState, useEffect, useContext, useReducer} from 'react';
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
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';
import {Avatar, Card, Title, IconButton} from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HandleAppointment from '../components/HandleAppointment';

const BookAppointment = ({navigation}) => {
  const {doctor, user, appointment, setAppointment} = useContext(AuthContext);
  console.log(user)
  const [selectedTime, setSelectedTime] = useState({});
  const [createApt, setCreateApt] = useState({});

  const HandleAppointment = () => {
    setCreateApt({
      doctorId: doctor.key,
      patientId: user.identifier,
      doctorMSP: 'org2.department1',
      time: selectedTime.key,
      date: selectedDate,
      status: 'pending',
    });
    console.log(createApt);
    setAppointment({
      doctorId: doctor.key,
      patientId: user.identifier,
      doctorMSP: 'org2.department1',
      time: selectedTime.key,
      date: selectedDate,
      status: 'pending'
    });
    Alert.alert('Success', 'Appointment Booked Successfully!', [
      {text: 'OK', onPress: () => navigation.navigate('Appointments')},
    ]);
  };

  const [date, setDate] = useState('');
  const [availableTime, setAvailableTime] = useState([]);
  const selectedDate = date ? date.toString() : '';

  const createIntervals = (startTime, endTime) => {
    const [Stime, Smodifier] = startTime.split(' ');
    const [Etime, Emodifier] = endTime.split(' ');
    const timesArray = [];

    let [Shours, Sminutes] = Stime.split(':');
    let [Ehours, Eminutes] = Etime.split(':');

    if (!Sminutes) {
      Sminutes = '00';
    }
    if (!Eminutes) {
      Eminutes = '00';
    }

    if (Shours === '12') {
      Shours = '00';
    }

    if (Ehours === '12') {
      Ehours = '00';
    }

    if (Smodifier === 'PM') {
      Shours = parseInt(Shours, 10) + 12;
    }

    if (Emodifier === 'PM') {
      Ehours = parseInt(Ehours, 10) + 12;
    }

    let finished = false;

    while (!finished) {
      const MilitaryTime = Shours * 100 + parseInt(Sminutes, 10);
      const MilitaryEndTime = Ehours * 100 + parseInt(Eminutes, 10);
      console.log(MilitaryTime, MilitaryEndTime);
      if (MilitaryTime <= MilitaryEndTime) {
        if (MilitaryTime < 1200) {
          timesArray.push({
            key: MilitaryTime,
            value: (Shours % 12) + ':' + Sminutes + ' AM',
          });
        } else {
          var hour = Shours % 12;
          if (hour == 0) {
            timesArray.push({
              key: MilitaryTime,
              value: 12 + ':' + Sminutes + ' PM',
            });
          } else {
            timesArray.push({
              key: MilitaryTime,
              value: (Shours % 12) + ':' + Sminutes + ' PM',
            });
          }
        }

        if (Sminutes == '00') {
          Sminutes = '30';
          const MilitaryTime = Shours * 100 + parseInt(Sminutes, 10);
          if (MilitaryTime <= MilitaryEndTime) {
            if (MilitaryTime < 1200) {
              var hour = Shours % 12;
              console.log(hour);
              if (hour == 0) {
                timesArray.push({
                  key: MilitaryTime,
                  value: 12 + ':' + Sminutes + ' PM',
                });
              } else {
                timesArray.push({
                  key: MilitaryTime,
                  value: (Shours % 12) + ':' + Sminutes + ' PM',
                });
              }
            } else {
              var hour = Shours % 12;
              if (hour == 0) {
                timesArray.push({
                  key: MilitaryTime,
                  value: 12 + ':' + Sminutes + ' PM',
                });
              } else {
                timesArray.push({
                  key: MilitaryTime,
                  value: (Shours % 12) + ':' + Sminutes + ' PM',
                });
              }
            }
          }
        }
        Shours = parseInt(Shours, 10) + 1;
        Sminutes = '00';
      } else {
        finished = true;
      }
    }

    setAvailableTime(timesArray);
  };

  useEffect(() => {
    createIntervals(doctor.startTime, doctor.endTime);
  }, []);

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
          backgroundColor: item.key == selectedTime.key ? 'green' : 'grey',
          borderWidth: 1,
          padding: 5,
        }}
        onPress={() => {
          setSelectedTime({key: item.key, value: item.value});
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>{item.value}</Text>
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
            source={doctor.avatar}
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
              <Text>
                {doctor.startTime} - {doctor.endTime}
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
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
