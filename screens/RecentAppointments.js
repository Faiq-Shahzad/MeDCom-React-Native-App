import React, {useState, useContext, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';


export default RecentAppointments = ({navigation}) => {

  const {user, logout} = useContext(AuthContext);
  const [appointmentList, setAppointmentList] = useState();
  const [loading, setLoading] = useState(true);

  const [appointment, setAppointment] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [displayPending, setDisplayPending] = useState(true);
  const [displayCompleted, setDisplayCompleted] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);
    
  const getAppointments = async () => {
    try{

      const tempList = []
      await firestore()
      .collection('appointments')
      .where('p_id', '==', user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {      
          const {doc_id, p_id, status, date, time, fee, medicalRecord} = doc.data()  

            tempList.push({
              id: doc.id,
              doc_id,
              status,
              date,
              time,
              fee,
              medicalRecord
            })

          })
        }
          
        )
        console.log("tempList"+tempList)
        setAppointment(tempList.filter(el => el.status==='pending'))
        setCompleted(tempList.filter(el => el.status==='completed'))
        setAppointmentList(tempList)

    } catch(e){
      console.log(e);
    }
    
      // .then(()=>{

        
      //   tempList.map( ap => {
      //     firestore()
      //     .collection('doctors')
      //     .doc(ap.doc_id)
      //     .get()
      //     .then((documentSnapshot) => {
      //       if( documentSnapshot.exists ) {
      //         const docDetails = documentSnapshot.data()
      //         tempList2.push({...ap, doc:docDetails})
      //       }} )
      //     }
          
      //     )
      // })
      
      
      console.log(appointmentList)
  }

  const deletePending = async (id) =>{
      await firestore()
      .collection('appointments')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert('Delete','Successfully Deleted Appointment')
        setUpdateScreen(!updateScreen)
      });
  }


  const pendingAppointment = (id) =>{
      Alert.alert(
          "Pending",
          "The Request is being processed",
          [
            
            { text: "Delete", 
              onPress: ()=>deletePending(id)

            },
            { text: "OK", 
              onPress: () =>console.log("OK Pressed") 

            }
          ]
        );
  }
  

  const inProgress = (key, index) => {

    appointment.map( (el) =>{
      if (el.key == key){
        setCompleted([...completed, el]);
      }
    })

    setAppointment(list => appointment.filter(element => element.key != key))

    console.log(appointment)
    if (appointment.length == 0){
      console.log(appointment.length)
      setDisplayPending(false);
    }
  
  }

  // const getPendingAppointments = () =>{
  //   setAppointment(appointmentList.filter(el => el.status==='pending'))
  // }
  // const getCompletedAppointments = () => {
  //   setCompleted(appointmentList.filter(el => el.status==='completed'))
  // }

  useEffect(() => {
    setLoading(true)
    getAppointments()
    .then( () =>{
      if(loading){
        console.log(appointmentList)
      setLoading(false)
      }
      
    }
    

    )
    // if (loading){
    //   setAppointment(appointmentList.filter(el => el.status==='pending'))
    //   setCompleted(appointmentList.filter(el => el.status==='completed')) 
    //   setLoading(false)
    // }
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
      // setLoading(true)
      getAppointments()
      .then( () =>{
        if(loading){
          console.log(appointmentList)
          // setLoading(false)
        }
        
      })
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    getAppointments()
      .then( () =>{
        if(loading){
          console.log(appointmentList)
          setLoading(false)
        }})
    setLoading(false)
  },[updateScreen])


  if(loading){
    console.log("Some data")
    return(
      <View>
        <Text> Loading </Text>
      </View>
    )
  }else{

  return(
    <View style={{flex:1}}>
    
      <TouchableOpacity style={{backgroundColor:"black", padding:13, borderWidth:1, borderColor:"lightgrey"}} 
        onPress={()=> (displayPending) ? setDisplayPending(false) : setDisplayPending(true)}>
          <Text style={{marginLeft: 7, color:"white", fontSize:17, fontWeight:"bold"}}>Pending</Text>
      </TouchableOpacity>

      { (displayPending || appointment.length != 0) ? 
      <ScrollView style={{width:"100%", maxHeight:'30%', paddingBottom:10, padding:2}}>
        
      {appointment.map( (element, index) =>{

        return(
          <TouchableOpacity key={index} style={{width:"100%",marginVertical:15}} onPress={()=>pendingAppointment(element.id)}>
              <View style={{width:"100%", alignItems:"center"}}>
                <View style={{flexDirection:"row", width:"85%", borderRadius:20, backgroundColor:"plum", justifyContent:'space-evenly', padding:10}}>
                    {/* <Text style={{fontSize:17, fontWeight:"bold", color:"white", padding:10, textAlign:"center"}}>{element.doc.name}</Text> */}
                    
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

      <TouchableOpacity style={{backgroundColor:"black", padding:13, borderWidth:1, borderColor:"lightgrey"}}
        onPress={()=> (displayCompleted) ? setDisplayCompleted(false) : setDisplayCompleted(true)}>
          <Text style={{marginLeft: 7, color:"white", fontSize:17, fontWeight:"bold"}}>History</Text>
      </TouchableOpacity>
      
      {(displayCompleted || completed.length != 0) ? 
      <ScrollView style={{maxHeight:'30%', width:"100%", padding:2}}>
        
        {completed.map( (element) =>{
  
          return(
            <TouchableOpacity style={{width:"100%", marginVertical:15}} onPress={()=> navigation.navigate("Handle Appointment", {appointment:element})}>
                <View style={{width:"100%", alignItems:"center"}}>
                <View style={{flexDirection:"row", width:"85%", borderRadius:20, backgroundColor:"plum", justifyContent:'space-evenly', padding:10}}>
                    {/* <Text style={{fontSize:17, fontWeight:"bold", color:"white", padding:10, textAlign:"center"}}>{element.doc.name}</Text> */}
                    
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
