import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView} from 'react-native';
import {Button, RadioButton, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default RecentAppointments = ({navigation}) => {
  const [appointment, setAppointment] = useState([{"name":"Dr. Faiq Shahzad", "date":"28-06-2022", "time":"13:00", "fees":"2500", 'status':'pending'}]);
  const [completed, setCompleted] = useState([{"name":"Muhammad Ahmed", "date":"28-06-2022", "time":"13:00", "fees":"2500", 'status':'completed', 'star':0}]);
  const [displayPending, setDisplayPending] = useState(true);
  const [displayCompleted, setDisplayCompleted] = useState(true);

  const confirmAppointment = (key) =>{
      Alert.alert(
          "Pending",
          "The Request is being processed",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
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

  return(
    <View style={{flex:1}}>
    
      <TouchableOpacity style={{backgroundColor:"black", padding:13, borderWidth:1, borderColor:"lightgrey"}} 
        onPress={()=> (displayPending) ? setDisplayPending(false) : setDisplayPending(true)}>
          <Text style={{marginLeft: 7, color:"white", fontSize:17, fontWeight:"bold"}}>Pending</Text>
      </TouchableOpacity>

      { (displayPending || appointment.length != 0) ? 
      <ScrollView style={{width:"100%", maxHeight:'30%', padding:2}}>
        
      {appointment.map( (element, index) =>{

        return(
          <TouchableOpacity style={{width:"100%"}} onPress={()=>confirmAppointment(element.key, index)}>
              <View style={{marginTop:20, width:"100%", alignItems:"center"}}>
                <View style={{flexDirection:"row", width:"85%", borderRadius:20, backgroundColor:"plum", justifyContent:'space-evenly', padding:10}}>
                    <Text style={{fontSize:17, fontWeight:"bold", color:"white", padding:10, textAlign:"center"}}>{element.name}</Text>
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
            <TouchableOpacity style={{width:"100%"}} onPress={()=> navigation.navigate("Handle Appointment", {appointment:element})}>
                <View style={{marginTop:20, width:"100%", alignItems:"center"}}>
                  <View style={{flexDirection:"row", width:"85%", borderRadius:20, backgroundColor:"plum", justifyContent:'space-evenly', padding:10}}>
                      <Text style={{fontSize:17, fontWeight:"bold", color:"white", padding:10, textAlign:"center"}}>{element.name}</Text>
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
