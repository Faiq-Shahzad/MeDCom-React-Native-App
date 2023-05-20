import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import {getProfileData} from 'react-native-calendars/src/Profiler';
import {Card, Title, Paragraph} from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../navigation/AuthProvider';
import Prescription from './prescription';

function HandleLabAppointment({route, navigation}) {
  const {backendUrl, token} = useContext(AuthContext);

  const appointment = route.params?.appointment;

  const [loading, setLoading] = useState(true);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [review, setReview] = useState();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Appointment',
    });
  }, [navigation]);

  const getLabRecords = async () => {
    try {
      console.log(
        'url ' +
          backendUrl +
          'patients/labrecordByAppointment/' +
          appointment.Key,
        token,
      );

      const response = await axios.get(
        backendUrl + 'patients/labrecordByAppointment/' + appointment.Key,
        {
          headers: {
            authorization: 'Bearer ' + token,
          },
        },
      );
      console.log('Got Response');
      const allLabRecords = response.data;

      setMedicalRecords(allLabRecords);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getReview = async () => {
    try {
      console.log(
        'url ' + backendUrl + 'appointments/review/LRID-' + appointment.Key,
      );

      const response = await axios.get(
        backendUrl + 'appointments/review/LRID-' + appointment.Key,
      );
      console.log('Got Response');
      console.log('Rev', response.data);
      const rev = response.data;
      if (rev.message) {
        setReview(null);
      } else {
        setReview(rev);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getData = async () => {
    await getReview()
    await getLabRecords();
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const convertTime12h = time => {
    try {
      let intTime = parseInt(time);
      // console.log("int time ", intTime)
      let suffix = ' AM';
      if (intTime >= 1200) {
        suffix = ' PM';
        if (intTime >= 1300) {
          intTime = intTime - 1200;
        }
      }
      // console.log("int time after sub", intTime)
      const hr = parseInt(intTime / 100);
      // console.log("hr", hr)
      let min = intTime - parseInt(intTime / 100) * 100;
      if (min == 0) {
        min = '00';
      }
      // console.log("min", min)
      const time12h = '' + hr + ':' + min + suffix;
      return time12h;
    } catch (e) {
      console.log(e);
      return time;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#E6EFF9'}}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 5,
            marginBottom: 5,
          }}>
          <Card
            style={{
              width: '80%',
              marginTop: 20,
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                borderRadius: 100,
                marginTop: 10,
              }}
              // source={require('../assets/avatar.jpg')}
              source={{
                uri: appointment.Record.op.profile
                  ? 'data:image/png;base64,' + appointment.Record.op.profile
                  : DummyAvatar,
              }}
            />
            <Card.Content style={{alignItems: 'center'}}>
              <Title style={{fontSize: 20, fontWeight: 'bold'}}>
                {appointment.Record.op.name}
              </Title>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  marginTop: 5,
                }}>
                <View>
                  <Paragraph style={{fontWeight: 'bold'}}>
                    Appointment Date
                  </Paragraph>
                  <Paragraph>
                    {new Date(appointment.Record.date).toLocaleDateString()}
                  </Paragraph>
                </View>
                <Paragraph style={{fontSize: 25, marginTop: 16}}>|</Paragraph>
                <View>
                  <Paragraph style={{fontWeight: 'bold'}}>Time</Paragraph>
                  <Paragraph>
                    {convertTime12h(appointment.Record.time)}
                  </Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
          {loading ? (
            <View>
              <Text style>loading ... </Text>
            </View>
          ) : (
            <View style={{width: '100%'}}>
              {medicalRecords.map(element => {
                return (
                  <TouchableOpacity
                    key={element.Key}
                    style={{
                      marginTop: 10,
                      width: '100%',
                      backgroundColor: 'rgba(255,255,255,1)',
                      padding: 10,
                      borderRadius: 10,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4.84,

                      elevation: 5,
                    }}>
                    <View style={{width: '100%', justifyContent: 'center'}}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{paddingLeft: 10, paddingRight: 10}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: 'blue',
                                marginVertical: 5,
                              }}>
                              Test:{' '}
                            </Text>
                            {console.log('the Element is ', element.Record)}
                            <Text
                              style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                marginVertical: 5,
                              }}>
                              {element.Record.cpt4_code} -{' '}
                              {element.Record.labName}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: 'blue',
                                marginVertical: 5,
                              }}>
                              Comments:{' '}
                            </Text>
                            <Text
                              style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                marginVertical: 5,
                              }}>
                              {element.Record.comments}
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: 'bold',
                              color: 'blue',
                              marginVertical: 5,
                            }}>
                            Results:{' '}
                          </Text>
                          {element.Record.tests.map((item, index) => {
                            return (
                              <View
                                key={element.Key + '' + index}
                                style={{
                                  borderBottomWidth: 1,
                                  borderBottomColor: 'gray',
                                  marginBottom: 5,
                                  paddingBottom: 5,
                                }}>
                                <View
                                  style={{
                                    fontSize: 15,
                                    color: 'gray',
                                    marginVertical: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                      marginRight: 2,
                                      width: 80,
                                    }}>
                                    Observation:
                                  </Text>
                                  <Text>{item.testName}</Text>
                                </View>
                                <View
                                  style={{
                                    fontSize: 15,
                                    color: 'gray',
                                    marginVertical: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                      marginRight: 2,
                                      width: 80,
                                    }}>
                                    Result:
                                  </Text>
                                  <Text>
                                    {item.result} {item.units}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    fontSize: 15,
                                    color: 'gray',
                                    marginVertical: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexShrink: 1,
                                  }}>
                                  <Text
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                      marginRight: 2,
                                      width: 80,
                                    }}>
                                    Reference:
                                  </Text>
                                  <Text style={{width: '78%'}}>
                                    {item.reference}
                                  </Text>
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}

              
              {!review ? (
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    margin: 10,
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 8,
                    width: '95%',
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    elevation: 3,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() =>
                    navigation.navigate('Lab Reviews', {
                      appointment: appointment.Record,
                    })
                  }>
                  <Icon name="rate-review" size={20} color="grey" />
                  <Text style={{fontSize: 16, fontWeight: 'bold', padding: 5}}>
                    Write a Review
                  </Text>
                </TouchableOpacity>
              ) : (
                <Card
                  style={{
                    marginTop: 20,
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
                      Review
                    </Text>
                    <View style={{display:'flex', justifyContent:'center', marginLeft:'auto', marginRight:'auto'}}>
                      <StarRating
                        rating={review.rating}
                        onChange={() => {}}
                        style={{
                          backgroundColor: 'white',
                          padding: 5,
                          borderRadius: 10,

                          width: '61%',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: '600',
                      }}>
                      Comment:
                    </Text>
                    <Text>{review.comments}</Text>
                  </Card.Content>
                </Card>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default HandleLabAppointment;
