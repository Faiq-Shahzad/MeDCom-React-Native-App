import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DoctorAppointmentList({navigation}){
    const [appointment, setAppointment] = useState([{"name":"Faiq Shahzad", "date":"28-06-2022", "time":"1300", "fees":"3000", 'status':'pending', 'medicalRecord':''}]);
    const [inprogress, setInProgress] = useState([{"name":"Muhammad Ahmed", "date":"21-06-2022", "time":"1600", "fees":"2500", 'status':'in-progress', 'medicalRecord':''}]);
    const [completed, setCompleted] = useState([{"name":"Muhammad Afzal Khan", "date":"15-06-2022", "time":"1100", "fees":"1500", 'status':'completed', 'medicalRecord':''}]);
    const [displayPending, setDisplayPending] = useState(true);
    const [displayInProgress, setDisplayInProgress] = useState(true);
    const [displayCompleted, setDisplayCompleted] = useState(true);

    const confirmAppointment = (key) =>{
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
                onPress: () =>{ putInProgress(key) } 

              }
            ]
          );
    }

    const putInProgress = (key, index) => {

      appointment.map( (el) =>{
        if (el.key == key){
          el.status='in-progress'
          setInProgress([...inprogress, el]);
        }
      })

      setAppointment(list => appointment.filter(element => element.key != key))

      
    
    }

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
        
        

        <TouchableOpacity style={{backgroundColor:"rgba(0,0,0,0.8)", padding:13, borderWidth:1, borderColor:"lightgrey", borderRadius:15}} 
          onPress={()=> (displayInProgress) ? setDisplayInProgress(false) : setDisplayInProgress(true)}>
            <Text style={{marginLeft: 7, color:"white", fontSize:17, fontWeight:"bold"}}>In Progress</Text>
        </TouchableOpacity>

        {displayInProgress && inprogress.length>0? 
        <ScrollView style={{maxHeight:'30%', width:"100%", padding:2}}>
          {inprogress.map( (element) =>{
    
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

        <TouchableOpacity style={{backgroundColor:"rgba(0,0,0,0.8)", padding:13, borderWidth:1, borderColor:"lightgrey", borderRadius:15}} 
          onPress={()=> (displayCompleted) ? setDisplayCompleted(false) : setDisplayCompleted(true)}>
            <Text style={{marginLeft: 7, color:"white", fontSize:17, fontWeight:"bold"}}>Completed</Text>
        </TouchableOpacity>
        
        {displayCompleted ? 
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