import React, {useState, useContext} from 'react';
import { Text, View, Alert, TouchableOpacity, TextInput, Image} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
// import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProvider';

function MakeAppointment({route, navigation}) {
  const {user} = useContext(AuthContext);
  const doc = route.params.doctor
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const timingArray = doc.timing.map(el =>{
    return {label: el, value:el}
  })
  const [items, setItems] = useState(timingArray);
  const [disabled, setDisabled] = useState(false)
  const [selectedDate, setSelectedDate] = useState()

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date)
    hideDatePicker();
  };

  const confirmAppointment = async () =>{
    setDisabled(true)
    // console.log(doc.id,user.uid,selectedDate.toLocaleDateString(),value, doc.fee)
    // await firestore().collection('appointments').add({
    //     doc_id: doc.id,
    //     p_id: user.uid,
    //     date: selectedDate,
    //     time: value,
    //     fee: doc.fee,
    //     status: 'pending',
    //     medicalRecord:null,
    //     createdAt: firestore.Timestamp.fromDate(new Date()),
    // }).catch(error => {
    //   setDisabled(false)
    //   return console.log('Something went wrong with adding appointment to firestore: ', error);
    // })
    // Alert.alert("Success", "Appointment Booked Successfully")
    // setDisabled(false)
    // navigation.popToTop()
    
  }

  return (
    <View style={{flex: 1, alignItems: 'center'}}>

      <Card style={{width:"80%", marginTop:20, alignItems:"center"}}>
        <Image style={{width: 100, height: 100, alignSelf:'center', borderRadius:100, marginTop:10}}
              source={{ uri: doc.imgUrl}}/>
        <Card.Content style={{alignItems:"center"}}>
          <Title style={{fontSize:20, fontWeight:"bold"}}>{doc.name}</Title>
          <View style={{flexDirection:"row", justifyContent:"space-evenly", width:"100%", marginTop:5}}>
            <View>
            <Paragraph style={{fontWeight:"bold"}}>Speciality</Paragraph>
            <Paragraph>{doc.degree} | {doc.specialty}</Paragraph>
            </View>
            <Paragraph style={{fontSize:25, marginTop:16}}>|</Paragraph>
            <View>
            <Paragraph style={{fontWeight:"bold"}}>Time</Paragraph>
            <Paragraph>{doc.timing[0]} - {doc.timing[doc.timing.length-1]}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
      
      <View style={{width:"90%", backgroundColor:"white", padding:25, marginTop:15, borderRadius:5}}>
        <Text style={{marginTop:5, color:'gray'}}>Select Date:</Text>
        <View style={{width:"100%", backgroundColor:"white", alignItems:"center", marginTop:10}}>
        <TouchableOpacity style={{alignItems:"center", width:"80%", borderWidth:1, padding:10, borderRadius:10, borderColor:"green"}} onPress={showDatePicker}>
          <Text style={{fontSize:15}}>{selectedDate?selectedDate.toLocaleDateString():'Select Date'}</Text>
        </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Text style={{marginTop:20}}>Select Time:</Text>
        <View style={{alignItems:"center"}}>
          <View style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, marginTop:10, borderRadius:10}}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}

              textStyle={{fontSize:15}}
              style={{width:"100%", borderColor:"green", color:"green"}}
              mode="BADGE"
              badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            />
          </View>
        </View>

        <Text style={{marginTop:20}}>Checkup Fees:</Text>
        <View style={{width:"100%", backgroundColor:"white", alignItems:"center", marginTop:10}}>
          <TextInput style={{alignItems:"center", width:"90%", borderWidth:1, padding:10, borderRadius:10, borderColor:"green"}} value={"Rs. "+doc.fee} editable={false}/>
        </View>

        

        <View style={{alignItems:"center"}}>
          <Button disabled={disabled} mode='contained' style={{marginTop:20, width:"80%", fontSize:5, padding:5, borderRadius:50, backgroundColor:"red"}} onPress={()=>confirmAppointment()}>Confirm Appointment</Button> 
        </View>



      </View>
    </View>
  );
}

export default MakeAppointment;