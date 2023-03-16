import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {Avatar, Card, Title, IconButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';

export default SearchDoctors = ({navigation}) => {
  // const [doctors, getDoctors] = useState([{"name":"Faiq Shahzad", "speciality":"MBBS | Surgeon", "time":"11:00 - 1550", "star":"3.5"},{"name":"Fazal Khan", "speciality":"MBBS | Biologist", "time":"800 - 1200", "star":"4.7"}]);
  // const onStarRatingPress = (rating) => {
  //   this.setState({
  //     starCount: rating
  //   });
  // }
  const {user, logout, backendUrl, token, DummyAvatar} =
    useContext(AuthContext);

  const dummyArray = [
    {
      cnic: '4123131231',
      profile:
        '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',

      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
  ];

  const [details, setDetails] = useState();
  const [cnicInput, setCnicInput] = useState();
  // var details;
  const [loading, setLoading] = useState(false);

  const [docList, setDocList] = useState([]);
  const [authDocList, setAuthDocList] = useState([]);

  const getDocDetails = async cnic => {
    try {
      console.log('url ', backendUrl + 'doctors/search/cnic/' + cnic);
      const response = await axios.post(
        backendUrl + 'doctors/search/cnic/' + cnic,
      );
      // console.log(response.data[0])
      return response.data[0].Record;
    } catch (error) {
      console.log(error);
    }
  };

  const rejectRequest = async (cnic, auth) => {
    setLoading(true);
    try {
      let url;
      if (!auth) {
        url = backendUrl + 'patients/revokeAccess/requester/' + cnic;
      } else {
        url = backendUrl + 'patients/revokeAccess/auth/' + cnic;
      }
      console.log('url ', url);
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      await getDoc();
      // return response.data[0].Record;
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const authorizeRequest = async cnic => {
    setLoading(true);
    try {
      console.log('url ', backendUrl + 'patients/authAccess/' + cnic);
      const response = await axios.post(
        backendUrl + 'patients/authAccess/' + cnic,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      await getDoc();
      // return response.data[0].Record;
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getDoc = async () => {
    setLoading(true);
    const tempList = [];
    const tempList2 = [];

    try {
      console.log('sending request ..');
      const response = await axios.get(backendUrl + 'patients/view', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      const userData = response.data[0].Value;
      console.log("pending", userData.pendingRequesters);
      console.log("approved", userData.authorizedRequesters);

      for (const cnic of userData.pendingRequesters) {
        const docData = await getDocDetails(cnic);
        // console.log('docData', docData);
        tempList.push(docData);
      }

      for (const cnic of userData.authorizedRequesters) {
        const docData = await getDocDetails(cnic);
        // console.log('docData', docData);
        tempList2.push(docData);
      }

      // console.log(tempList)
      setDocList(tempList);
      setAuthDocList(tempList2);
      setLoading(false);

      // console.log("DOC", docList)
      // setLoading(false)
    } catch (error) {
      console.log(error);

      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getDoc();

  }, []);

  if (loading) {
    console.log('loading Data');
    return (
      <View>
        <Text> Loading </Text>
      </View>
    );
  } else {
    return (

      
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', width: '85%', marginTop: 10}}>
          <MaterialCommunityIcons
            name="account-search"
            size={30}
            style={{
              backgroundColor: 'white',
              padding: 10,
              marginRight: 10,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.84,
              elevation: 5,
            }}
            color="grey"
            onPress={() => authorizeRequest(cnicInput)}
          />
          <TextInput
            style={{
              width: '80%',
              backgroundColor: 'white',
              paddingHorizontal: 20,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.84,
              color: 'gray',
              elevation: 5,
            }}
            placeholderTextColor="gray"
            placeholder="Enter Cnic"
            value={cnicInput}
            onChangeText={setCnicInput}></TextInput>
        </View>
        <Text
          style={{
            width: '100%',
            marginTop: 10,
            padding: 10,
            fontSize: 19,
            fontWeight: 'bold',
          }}>
          Pending Requests:
        </Text>
        {docList.map(item => {
          return (
            <Card
              style={{
                padding: 10,
                marginBottom: 15,
                borderRadius: 10,
                width: '95%',
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
                  source={{uri: `data:image/png;base64,${item.profile}`}}
                />
                <Card.Content>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.name}
                  </Text>
                  <Text>{item.speciality}</Text>
                  <Text
                    style={{
                      marginTop: 5,
                      fontStyle: 'italic',
                      color: 'black',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/* <Text>{item.days}</Text> */}
                    {/* <Text> | </Text> */}
                    <Text>
                      {item.timeStart} - {item.timeEnd}
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
                  Rs. {item.price}
                </Text>
                
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#f05146',
                    padding: 5,
                    borderRadius: 5,
                    width: '40%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  onPress={() => rejectRequest(item.cnic, false)}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Reject
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#555DF2',
                    padding: 5,
                    borderRadius: 5,
                    width: '40%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  onPress={() => authorizeRequest(item.cnic)}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Accept
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}

        <Text
          style={{
            width: '100%',
            marginTop: 10,
            padding: 10,
            fontSize: 19,
            fontWeight: 'bold',
          }}>
          Authorized Requests:
        </Text>
        {authDocList.map(item => {
          return (
            <Card
              style={{
                padding: 10,
                marginBottom: 15,
                borderRadius: 10,
                width: '95%',
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
                  source={{uri: `data:image/png;base64,${item.profile}`}}
                />
                <Card.Content>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    {item.name}
                  </Text>
                  <Text>{item.speciality}</Text>
                  <Text
                    style={{
                      marginTop: 5,
                      fontStyle: 'italic',
                      color: 'black',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {/* <Text>{item.days}</Text>
                    <Text> | </Text> */}
                    <Text>
                      {item.timeStart} - {item.timeEnd}
                    </Text>
                    <Text></Text>
                  </Text>
                  <View style={{marginTop: 5, flexDirection: 'row',}}>
                      <MaterialCommunityIcons
                          name="phone"
                          size={15}
                          color="green"
                        />
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'green',
                          fontWeight: '400',
                          marginLeft: 5,
                        }}>
                        {item.contact}
                      </Text>
                  </View>
                </Card.Content>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'green',
                      fontWeight: '700',
                    }}>
                    Rs. {item.price}
                  </Text>
              
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f05146',
                  padding: 5,
                  borderRadius: 5,
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                onPress={() => rejectRequest(item.cnic, true)}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Revoke
                </Text>
              </TouchableOpacity>
            </Card>
          );
        })}
      </View>
    );
  }
};

{
  /* <TouchableOpacity key={element.cnic} style=
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
                
                <View style={{flexDirection:'row'}}>
                    <View style={{}}>
                      <Image style={{width: 100, height: 100, alignSelf:'center', borderRadius:100, marginTop:10}}
                        source={{ uri: `data:image/png;base64,${element.profile}`}}/>
                    </View>
                    <View style={{paddingLeft:10, paddingRight: 10}}>
                      <Text style={{fontSize:17, fontWeight:"bold", color:"red", marginVertical:5}}>Dr. {element.name}</Text>
                      <Text style={{fontSize:15, color:"blue", marginVertical:2}}>Contact: {element.contact}</Text>
                      <Text style={{fontSize:15, color:"blue", marginVertical:2}}>Cnic: {element.cnic}</Text>


                      <Text style={{fontSize:16, fontFamily:"sans-serif", color:"blue", marginRight:15}}>{element.speciality}</Text>
                      
                      <View style={{flexDirection:"row", marginTop:5, alignItems:'center'}}>
                          <MaterialCommunityIcons name="clock-time-three" size={24} color="blue" />
                          <Text style={{marginLeft:5, fontSize:16, fontFamily:"sans-serif", color:"blue"}}>{element.timeStart} - {element.timeEnd}</Text>
                      </View>
                      
                    </View>
                    <View style={{paddingHorizontal: 10}}>
                      
                      <TouchableOpacity style={{backgroundColor: 'red', padding: 10, borderRadius: 100, marginBottom: 30}} onPress={()=> rejectRequest(element.cnic, false)}>
                        <Text style={{fontSize:15, color:"white", marginVertical:2}}>Reject</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{backgroundColor: 'blue', padding: 10, borderRadius: 100}} onPress={()=> authorizeRequest(element.cnic)}>
                        <Text style={{fontSize:15, color:"white", marginVertical:2}}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
            </TouchableOpacity>
   */
}

//AUTHORIZED

// <TouchableOpacity
//               key={element.cnic}
//               style={{
//                 marginTop: 10,
//                 width: '90%',
//                 backgroundColor: 'rgba(255,255,255,1)',
//                 padding: 10,
//                 borderRadius: 30,
//                 shadowColor: '#000',
//                 shadowOffset: {
//                   width: 0,
//                   height: 2,
//                 },
//                 shadowOpacity: 0.25,
//                 shadowRadius: 4.84,

//                 elevation: 5,
//               }}
//               //  onPress={()=> navigation.navigate("Make Appointment", {doctor:element})}
//             >
//               <View style={{width: '100%', justifyContent: 'center'}}>

//                 <View style={{flexDirection: 'row'}}>
//                   <View style={{}}>
//                     <Image
//                       style={{
//                         width: 100,
//                         height: 100,
//                         alignSelf: 'center',
//                         borderRadius: 100,
//                         marginTop: 10,
//                       }}
//                       source={{uri: `data:image/png;base64,${element.profile}`}}
//                     />
//                   </View>
//                   <View style={{paddingLeft: 10, paddingRight: 10}}>
//                     <Text
//                       style={{
//                         fontSize: 17,
//                         fontWeight: 'bold',
//                         color: 'red',
//                         marginVertical: 5,
//                       }}>
//                       Dr. {element.name}
//                     </Text>
//                     <Text
//                       style={{fontSize: 15, color: 'blue', marginVertical: 2}}>
//                       Contact: {element.contact}
//                     </Text>
//                     <Text
//                       style={{fontSize: 15, color: 'blue', marginVertical: 2}}>
//                       Cnic: {element.cnic}
//                     </Text>

//                     <Text
//                       style={{
//                         fontSize: 16,
//                         fontFamily: 'sans-serif',
//                         color: 'blue',
//                         marginRight: 15,
//                       }}>
//                       {element.speciality}
//                     </Text>

//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         marginTop: 5,
//                         alignItems: 'center',
//                       }}>
//                       <MaterialCommunityIcons
//                         name="clock-time-three"
//                         size={24}
//                         color="blue"
//                       />
//                       <Text
//                         style={{
//                           marginLeft: 5,
//                           fontSize: 16,
//                           fontFamily: 'sans-serif',
//                           color: 'blue',
//                         }}>
//                         {element.timeStart} - {element.timeEnd}
//                       </Text>
//                     </View>
//                   </View>
//                   <View style={{paddingHorizontal: 10}}>
//                     <TouchableOpacity
//                       style={{
//                         backgroundColor: 'red',
//                         padding: 10,
//                         borderRadius: 100,
//                         marginBottom: 30,
//                       }}
//                       onPress={() => rejectRequest(element.cnic, true)}>
//                       <Text
//                         style={{
//                           fontSize: 15,
//                           color: 'white',
//                           marginVertical: 2,
//                         }}>
//                         Revoke
//                       </Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </TouchableOpacity>
