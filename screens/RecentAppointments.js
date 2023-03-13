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

export default RecentAppointments = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [appointmentList, setAppointmentList] = useState(ComApp);
  const [loading, setLoading] = useState(false);

  const [appointment, setAppointment] = useState();
  const [completed, setCompleted] = useState();
  const [displayPending, setDisplayPending] = useState(true);
  const [displayCompleted, setDisplayCompleted] = useState(true);

  const ComApp = [
    {
      name: 'Faiq Shahzad',
      time: '12 PM',
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

  const pendingAppointment = () => {
    Alert.alert('Pending', 'The Request is being processed', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const inProgress = (key, index) => {
    appointment.map(el => {
      if (el.key == key) {
        setCompleted([...completed, el]);
      }
    });

    setAppointment(list => appointment.filter(element => element.key != key));

    console.log(appointment);
    if (appointment.length == 0) {
      console.log(appointment.length);
      setDisplayPending(false);
    }
  };

  const getPendingAppointments = () => {
    setAppointment(appointmentList.filter(el => el.status === 'pending'));
  };
  const getCompletedAppointments = () => {
    setCompleted(appointmentList.filter(el => el.status === 'completed'));
  };

  // useEffect(() => {
  //   setLoading(true)
  //   getAppointments().then(()=>{
  //     getPendingAppointments()
  //     getCompletedAppointments()
  //     console.log(appointmentList)
  //     setLoading(false)
  //   });

  // }, []);

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
            displayPending ? setDisplayPending(false) : setDisplayPending(true)
          }>
          <Text style={{marginLeft: 7, fontSize: 17, fontWeight: 'bold'}}>
            Pending Appointments
          </Text>
        </TouchableOpacity>

        {displayPending || appointment.length != 0 ? (
          <ScrollView
            style={{
              width: '100%',
              maxHeight: '30%',
              paddingBottom: 10,
              padding: 2,
            }}>
            {ComApp.map((element, index) => {
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
                      flexDirection:'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        padding: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 5,
                      }}>
                      <Card.Content style={{flexDirection:'row', justifyContent: 'space-between', width:'100%'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontWeight: '600',
                          }}>
                          {element.name}
                        </Text>
                        <Text
                          style={{
                            marginTop: 5,
                            fontStyle: 'italic',
                            color: 'black',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text>{element.date}</Text>
                          <Text> | </Text>
                          <Text>{element.time}</Text>
                          <Text></Text>
                        </Text>
                      </Card.Content>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
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
          <ScrollView style={{maxHeight: '30%', width: '100%', padding: 2}}>
            {ComApp.map(element => {
              return (
                <TouchableOpacity
                  style={{width: '100%', marginVertical: 15}}
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
                      flexDirection:'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        padding: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 5,
                      }}>
                      <Card.Content style={{flexDirection:'row', justifyContent: 'space-between', width:'100%'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontWeight: '600',
                          }}>
                          {element.name}
                        </Text>
                        <Text
                          style={{
                            marginTop: 5,
                            fontStyle: 'italic',
                            color: 'black',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text>{element.date}</Text>
                          <Text> | </Text>
                          <Text>{element.time}</Text>
                          <Text></Text>
                        </Text>
                      </Card.Content>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View style={{width: 0, height: 0}}></View>
        )}
      </View>
    );
  }
};
