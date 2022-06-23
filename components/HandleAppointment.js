import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Image} from 'react-native';
import {RadioButton, Avatar, Card, Title, Paragraph, Button} from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Prescription from './prescription';
import StarRating from 'react-native-star-rating';

function MakeAppointment({route, navigation}) {
  
  const appointment = route.params?.appointment
  const [starCount, setStarCount] = useState(appointment.star);

  const onStarPress= (rating)=>{
    setStarCount(rating)
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:"Appointment",
      headerRight: () => (appointment.status !== 'completed' ?
        <TouchableOpacity style={{alignItems:"center", padding:10, paddingHorizontal:25, borderRadius:10, marginHorizontal:15, backgroundColor:"green"}} onPress={()=>{Alert.alert("Data Submitted", "YEAAAH!")}}>
                <Text style={{color:"white", fontSize:15}}>Submit</Text>
        </TouchableOpacity>
        :<></>
      ),
    });
  }, [navigation]);

  
// const [details, setDetails] = useState({"name":"Muhammad Ahmed", "date":"28-06-2022", "time":"13:00", "fees":"2500", 'status':'in-progress'})
// const [details, setDetails] = useState({"name":"Muhammad Ahmed", "date":"28-06-2022", "time":"13:00", "fees":"2500", 'status':'in-progress'})
    


  return (
    <View style={{flex: 1}}>
    <ScrollView style={{flex: 1,}}>

    <View style={{flex: 1, justifyContent:'center', alignItems:'center', paddingBottom:5, marginBottom:5}}>
      <Card style={{width:"80%", marginTop:20, alignItems:"center", marginBottom:10}}>
        <Image style={{width: 100, height: 100, alignSelf:'center', borderRadius:100, marginTop:10}}
              source={{ uri: "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"}}/>
        <Card.Content style={{alignItems:"center"}}>
          <Title style={{fontSize:20, fontWeight:"bold"}}>{appointment.name}</Title>
          <View style={{flexDirection:"row", justifyContent:"space-evenly", width:"100%", marginTop:5}}>
            <View>
                <Paragraph style={{fontWeight:"bold"}}>Appointment Date</Paragraph>
                <Paragraph>{appointment.date}</Paragraph>
            </View>
            <Paragraph style={{fontSize:25, marginTop:16}}>|</Paragraph>
            <View>
                <Paragraph style={{fontWeight:"bold"}}>Time</Paragraph>
                <Paragraph>{appointment.time}</Paragraph>
            </View>
            <Paragraph style={{fontSize:25, marginTop:16}}>|</Paragraph>
            <View>
                <Paragraph style={{fontWeight:"bold"}}>Fee</Paragraph>
                <Paragraph>{appointment.fees}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Prescription status={appointment.status} medicalRecord={appointment.medicalRecord}/>
      
      <View>
        <Card style={{width:"80%", marginTop:20, alignItems:"center", marginBottom:10}}>
          <Card.Content style={{alignItems:"center"}}>
            <View style={{flexDirection:"row", justifyContent:"center", width:"100%", marginTop:5}}>
              <View>
                  <Paragraph style={{fontWeight:"bold"}}>Rating</Paragraph>
                  <Paragraph></Paragraph>
                  <StarRating
                              disabled={false}
                              maxStars={5}
                              rating={starCount}
                              starSize={20}
                              starStyle={{color:'blue'}}
                              selectedStar={(rating) => onStarPress(rating)}

                            />
              </View>
            </View>
          </Card.Content>
        </Card>

      </View>

      
      
    </View>
    </ScrollView>
    </View>
  );
}

export default MakeAppointment;