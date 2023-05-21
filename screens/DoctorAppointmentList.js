import React, {useState, useContext, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';

export default function DoctorAppointmentList({navigation}){
    const {user, logout} = useContext(AuthContext);
    const [appointmentList, setAppointmentList] = useState();
    const [loading, setLoading] = useState(true);

    const [appointment, setAppointment] = useState([]);
    const [inprogress, setInProgress] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [displayPending, setDisplayPending] = useState(true);
    const [displayInProgress, setDisplayInProgress] = useState(true);
    const [displayCompleted, setDisplayCompleted] = useState(true);

    const confirmAppointment = (id) =>{
        Alert.alert(
            "Pending",
            "Confirm the Appointment",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", 
                onPress: () =>{ putInProgress(id) } 

              }
            ]
          );
    }

    const putInProgress = async (id) => {
      // await firestore()
      //   .collection('appointments')
      //   .doc(id)
      //   .update({status:'in-progress'})

      appointment.map( (el) =>{
        if (el.doc_id == id){
          el.status='in-progress'
          setInProgress([...inprogress, el]);
        }
      })

      setAppointment(list => appointment.filter(element => element.id != id))    
      Alert.alert('Updated', "Document ID "+id)
    }

    const getAppointments = async () => {
      // const tempList = []
      // await firestore()
      // .collection('appointments')
      // .where('p_id', '==', user.uid)
      // .get()
      // .then((querySnapshot) => {
      //   querySnapshot.forEach(doc => {      
      //     const {doc_id, p_id, status, date, time, fee} = doc.data()  
  
      //       tempList.push({
      //         id: doc.id,
      //         doc_id,
      //         status,
      //         date,
      //         time,
      //         fee,
      //       })
  
      //     }
  
      //     )}
      //   ).then(()=>{
  
      //     const tempList2 = []
      //     tempList.map( ap => {
      //       firestore()
      //       .collection('doctors')
      //       .doc(ap.doc_id)
      //       .get()
      //       .then((documentSnapshot) => {
      //         if( documentSnapshot.exists ) {
      //           const docDetails = documentSnapshot.data()
      //           tempList2.push({...ap, doc:docDetails})
      //         }} )
      //       }
            
      //       )
      //       setAppointmentList(tempList2)
  
      //   })
        
    }

    
    const getPendingAppointments = () =>{
      setAppointment(appointmentList.filter(el => el.status==='pending'))
    }
    const getInProgressAppointments = () =>{
      setInProgress(appointmentList.filter(el => el.status==='in-progress'))
    }
    const getCompletedAppointments = () => {
      setCompleted(appointmentList.filter(el => el.status==='completed'))
    }

    
  
    useEffect(() => {
      setLoading(true)
      getAppointments().then(()=>{
        
        getPendingAppointments()
        getInProgressAppointments()
        getCompletedAppointments()
        setLoading(false)
      });
      
      
    }, []);
  
  
    if(loading){
      console.log("Some data")
      return(
        <View>
          <Text> Loading </Text>
        </View>
      )
    }else{
        console.log(appointmentList)
        
  
    return(
      <View style={{flex:1, paddingHorizontal:'2%', backgroundColor:'white'}}>
      
        <TouchableOpacity style={{backgroundColor:"rgba(0,0,0,0.8)", padding:13, borderWidth:1, borderColor:"lightgrey", borderRadius:15}} 
          onPress={()=> (displayPending) ? setDisplayPending(false) : setDisplayPending(true)}>
            <Text style={{marginLeft: 7, color:"white", fontSize:17, fontWeight:"bold"}}>Pending</Text>
        </TouchableOpacity>

        {displayPending && appointment.length>0 ? 
        <ScrollView style={{maxHeight:'30%', width:"100%", padding:2}}>
          
        {appointment.map( (element, index) =>{
  
          return(
            <TouchableOpacity key={element.id} style={{width:"100%", marginVertical:10}} onPress={()=>confirmAppointment(element.id)}>
              <View style={{width:"100%", alignItems:"center"}}>
                <View style={{flexDirection:"row", width:"85%", borderRadius:20, backgroundColor:"plum", justifyContent:'space-evenly', padding:10}}>
                    <Text style={{fontSize:17, fontWeight:"bold", color:"white", padding:10, textAlign:"center"}}>{element.doc.name}</Text>
                    
                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                        <MaterialCommunityIcons name="calendar" size={24} color="white" />
                        <Text style={{fontSize:16, fontFamily:"sans-serif", color:"white"}}>{(new Date(element.date.seconds*1000)).toLocaleDateString()}</Text>
                    </View>

                    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                        <MaterialCommunityIcons name="clock-time-three" size={24} color="white" />
                        <Text style={{fontSize:16, fontFamily:"sans-serif", color:"white"}}>{element.time}</Text>
                    </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        </ScrollView> : <View style={{width:0, height:0}}></View>}
        
        

        <TouchableOpacity style={{backgroundColor:"rgba(0,0,0,0.8)", padding:13, borderWidth:1, borderColor:"lightgrey", borderRadius:15}} 
          onPress={()=> (displayInProgress) ? setDisplayInProgress(false) : setDisplayInProgress(true)}>
            <Text style={{marginLeft: 7, color:"white", fontSize:17, fontWeight:"bold"}}>In Progress</Text>
        </TouchableOpacity>

        {displayInProgress && inprogress.length>0? 
        <ScrollView style={{maxHeight:'30%', width:"100%", padding:2}}>
          {inprogress.map( (element) =>{
    
            return(
              <TouchableOpacity key={element.id} style={{width:"100%", marginVertical:10}} onPress={()=> navigation.navigate("Handle Appointment", {appointment:element})}>
                  <View style={{width:"100%", alignItems:"center"}}>
                    <View style={{flexDirection:"row", width:"85%", borderRadius:20, backgroundColor:"plum", justifyContent:'space-evenly', padding:10}}>
                        <Text style={{fontSize:17, fontWeight:"bold", color:"white", padding:10, textAlign:"center"}}>{element.doc.name}</Text>
                        
                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                            <MaterialCommunityIcons name="calendar" size={24} color="white" />
                            <Text style={{fontSize:16, fontFamily:"sans-serif", color:"white"}}>{(new Date(element.date.seconds*1000)).toLocaleDateString()}</Text>
                        </View>

                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                            <MaterialCommunityIcons name="clock-time-three" size={24} color="white" />
                            <Text style={{fontSize:16, fontFamily:"sans-serif", color:"white"}}>{element.time}</Text>
                        </View>
                    </View>
                  </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView> : <View style={{width:0, height:0}}></View>}

        <TouchableOpacity style={{backgroundColor:"rgba(0,0,0,0.8)", padding:13, borderWidth:1, borderColor:"lightgrey", borderRadius:15}} 
          onPress={()=> (displayCompleted) ? setDisplayCompleted(false) : setDisplayCompleted(true)}>
            <Text style={{marginLeft: 7, color:"white", fontSize:17, fontWeight:"bold"}}>Completed</Text>
        </TouchableOpacity>
        
        {displayCompleted ? 
        <ScrollView style={{maxHeight:'30%', width:"100%", padding:2}}>
          
          {completed.map( (element) =>{
    
            return(
              <TouchableOpacity key={element.id} style={{width:"100%", marginVertical:10}} onPress={()=> navigation.navigate("Handle Appointment", {appointment:element})}>
                  <View style={{width:"100%", alignItems:"center"}}>
                    <View style={{flexDirection:"row", width:"85%", borderRadius:20, backgroundColor:"plum", justifyContent:'space-evenly', padding:10}}>
                        <Text style={{fontSize:17, fontWeight:"bold", color:"white", padding:10, textAlign:"center"}}>{element.doc.name}</Text>
                        
                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                            <MaterialCommunityIcons name="calendar" size={24} color="white" />
                            <Text style={{fontSize:16, fontFamily:"sans-serif", color:"white"}}>{(new Date(element.date.seconds*1000)).toLocaleDateString()}</Text>
                        </View>

                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                            <MaterialCommunityIcons name="clock-time-three" size={24} color="white" />
                            <Text style={{fontSize:16, fontFamily:"sans-serif", color:"white"}}>{element.time}</Text>
                        </View>
                    </View>
                  </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView> : <View style={{width:0, height:0}}></View>}

        
      </View>
    );
    }
  }