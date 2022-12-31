import React, {useState, useEffect, useContext} from 'react';
import { Text, View, Image,FlatList, Alert, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';
import axios from 'axios';

export default SearchDoctors = ({navigation}) => {
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

    const [docList, setDocList] = useState([]);
    const [authDocList, setAuthDocList] = useState([]);


    const getDocDetails = async (cnic) => {
      try {
        console.log('url ', backendUrl+'doctors/search/cnic/'+cnic)
        const response = await axios.post(backendUrl+'doctors/search/cnic/'+cnic);
        // console.log(response.data[0])
        return response.data[0].Record;
      } catch (error) {
        console.log(error)
      }
    }

    const rejectRequest = async (cnic, auth) => {
      setLoading(true);
      try {
        let url;
        if(!auth){
          url = backendUrl+'patients/revokeAccess/requester/'+cnic
        }else{
          url = backendUrl+'patients/revokeAccess/auth/'+cnic
        }
        console.log('url ', url)
        const response = await axios.post(url, {}, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        await getDoc();
        // return response.data[0].Record;
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }

    const authorizeRequest = async (cnic) => {
      setLoading(true);
      try {
        console.log('url ', backendUrl+'patients/authAccess/'+cnic)
        const response = await axios.post(backendUrl+'patients/authAccess/'+cnic, {}, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        console.log(response)
        await getDoc();
        // return response.data[0].Record;
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }

    const getDoc = async () => {
      setLoading(true);
      const tempList = []
      const tempList2 = []

      try {
        console.log('sending request ..')
        const response = await axios.get(backendUrl+'patients/view', {
          headers: {
            authorization: `Bearer ${token}`
          }
          });
        // console.log(response.data);
        const userData = response.data[0].Value;
        console.log(userData.pendingRequesters);
        console.log(userData.authorizedRequesters);

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
        setDocList(tempList)
        setAuthDocList(tempList2)
        setLoading(false);

        // console.log("DOC", docList)
        // setLoading(false)
      } catch (error) {
        console.log(error);

        console.log(error.response.data);
      }
        
      
    }


    useEffect(() => {
      getDoc();
      
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
        <View style={{flexDirection:"row", width:"85%", marginTop:30}}>
            <MaterialCommunityIcons name="account-search" size={30} 
            style={{
              backgroundColor:'white',
              padding:10,
              marginRight:10,
              borderRadius:30,
              shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.84,
              elevation: 5,}} color="grey" onPress={()=>authorizeRequest(cnicInput)}/>
            <TextInput
            style={{
              width:'80%',
              backgroundColor:'white',
              paddingHorizontal:20,
              borderRadius:30,
              shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.84,
              color:'gray',
              elevation: 5,}}
            placeholderTextColor="gray"
            placeholder="Enter Cnic"
            value={cnicInput}
            onChangeText={setCnicInput}>
            </TextInput>
        </View>
        <Text> Pending Requests</Text>
        {docList.map( (element) =>{
            return(
            <TouchableOpacity key={element.cnic} style=
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
  
          );
        })}

        <Text> Auhtorized Requests</Text>
        {authDocList.map( (element) =>{
            return(
            <TouchableOpacity key={element.cnic} style=
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
                      
                      <TouchableOpacity style={{backgroundColor: 'red', padding: 10, borderRadius: 100, marginBottom: 30}} onPress={()=> rejectRequest(element.cnic, true)}>
                        <Text style={{fontSize:15, color:"white", marginVertical:2}}>Revoke</Text>
                      </TouchableOpacity>

                    </View>
                  </View>
                </View>
            </TouchableOpacity>
  
          );
        })}
      </View>
    );
    }
  }