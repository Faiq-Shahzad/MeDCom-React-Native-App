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
import DropDownPicker from 'react-native-dropdown-picker';
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';
import {Avatar, Card, Title, IconButton} from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import StarRating from 'react-native-star-rating-widget';

const LabAppointment = ({navigation}) => {
  const {user, backendUrl} = useContext(AuthContext);
  console.log(user);

  const [allTemplates, setAllTemplates] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [date, setDate] = useState(new Date());
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReviews = async () => {
    try {
      console.log(
        'url ' + backendUrl + 'appointments/labreviewsbyquery/opMSP/org3.department',
      );

      const response = await axios.get(
        backendUrl + 'appointments/labreviews/' + '3460173831513',
      );
      console.log('Got Response');
      // console.log(response.data);
      const rev = response.data;

      setReviews(rev);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const getTemplateData = async () => {
    try {
      const response = await axios.get(backendUrl + 'lab/labTemplateInfo/');
      console.log(response.data.templates);
      const templates = response.data.templates.map(item => ({
        label: item.labName,
        value: item.cpt4_code,
      }));
      console.log(templates);
      setAllTemplates(templates);
      console.log('AllTemplates ', allTemplates);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const HandleAppointment = async () => {
    const tempDate = new Date(date);
    const todayDateString = formatDate(tempDate);
    console.log(todayDateString);
    const currentDate = new Date(todayDateString);
    console.log('Date Changed', currentDate.toISOString());
    const testName = allTemplates.filter(item => item.value === value);
    console.log('This is Name ', testName);

    const appointmentDetails = {
      patientId: user.identifier,
      lab: testName[0].label,
      MSP: 'org3.department1',
      time: '1030',
      date: currentDate,
      status: 'pending',
    };
    console.log('Appointment details ', appointmentDetails);

    try {
      const response = await axios.post(
        backendUrl + 'appointments/lab',
        appointmentDetails,
      );
      console.log(response.data);
      if (response.data.status != 'success') {
        alert('Unable to book appointment at the moment');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
      alert('Unable to book appointment at the moment');
    }
  };

  useEffect(() => {
    getTemplateData();
  }, []);

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }

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
            justifyContent: 'center',
            marginBottom: 5,
          }}>
          <MaterialCommunityIcons
            name="microscope"
            style={{marginTop: 'auto', marginBottom: 'auto', color: 'green'}}
            size={60}
            color="grey"
          />
          <Card.Content>
            <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                HexoLife Lab
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  fontStyle: 'italic',
                  color: 'black',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                10:20 AM - 5:30 PM
              </Text>
            </View>
          </Card.Content>
        </View>
      </Card>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
          Book Appointment
        </Text>
      </View>


      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 15,
          paddingBottom:50
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
            Select Test:
          </Text>
        </View>

        <DropDownPicker
          open={open}
          value={value}
          items={allTemplates}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setAllTemplates}
        />

        {/* <Text style={{textAlign: 'center', color: 'grey'}}>
          _________________________________________________________________
        </Text> */}

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
            Book Lab Appointment
          </Text>
        </TouchableOpacity>
      </View>

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
      </View>

      {!loading && (
        <ScrollView
          style={{
            maxHeight: '75%',
            marginBottom: 10,
            borderRadius: 10,
            padding: 5,
            backgroundColor: 'white',
          }}>
          {reviews.map((item, index) => {
            return (
              <View
                style={{
                  // padding: 0,
                  marginHorizontal: 15,
                  paddingTop: index > 0 ? 15 : 8,
                  marginBottom: 8,
                  borderTopColor: 'lightgray',
                  borderTopWidth: index > 0 ? 1 : 0,
                }}>
                <View
                  style={{
                    padding: 5,

                    flexDirection: 'row',
                    // justifyContent: 'space-around',
                    marginBottom: 5,
                  }}>
                  <Avatar.Image
                    style={{
                      marginTop: 'auto',
                      marginBottom: 'auto',
                      marginHorizontal: 10,
                    }}
                    size={45}
                    // source={require('../assets/avatar.jpg')}
                    source={{
                      uri: item.Record.profile
                        ? 'data:image/png;base64,' + item.Record.profile
                        : DummyAvatar,
                    }}
                  />
                  <View
                    style={{
                      // borderColor: 'red',
                      // borderWidth: 2,
                      padding: 0,
                      width: '80%',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        // borderColor: 'red',
                        // borderWidth: 2,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                          fontWeight: '600',
                          maxWidth: '60%',
                        }}>
                        {item.Record.name}
                      </Text>
                      <View
                        style={{
                          marginLeft: 'auto',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <MaterialCommunityIcons
                          name="calendar"
                          size={20}
                          color="lightgray"
                          style={{fontWeight: 'bold', marginRight: 2}}
                        />
                        <Text>
                          {new Date(item.Record.date).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                    <StarRating
                      rating={item.Record.rating}
                      starSize={25}
                      onChange={() => {}}
                      style={{padding: 2}}
                    />
                    <Text>{item.Record.comments}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default LabAppointment;
