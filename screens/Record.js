import React, {useState, useEffect, useContext} from 'react';
import { Text, View, Image,FlatList, Alert, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import axios from 'axios';

export default RecordScreen = ({navigation}) => {
    // const [doctors, getDoctors] = useState([{"name":"Faiq Shahzad", "speciality":"MBBS | Surgeon", "time":"11:00 - 1550", "star":"3.5"},{"name":"Fazal Khan", "speciality":"MBBS | Biologist", "time":"800 - 1200", "star":"4.7"}]);
    // const onStarRatingPress = (rating) => {
    //   this.setState({
    //     starCount: rating
    //   });
    // }
    const {user, logout, backendUrl, token, DummyAvatar} = useContext(AuthContext);

    const [details, setDetails] = useState()
    const [cnicInput, setCnicInput] = useState()
    // var details;
    const [loading, setLoading] = useState(true)

    const [medicalList, setMedicalList] = useState([]);
    const [authDocList, setAuthDocList] = useState([]);



    const getMedicalRecord = async () => {
      setLoading(true);
      const tempList = []
      const tempList2 = []

      try {
        console.log('sending request ..')
        const response = await axios.get(backendUrl+'patients/allmedicalrecords', {
          headers: {
            authorization: `Bearer ${token}`
          }
          });
        // console.log(response.data);
        const medicalRecords = response.data;
        console.log('no of records ', medicalRecords.length)
        // console.log(userData.pendingRequesters);
        // console.log(userData.authorizedRequesters);

        // for (const cnic of userData.pendingRequesters) {
        //   const docData = await getDocDetails(cnic);
        //   // console.log('docData', docData);
        //   tempList.push(docData);
        // }

        // for (const cnic of userData.authorizedRequesters) {
        //   const docData = await getDocDetails(cnic);
        //   // console.log('docData', docData);
        //   tempList2.push(docData);
        // }
        

        console.log(medicalRecords)
        
        setMedicalList(medicalRecords);
        // setAuthDocList(tempList2)
        setLoading(false);

        // console.log("DOC", docList)
        // setLoading(false)
      } catch (error) {
        console.log(error);

        console.log(error.response.data);
      }
        
      
    }


    useEffect(() => {
      // getDoc();
      getMedicalRecord();
      
    }, []);
  
  
    if(loading){
      console.log("loading Data")
      return(
        <View>
          <Text> Loading </Text>
        </View>
      )
    }else{

    return(
      <View style={{flex:1, marginTop:10, alignItems:"center"}}>
        
        {medicalList.map( (element) =>{
            const symptoms = JSON.parse(element.Record.symptoms);
            const labTests = JSON.parse(element.Record.labTests);

            return(
            <TouchableOpacity key={element.Key} style=
            {{marginTop:10, width:'90%', backgroundColor:'rgba(255,255,255,1)', padding:10, borderRadius:30, shadowColor: "#000",
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
                        <Text style={{fontSize:17, fontWeight:"bold", color:"red", marginVertical:5}}>Diagnosis: </Text>
                        <Text style={{fontSize:17, fontWeight:"bold", marginVertical:5}}>{element.Record.diagonsis}</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:17, fontWeight:"bold", color:"red", marginVertical:5}}>Symptoms:  </Text>
                        <Text style={{fontSize:15, color:"blue", marginVertical:5}}>{symptoms.toString()}</Text>
                      </View>

                      <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:17, fontWeight:"bold", color:"red", marginVertical:5}}>lab Tests: </Text>
                        <Text style={{fontSize:15, color:"blue", marginVertical:5}}>{labTests.toString()}</Text>
                      </View>
                      
                      <Text style={{fontSize:17, fontWeight:"bold", color:"red", marginVertical:5}}>Prescription: </Text>
                      {element.Record.prescription.map((med,index) => {
                        return <Text key={element.Key+""+index} style={{fontSize:15, color:"blue", marginVertical:2}}>{med.medicineName} - {med.qty} times - {med.days} days</Text>
                      })
                      }
                      <Text style={{fontSize:17, fontWeight:"bold", color:"red", marginVertical:5}}>Doctors Comments: </Text>
                      <Text style={{marginLeft:5, fontSize:16, fontFamily:"sans-serif", color:"blue"}}>{element.Record.recommendation}</Text>
                      <View style={{flexDirection:"row", marginTop:5, alignItems:'center'}}>
                          <MaterialCommunityIcons name="clock-time-three" size={24} color="blue" />
                          <Text style={{marginLeft:5, fontSize:16, fontFamily:"sans-serif", color:"blue"}}>{new Date(element.Record.followUp).toLocaleString()}</Text>
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
  
          );
        })}

      </View>
    );
    }
  }