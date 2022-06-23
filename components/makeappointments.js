import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Alert, TouchableOpacity, ScrollView, TextInput, Image} from 'react-native';
import {RadioButton, Avatar, Card, Title, Paragraph, Button} from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';

function MakeAppointment({route, navigation}) {

  const status = route.params?.status
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(['italy', 'spain', 'barcelona', 'finland']);
  const [items, setItems] = useState([
    {label: '1300', value: '1300'},
    {label: '1330', value: '1330'},
    {label: '1400', value: '1400'},
    {label: '1430', value: '1430'},
    
  ]);
  const [selectedDate, setSelectedDate] = useState()
  const [details, setDetails] = useState({"name":"Faiq Shahzad", "speciality":"MBBS | Surgeon", "opentime":"1300", "closetime":"1500", "fees":"Rs. 2500"})

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

  return (
    <View style={{flex: 1, alignItems: 'center'}}>

      <Card style={{width:"80%", marginTop:20, alignItems:"center"}}>
        <Image style={{width: 100, height: 100, alignSelf:'center', borderRadius:100, marginTop:10}}
              source={{ uri: "https://firebasestorage.googleapis.com/v0/b/medcom-e961c.appspot.com/o/avatar.png?alt=media&token=f6a81a27-c82c-4f22-9ba4-ca8ead95cb5a"}}/>
        <Card.Content style={{alignItems:"center"}}>
          <Title style={{fontSize:20, fontWeight:"bold"}}>{details.name}</Title>
          <View style={{flexDirection:"row", justifyContent:"space-evenly", width:"100%", marginTop:5}}>
            <View>
            <Paragraph style={{fontWeight:"bold"}}>Speciality</Paragraph>
            <Paragraph>{details.speciality}</Paragraph>
            </View>
            <Paragraph style={{fontSize:25, marginTop:16}}>|</Paragraph>
            <View>
            <Paragraph style={{fontWeight:"bold"}}>Time</Paragraph>
            <Paragraph>{details.opentime} - {details.closetime}</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
      
      <View style={{width:"90%", backgroundColor:"white", padding:10, marginTop:15, borderRadius:5}}>
        <Text style={{marginTop:5, color:'gray'}}>Select Date:</Text>
        <View style={{width:"100%", backgroundColor:"white", alignItems:"center", marginTop:10}}>
        <TouchableOpacity style={{alignItems:"center", width:"90%", borderWidth:1, padding:10, borderRadius:10, borderColor:"green"}} onPress={showDatePicker}>
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
              multiple={true}
              mode="BADGE"
              badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            />
          </View>
        </View>

        <Text style={{marginTop:20}}>Checkup Fees:</Text>
        <View style={{width:"100%", backgroundColor:"white", alignItems:"center", marginTop:10}}>
          <TextInput style={{alignItems:"center", width:"90%", borderWidth:1, padding:10, borderRadius:10, borderColor:"green"}} value={details.fees}/>
        </View>

        

        <View style={{alignItems:"center"}}>
          <Button mode='contained' style={{marginTop:20, width:"80%", fontSize:5, padding:5, borderRadius:50, backgroundColor:"red"}}>{console.log(status)} {status==="in-progress"?'Start Diagonosis':'Confirm Appointment'}</Button> 
        </View>



      </View>
    </View>
  );
}

export default MakeAppointment;