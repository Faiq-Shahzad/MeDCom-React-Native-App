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
import {Card, Title, Paragraph} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../navigation/AuthProvider';
import Prescription from './prescription';

function HandleAppointment({route, navigation}) {

  const {backendUrl, token} = useContext(AuthContext);

  const appointment = route.params?.appointment;

  const [loading, setLoading] = useState(true);
  const [medicalRecords, setMedicalRecords] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Appointment',
    });
  }, [navigation]);


  const getMedicalRecords = async () => {
    try {
      // console.log("Getting Doc appointment for ",doctor.cnic)
      // console.log("Getting Doc appointment for ",startDate, endDate)
      console.log("url " +backendUrl + 'patients/medicalrecordByAppointment/'+appointment.Key, token )

      const response = await axios.get(backendUrl + 'patients/medicalrecordByAppointment/'+appointment.Key, {
        headers: {
          authorization: 'Bearer '+token,
        },
      });
      console.log("Got Response");
      // console.log(response.data);
      const allMedicalRecords = response.data
      
      setMedicalRecords(allMedicalRecords)
      setLoading(false)

    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(()=>{
    getMedicalRecords()
  },[])

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
  
  const [details, setDetails] = useState({
    name: appointment.Record.doc.name,
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
              // source={require('../assets/avatar.jpg')}
              source={{ uri: appointment.Record.doc.profile? 'data:image/png;base64,'+appointment.Record.doc.profile: DummyAvatar }}
            />
            <Card.Content style={{alignItems: 'center'}}>
              <Title style={{fontSize: 20, fontWeight: 'bold'}}>
                {appointment.Record.doc.name}
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
                  <Paragraph>{new Date(appointment.Record.date).toLocaleDateString()}</Paragraph>
                </View>
                <Paragraph style={{fontSize: 25, marginTop: 16}}>|</Paragraph>
                <View>
                  <Paragraph style={{fontWeight: 'bold'}}>Time</Paragraph>
                  <Paragraph>{convertTime12h(appointment.Record.time)}</Paragraph>
                </View>
                <Paragraph style={{fontSize: 25, marginTop: 16}}>|</Paragraph>
                <View>
                  <Paragraph style={{fontWeight: 'bold'}}>Fee</Paragraph>
                  <Paragraph>{appointment.Record.doc.price}</Paragraph>
                </View>
              </View>
            </Card.Content>
          </Card>
          {console.log(appointment)}
          {/* <Prescription
            id={appointment.id}
            status={appointment.status}
            medicalRecord={appointment.medicalRecord}
          /> */}
          {loading?( 
            <View>
            <Text style>loading ... </Text>
            </View>
            ):(
            <View style={{width: '80%'}}>
            {medicalRecords.map( (element) =>{
            const symptoms = JSON.parse(element.Record.symptoms);
            const labTests = JSON.parse(element.Record.labTests);

            return(
            <TouchableOpacity key={element.Key} style=
            {{marginTop:10, width:'100%', backgroundColor:'rgba(255,255,255,1)', padding:10, borderRadius:30, shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.84,
              
              elevation: 5,}}
            //  onPress={()=> navigation.navigate("Make Appointment", {doctor:element})}
             >
                <View style={{width:"100%", justifyContent:'center'}}>
                {/* <View style={{width:"85%", borderRadius:20, backgroundColor:"red", justifyContent:'center', padding:10}}> */}
                <View style={{flexDirection:'row'}}>
                    {/* <View style={{}}>
                      <Image style={{width: 100, height: 100, alignSelf:'center', borderRadius:100, marginTop:10}}
                        source={{ uri: `data:image/png;base64,${element.profile}`}}/>
                    </View> */}
                    <View style={{paddingLeft:10, paddingRight: 10}}>
                      <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:17, fontWeight:"bold", color:"blue", marginVertical:5}}>Diagnosis: </Text>
                        <Text style={{fontSize:17, fontWeight:"bold", marginVertical:5}}>{element.Record.diagonsis}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:17, fontWeight:"bold", color:"blue", marginVertical:5}}>Symptoms:  </Text>
                        <Text style={{fontSize:15, color:"gray", marginVertical:5}}>{symptoms.toString()}</Text>
                      </View>

                      <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:17, fontWeight:"bold", color:"blue", marginVertical:5}}>lab Tests: </Text>
                        <Text style={{fontSize:15, color:"gray", marginVertical:5}}>{labTests.toString()}</Text>
                      </View>
                      
                      <Text style={{fontSize:17, fontWeight:"bold", color:"blue", marginVertical:5}}>Prescription: </Text>
                      {element.Record.prescription.map((med,index) => {
                        return <Text key={element.Key+""+index} style={{fontSize:15, color:"gray", marginVertical:2}}>{med.medicineName} - {med.qty} times - {med.days} days</Text>
                      })
                      }
                      <Text style={{fontSize:17, fontWeight:"bold", color:"blue", marginVertical:5}}>Doctors Comments: </Text>
                      <Text style={{marginLeft:5, fontSize:16, fontFamily:"sans-serif", color:"gray"}}>{element.Record.recommendation}</Text>
                      <View style={{flexDirection:"row", width: '100%', marginTop: 15, alignItems:'center'}}>
                          <MaterialCommunityIcons name="clock-time-three" size={15} color="blue" style={{marginLeft: 'auto'}} />
                          <Text style={{marginLeft:5, fontSize:12, fontFamily:"sans-serif", color:"blue"}}>{new Date(element.Record.followUp).toLocaleString()}</Text>
                      </View>

                      
                    </View>
                    {/* <View style={{paddingHorizontal: 10}}>
                      
                      <TouchableOpacity style={{backgroundColor: 'red', padding: 10, borderRadius: 100, marginBottom: 30}} onPress={()=> rejectRequest(element.cnic, false)}>
                        <Text style={{fontSize:15, color:"white", marginVertical:2}}>Reject</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{backgroundColor: 'blue', padding: 10, borderRadius: 100}} onPress={()=> authorizeRequest(element.cnic)}>
                        <Text style={{fontSize:15, color:"white", marginVertical:2}}>Accept</Text>
                      </TouchableOpacity>
                    </View> */}
                  </View>
                </View>
            </TouchableOpacity>
  
            )}
          )}
          </View>)


          }
          

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
