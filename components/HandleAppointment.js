import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Prescription from './prescription';

function HandleAppointment({route, navigation}) {
  const appointment = route.params?.appointment;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Appointment',
    });
  }, [navigation]);

  // const [medicalRecord, setMedicalRecords] = useState(
  //   appointment.medicalRecord,
  // );

  // const [details, setDetails] = useState({
  //   name: 'Muhammad Ahmed',
  //   date: '28-06-2022',
  //   time: '13:00',
  //   fees: '2500',
  //   status: 'in-progress',
  // });
  const [details, setDetails] = useState({
    name: 'Muhammad Ahmed',
    date: '28-06-2022',
    time: '13:00',
    fees: '2500',
    status: 'in-progress',
  });

  return (
    // <View style={{flex: 1}}>
    // <ScrollView style={{flex: 1,}}>

    // <View style={{flex: 1, justifyContent:'center', alignItems:'center', paddingBottom:5, marginBottom:5}}>
    //   <Card style={{width:"80%", marginTop:20, alignItems:"center", marginBottom:10}}>
    //     <Image style={{width: 100, height: 100, alignSelf:'center', borderRadius:100, marginTop:10}}
    //           source={{ uri: appointment.doc.imgUrl}}/>
    //     <Card.Content style={{alignItems:"center"}}>
    //       <Title style={{fontSize:20, fontWeight:"bold"}}>{appointment.name}</Title>
    //       <View style={{flexDirection:"row", justifyContent:"space-evenly", width:"100%", marginTop:5}}>
    //         <View>
    //             <Paragraph style={{fontWeight:"bold"}}>Appointment Date</Paragraph>
    //             <Paragraph>{(new Date(appointment.date.seconds*1000)).toLocaleDateString()}</Paragraph>
    //         </View>
    //         <Paragraph style={{fontSize:25, marginTop:16}}>|</Paragraph>
    //         <View>
    //             <Paragraph style={{fontWeight:"bold"}}>Time</Paragraph>
    //             <Paragraph>{appointment.time}</Paragraph>
    //         </View>
    //         <Paragraph style={{fontSize:25, marginTop:16}}>|</Paragraph>
    //         <View>
    //             <Paragraph style={{fontWeight:"bold"}}>Fee</Paragraph>
    //             <Paragraph>{appointment.fee}</Paragraph>
    //         </View>
    //       </View>
    //     </Card.Content>
    //   </Card>
    //   {console.log(appointment)}
    //   <Prescription id={appointment.id} status={appointment.status} medicalRecord={appointment.medicalRecord} />

    // </View>
    // </ScrollView>
    // </View>

    <View style={{flex: 1}}>
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
              source={require('../assets/avatar.jpg')}
            />
            <Card.Content style={{alignItems: 'center'}}>
              <Title style={{fontSize: 20, fontWeight: 'bold'}}>
                {details.name}
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
                  <Paragraph>{details.date}</Paragraph>
                </View>
                <Paragraph style={{fontSize: 25, marginTop: 16}}>|</Paragraph>
                <View>
                  <Paragraph style={{fontWeight: 'bold'}}>Time</Paragraph>
                  <Paragraph>{details.time}</Paragraph>
                </View>
                <Paragraph style={{fontSize: 25, marginTop: 16}}>|</Paragraph>
                <View>
                  <Paragraph style={{fontWeight: 'bold'}}>Fee</Paragraph>
                  <Paragraph>{details.fees}</Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
          {console.log(appointment)}
          <Prescription
            id={appointment.id}
            status={appointment.status}
            medicalRecord={appointment.medicalRecord}
          />

          <TouchableOpacity
            style={{
              marginTop: 20,
              margin: 10,
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 8,
              width: '98%',
              shadowOpacity: 1,
              shadowRadius: 3,
              elevation: 3,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Reviews')}>
            <Icon
              name="rate-review"
              size={20}
              color="grey"
            />
            <Text style={{fontSize: 16, fontWeight: 'bold', padding: 5}}>
              Write a Review
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default HandleAppointment;
