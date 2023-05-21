import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Avatar, Card, Title, IconButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';

export default RecentAppointments = ({navigation}) => {
  const {user, doctor, appointment, logout, backendUrl, token} =
    useContext(AuthContext);
  console.log(appointment);
  const [loading, setLoading] = useState(true);

  const [completed, setCompleted] = useState();
  const [displayPending, setDisplayPending] = useState(true);
  const [displayCompleted, setDisplayCompleted] = useState(true);

  const [appointmentList, setAppointmentList] = useState([]);
  const [appointmentArr, setappointmentArr] = useState([]);
  const [LabAppointmentList, setLabAppointmentList] = useState([]);
  const [LabAppointmentArr, setLabAppointmentArr] = useState([]);

  const [items, setItems] = useState([
    {label: 'Lab Appointments', value: 'lab'},
    {label: 'Hospital Appointments', value: 'hospital'},
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('lab');

  const getAppointments = async () => {
    try {
      console.log('Getting Appointments for patient ');
      console.log(
        'url ' + backendUrl + 'appointments/query/docType/appointment',
        token,
      );

      const response = await axios.get(
        backendUrl + 'appointments/query/docType/appointment',
        {
          headers: {
            authorization: 'Bearer ' + token,
          },
        },
      );
      console.log('Got Response');
      const allappointments = response.data;
      console.log('Response is', response.data);
      const pendingApp = [];
      const completedApp = [];

      allappointments.forEach(element => {
        if (element.Record.status != 'completed') {
          pendingApp.push(element);
        } else {
          completedApp.push(element);
        }
      });
      console.log('pending', pendingApp.length);
      console.log('completed', completedApp.length);
      setappointmentArr(pendingApp);
      setAppointmentList(completedApp);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getLabAppointments = async () => {
    try {
      console.log('Getting Lab Appointments for patient ');
      console.log(
        'url ' + backendUrl + 'appointments/query/docType/labappointment',
        token,
      );

      const response = await axios.get(
        backendUrl + 'appointments/query/docType/labappointment',
        {
          headers: {
            authorization: 'Bearer ' + token,
          },
        },
      );
      console.log('Got Response 2');
      const allappointments = response.data;
      console.log('Response is2 ', response.data.op);
      const pendingApp = [];
      const completedApp = [];

      allappointments.forEach(element => {
        if (element.Record.status != 'completed') {
          pendingApp.push(element);
        } else {
          completedApp.push(element);
        }
      });
      console.log('pending', pendingApp.length);
      console.log('completed', completedApp.length);
      setLabAppointmentArr(pendingApp);
      setLabAppointmentList(completedApp);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    console.log('useeffect');
    getAppointments();
    getLabAppointments();
  }, []);

  const pendingAppointment = () => {
    Alert.alert('Pending', 'The Request is being processed', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

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

  if (loading) {
    console.log('Some data');
    return (
      <View>
        <Text> Loading </Text>
      </View>
    );
  } else {
    return (
      <View style={{flex:1, backgroundColor: '#E6EFF9'}}>
        <View style={{margin: 10}}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>

        <View style={{}}>
          {/* HOSPITAL APPOINTMENTS */}
          {value == 'hospital' ? (
            <>
              <TouchableOpacity style={{backgroundColor: 'white', padding: 15}}>
                <Text style={{marginLeft: 7, fontSize: 17, fontWeight: 'bold'}}>
                  Pending Appointments
                </Text>
              </TouchableOpacity>

              {!loading & (displayPending || appointmentArr.length != 0) ? (
                <ScrollView
                  style={{
                    width: '100%',
                    maxHeight: '45%',
                    paddingBottom: 60,
                    padding: 2,
                  }}>
                  {appointmentArr.map((element, index) => {
                    console.log(index);
                    {
                      /* if (element.Record.status == 'pending') { */
                    }
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{width: '100%', marginVertical: 10}}
                        onPress={() => pendingAppointment(element.key, index)}>
                        <Card
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            width: '90%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              padding: 5,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 5,
                            }}>
                            <Card.Content
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}>
                              <View style={{flexDirection: 'column'}}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontWeight: '600',
                                  }}>
                                  {element.Record.doc.name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontWeight: '600',
                                  }}>
                                  {element.Record.doc.contact}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={{
                                    marginTop: 5,
                                    fontStyle: 'italic',
                                    color: 'black',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  {new Date(
                                    element.Record.date,
                                  ).toLocaleDateString()}
                                  |{convertTime12h(element.Record.time)}
                                  {/* <Text></Text> */}
                                </Text>
                                <Text
                                  style={{
                                    marginTop: 5,
                                    fontStyle: 'italic',
                                    color: 'black',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  Status | {element.Record.status}
                                </Text>
                              </View>
                            </Card.Content>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    );
                    {
                      /* } else {
                return <></>;
              } */
                    }
                  })}
                </ScrollView>
              ) : (
                <View style={{width: 0, height: 0}}></View>
              )}

              <TouchableOpacity
                style={{backgroundColor: 'white', padding: 15}}
                onPress={() =>
                  displayCompleted
                    ? setDisplayCompleted(false)
                    : setDisplayCompleted(true)
                }>
                <Text style={{marginLeft: 7, fontSize: 17, fontWeight: 'bold'}}>
                  Appointment History
                </Text>
              </TouchableOpacity>

              {displayCompleted || completed.length != 0 ? (
                <ScrollView
                  style={{maxHeight: '45%', width: '100%', padding: 2}}>
                  {appointmentList.map((element, index) => {
                    {
                      /* if (element.status == 'completed') { */
                    }
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{width: '100%', marginVertical: 10}}
                        onPress={() =>
                          navigation.navigate('Handle Appointment', {
                            appointment: element,
                          })
                        }>
                        <Card
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            width: '90%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              padding: 5,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 5,
                            }}>
                            <Card.Content
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}>
                              <View style={{flexDirection: 'column'}}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontWeight: '600',
                                  }}>
                                  {element.Record.doc.name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontWeight: '600',
                                  }}>
                                  {element.Record.doc.contact}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={{
                                    marginTop: 5,
                                    fontStyle: 'italic',
                                    color: 'black',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  {new Date(
                                    element.Record.date,
                                  ).toLocaleDateString()}
                                  |{convertTime12h(element.Record.time)}
                                  {/* <Text></Text> */}
                                </Text>
                                <Text
                                  style={{
                                    marginTop: 5,
                                    fontStyle: 'italic',
                                    color: 'black',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  Status |{element.Record.status}
                                </Text>
                              </View>
                            </Card.Content>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    );
                    {
                      /* } else {
                return <></>;
              } */
                    }
                  })}
                </ScrollView>
              ) : (
                <View style={{width: 0, height: 0}}></View>
              )}
            </>
          ) : (
            <>
              {/* LAB APPOINTMENTS */}
              <TouchableOpacity style={{backgroundColor: 'white', padding: 15}}>
                <Text style={{marginLeft: 7, fontSize: 17, fontWeight: 'bold'}}>
                  Pending Appointments
                </Text>
              </TouchableOpacity>

              {!loading & (displayPending || LabAppointmentArr.length != 0) ? (
                <ScrollView
                  style={{
                    width: '100%',
                    maxHeight: '45%',
                    paddingBottom: 60,
                    padding: 2,
                  }}>
                  {LabAppointmentArr.map((element, index) => {
                    console.log(index);
                    {
                      /* if (element.Record.status == 'pending') { */
                    }
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{width: '100%', marginVertical: 10}}
                        onPress={() => pendingAppointment(element.key, index)}>
                        <Card
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            width: '90%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              padding: 5,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 5,
                            }}>
                            <Card.Content
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}>
                              <View style={{flexDirection: 'column'}}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontWeight: '600',
                                  }}>
                                  {element.Record.op.name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontWeight: '600',
                                  }}>
                                  {element.Record.op.contact}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={{
                                    marginTop: 5,
                                    fontStyle: 'italic',
                                    color: 'black',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  {new Date(
                                    element.Record.date,
                                  ).toLocaleDateString()}
                                  |{convertTime12h(element.Record.time)}
                                  {/* <Text></Text> */}
                                </Text>
                                <Text
                                  style={{
                                    marginTop: 5,
                                    fontStyle: 'italic',
                                    color: 'black',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  Status | {element.Record.status}
                                </Text>
                              </View>
                            </Card.Content>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    );
                    {
                      /* } else {
                return <></>;
              } */
                    }
                  })}
                </ScrollView>
              ) : (
                <View style={{width: 0, height: 0}}></View>
              )}

              <TouchableOpacity
                style={{backgroundColor: 'white', padding: 15}}
                onPress={() =>
                  displayCompleted
                    ? setDisplayCompleted(false)
                    : setDisplayCompleted(true)
                }>
                <Text style={{marginLeft: 7, fontSize: 17, fontWeight: 'bold'}}>
                  Appointment History
                </Text>
              </TouchableOpacity>

              {displayCompleted || completed.length != 0 ? (
                <ScrollView
                  style={{maxHeight: '45%', width: '100%', padding: 2}}>
                  {LabAppointmentList.map((element, index) => {
                    {
                      /* if (element.status == 'completed') { */
                    }
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{width: '100%', marginVertical: 10}}
                        onPress={() =>
                          navigation.navigate('Handle Lab Appointment', {
                            appointment: element,
                          })
                        }>
                        <Card
                          style={{
                            padding: 10,
                            borderRadius: 10,
                            width: '90%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              padding: 5,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 5,
                            }}>
                            <Card.Content
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                              }}>
                              <View style={{flexDirection: 'column'}}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontWeight: '600',
                                  }}>
                                  {element.Record.op.name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontWeight: '600',
                                  }}>
                                  {element.Record.op.contact}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={{
                                    marginTop: 5,
                                    fontStyle: 'italic',
                                    color: 'black',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  {new Date(
                                    element.Record.date,
                                  ).toLocaleDateString()}
                                  |{convertTime12h(element.Record.time)}
                                  {/* <Text></Text> */}
                                </Text>
                                <Text
                                  style={{
                                    marginTop: 5,
                                    fontStyle: 'italic',
                                    color: 'black',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                  }}>
                                  Status |{element.Record.status}
                                </Text>
                              </View>
                            </Card.Content>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    );
                    {
                      /* } else {
                return <></>;
              } */
                    }
                  })}
                </ScrollView>
              ) : (
                <View style={{width: 0, height: 0}}></View>
              )}
            </>
          )}
        </View>
      </View>
    );
  }
};
