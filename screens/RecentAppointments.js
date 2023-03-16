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
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';

export default RecentAppointments = ({navigation}) => {
  const {user, doctor, appointment, logout, backendUrl, token} = useContext(AuthContext);
  console.log(appointment);
  const [loading, setLoading] = useState(true);

  const [appointmentArr, setappointmentArr] = useState([]);
  const [completed, setCompleted] = useState();
  const [displayPending, setDisplayPending] = useState(true);
  const [displayCompleted, setDisplayCompleted] = useState(true);

  const ComApp = [
    {
      name: 'Faiq Shahzad',
      time: '12:00 PM',
      date: new Date().toLocaleDateString(),
      status: 'pending',
    },
    {
      name: 'Faiq Shahzad',
      time: '12 PM',
      date: new Date().toLocaleDateString(),
      status: 'completed',
    },
  ];

  const [appointmentList, setAppointmentList] = useState([]);

  // const getAppointments = async () => {
  //   const tempList = []
  //   await firestore()
  //   .collection('appointments')
  //   .where('p_id', '==', user.uid)
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach(doc => {
  //       const {doc_id, p_id, status, date, time, fee, medicalRecord} = doc.data()

  //         tempList.push({
  //           id: doc.id,
  //           doc_id,
  //           status,
  //           date,
  //           time,
  //           fee,
  //           medicalRecord
  //         })

  //       }

  //       )}
  //     ).then(()=>{

  //       const tempList2 = []
  //       tempList.map( ap => {
  //         firestore()
  //         .collection('doctors')
  //         .doc(ap.doc_id)
  //         .get()
  //         .then((documentSnapshot) => {
  //           if( documentSnapshot.exists ) {
  //             const docDetails = documentSnapshot.data()
  //             tempList2.push({...ap, doc:docDetails})
  //           }} )
  //         }

  //         )
  //         setAppointmentList(tempList2)

  //     })

  // }
  const getAppointments = async () => {
    try {
      console.log("Getting Appointments for patient ")
      // console.log("Getting Doc appointment for ",startDate, endDate)
      console.log("url " +backendUrl + 'appointments/query/docType/appointment', token )

      const response = await axios.get(backendUrl + 'appointments/query/docType/appointment', {
        headers: {
          authorization: 'Bearer '+token,
        },
      });
      console.log("Got Response");
      // console.log(response.data);
      const allappointments = response.data
      const pendingApp = []
      const completedApp = []

      allappointments.forEach(element => {
        if(element.Record.status != "completed"){
          pendingApp.push(element)
        }else{
          completedApp.push(element)
        }
      });
      console.log("pending", pendingApp.length)
      console.log("completed", completedApp.length)
      setappointmentArr(pendingApp)
      setAppointmentList(completedApp)
      setLoading(false)

      // const timingArray = []
      // response.data.forEach(element => {
      //   timingArray.push(element.Record.time)
      // });
      // console.log(timingArray)
      // // setDocAppointments(timingArray);
      // const availableSlots = allSlots.filter( ( el ) => !timingArray.includes( ""+el.key ) );
      // console.log("avalible slots ",availableSlots)
      // setAvailableTime(availableSlots);
      // SetPopularDoctors(response.data);
      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    getAppointments();
  }, []);

  // const timeString12hr = (timeString) => {}
  // return new Date('1970-01-01T' + timeString + 'Z')
  // .toLocaleTimeString('en-US',
  //   {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
  // );

  const pendingAppointment = () => {
    Alert.alert('Pending', 'The Request is being processed', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  // useEffect(() => {
  //   setAppointmentList([...appointmentList, appointment]);
  // }, []);

  // const inProgress = (key, index) => {
  //   appointment.map(el => {
  //     if (el.key == key) {
  //       setCompleted([...completed, el]);
  //     }
  //   });

  //   setAppointment(list => appointment.filter(element => element.key != key));

  //   console.log(appointment);
  //   if (appointment.length == 0) {
  //     console.log(appointment.length);
  //     setDisplayPending(false);
  //   }
  // };

  // const getPendingAppointments = () => {
  //   setAppointment(appointmentList.filter(el => el.status === 'pending'));
  // };
  // const getCompletedAppointments = () => {
  //   setCompleted(appointmentList.filter(el => el.status === 'completed'));
  // };

  // useEffect(() => {
  //   setLoading(true)
  //   getAppointments().then(()=>{
  //     getPendingAppointments()
  //     getCompletedAppointments()
  //     console.log(appointmentList)
  //     setLoading(false)
  //   });

  // }, []);

  const convertTime12h = (time) => {
    try{
      let intTime = parseInt(time)
      // console.log("int time ", intTime)
      let suffix = " AM"
      if(intTime >= 1200){
        suffix = " PM"
        if(intTime >= 1300){
          intTime = intTime - 1200;
        }
      }
      // console.log("int time after sub", intTime)
      const hr = parseInt(intTime / 100)
      // console.log("hr", hr)
      let min = intTime - (parseInt(intTime / 100) * 100)
      if(min==0){
        min = "00"
      }
      // console.log("min", min)
      const time12h = ""+hr+":"+min+suffix
      return time12h;

    }catch(e){
      console.log(e)
      return time

    }
  }

  if (loading) {
    console.log('Some data');
    return (
      <View>
        <Text> Loading </Text>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{backgroundColor: 'white', padding: 15}}
          onPress={() =>
            getAppointments()
          }>
          <Text style={{marginLeft: 7, fontSize: 17, fontWeight: 'bold'}}>
            Pending Appointments
          </Text>
        </TouchableOpacity>

        {!loading & (displayPending || appointmentArr.length != 0) ? (
          
          <ScrollView
            style={{
              width: '100%',
              maxHeight: '45%',
              paddingBottom: 10,
              padding: 2,
            }}>
            {appointmentArr.map((element, index) => {
              console.log(index)
              {/* if (element.Record.status == 'pending') { */}
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
                          <Text
                            style={{
                              marginTop: 5,
                              fontStyle: 'italic',
                              color: 'black',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text>{new Date(element.Record.date).toLocaleDateString()}</Text>
                            <Text> | </Text>
                            <Text>{convertTime12h(element.Record.time)}</Text>
                            <Text></Text>
                          </Text>
                        </Card.Content>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              {/* } else {
                return <></>;
              } */}
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
          <ScrollView style={{maxHeight: '45%', width: '100%', padding: 2}}>
            {appointmentList.map((element, index) => {
                    
              {/* if (element.status == 'completed') { */}
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
                          <Text
                            style={{
                              marginTop: 5,
                              fontStyle: 'italic',
                              color: 'black',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text>{new Date(element.Record.date).toLocaleDateString()}</Text>
                            <Text> | </Text>
                            <Text>{convertTime12h(element.Record.time)}</Text>
                            <Text></Text>
                          </Text>
                        </Card.Content>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              {/* } else {
                return <></>;
              } */}
            })}
          </ScrollView>
        ) : (
          <View style={{width: 0, height: 0}}></View>
        )}
      </View>
    );
  }
};
