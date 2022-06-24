import React, { useState } from 'react';
import { Text,TextInput, ScrollView, TouchableOpacity, View, Alert, Button, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Prescription(props) {

    const status = props.status

    const [diagnosis, setDiagnosis] = useState();
    
    const [medicineName, setMedicineName] = useState("");
    const [amountDay, setAmountDay] = useState("");
    const [totalDays, setTotalDays] = useState("");
    const [prescription, setPrescription] = useState([{key:1, medicine:"Panadol", amountDay:2, totalDays:7}]);
    
    const [recommendation, setRecommendation] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState()

    const setAmountDayText = (text) => {
        setAmountDay(text.replace(/[^0-9]/g, ''))
    }
    const setTotalDaysText = (text) => {
        setTotalDays(text.replace(/[^0-9]/g, ''))
    }

    const addPrescription = () => {
        if(medicineName === "" || amountDay === "" || totalDays === ""){
            Alert.alert("Missing Fields", "Please fill all the fields")
            return
        }
        setPrescription([{key:Math.random(), medicine:medicineName.trim(), amountDay:amountDay, totalDays:totalDays}, ...prescription]);
    };
    const deletePrescription = (key) => {
        const newList = prescription.filter( el => el.key!=key)
        setPrescription(newList)
    };


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
    <View style={{flex:1, paddingHorizontal:25}}>
        <View style={{marginTop:5, marginHorizontal:25, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(255,255,255,1)', padding:2, borderRadius:2, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        
        elevation: 5,}}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <MaterialCommunityIcons style={{width:'10%'}} name="account-injury" size={30} color={'red'} />
                {status==="in-progress"?
                <TextInput  placeholderTextColor={'gray'} style={{width:'70%', color:'black', borderColor:'gray', borderBottomWidth:1, marginBottom:10, marginHorizontal:15}} placeholder="Diagnosis" onChangeText={setDiagnosis}></TextInput>
                :
                <Text style={{width:'70%', color:'black', borderColor:'gray', paddingVertical:10, marginHorizontal:15}} >Diagnosis: Some Fever</Text>
                }
            </View>
        </View>
        {status==="in-progress"?
      <View style={{marginTop:10, backgroundColor:'rgba(255,255,255,1)', padding:10, borderRadius:30, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        
        elevation: 5,}}>
            <View style={{flexDirection:'row', marginBottom:10}}>
                <MaterialCommunityIcons style={{marginHorizontal:10}} name="medical-bag" size={30} color={'red'} />

                <Text style={{color:'black', fontSize:25, fontWeight:'bold'}}>Prescription</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <TextInput placeholderTextColor={'gray'} style={{ width:'100%', backgroundColor:"rgba(0,0,0,0.2)", color:'black', paddingHorizontal:25, marginVertical:5, borderRadius:25}} placeholder="Medicine Name" value={medicineName}  onChangeText={setMedicineName}></TextInput>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%',}}>
                    <TextInput keyboardType='phone-pad' placeholderTextColor={'gray'} style={{width:'35%',backgroundColor:"rgba(0,0,0,0.2)", color:'black', paddingHorizontal:15,  marginVertical:5, borderRadius:25}} placeholder="Qty" value={amountDay} onChangeText={(text)=>setAmountDayText(text)}></TextInput>
                    <TextInput keyboardType='phone-pad' placeholderTextColor={'gray'}style={{width:'35%',backgroundColor:"rgba(0,0,0,0.2)", color:'black', paddingHorizontal:15, marginVertical:5, borderRadius:25}} placeholder="Days" value={totalDays} onChangeText={(text)=>setTotalDaysText(text)}></TextInput>
                    <TouchableOpacity
                        style={{ width:'20%',backgroundColor: 'grey', padding: 10, justifyContent:"center", alignItems:"center", borderRadius:10}}
                        onPress={addPrescription}>
                        <Text style={{ fontSize: 15, color: 'white' }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
    
      </View>
      : <></>}
        
    {status==="in-progress"?
    <View style={{marginTop:10, backgroundColor:'rgba(255,255,255,1)', padding:10, borderRadius:30, shadowColor: "#000",
                shadowOffset: {width: 0,height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 4.84,
                elevation: 5,}}>

        <View style={{justifyContent:'center', alignItems:'center'}}>
            <TextInput placeholderTextColor={'gray'} style={{ width:'100%', backgroundColor:"rgba(0,0,0,0.2)", color:'black', paddingHorizontal:25, marginVertical:5, borderRadius:25}} placeholder="Recommendation" onChangeText={setRecommendation}></TextInput>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%',}}>
                <View style={{flexDirection:'row', width:"100%", justifyContent:'space-around', alignItems:"center", marginTop:10}}>
                    <Text style={{color:'black', fontSize:25, fontWeight:'bold'}}>Follow up</Text>
                    <TouchableOpacity style={{alignItems:"center", padding:10, paddingHorizontal:25, borderRadius:10, backgroundColor:"green"}} onPress={showDatePicker}>
                    <Text style={{color:"white", fontSize:15}}>{selectedDate?selectedDate.toLocaleDateString():'Select Date'}</Text>
                    </TouchableOpacity>
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    />
            </View>
        </View>
        
    </View>
    :
    <View style={{marginTop:10, backgroundColor:'rgba(255,255,255,1)', padding:10, borderRadius:30, shadowColor: "#000",
                shadowOffset: {width: 0,height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 4.84,
                elevation: 5,}}>

        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={{ width:'100%', color:'black', paddingHorizontal:15, fontSize:20, marginVertical:5, borderRadius:25}} >Recommendation:   </Text>
            <Text style={{ width:'100%', backgroundColor:"rgba(0,0,0,0.2)", color:'black', paddingVertical:15, paddingHorizontal:25, marginVertical:5, borderRadius:25}} >Some recommendation</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%',}}>
                <View style={{flexDirection:'row', width:"100%", justifyContent:'space-around', alignItems:"center", marginTop:10}}>
                    <Text style={{color:'black', fontSize:25, fontWeight:'bold'}}>Follow up</Text>
                    <View style={{alignItems:"center", padding:10, paddingHorizontal:25, borderRadius:10, backgroundColor:"green"}} onPress={showDatePicker}>
                    <Text style={{color:"white", fontSize:15}}>Some 25/10/2023</Text>
                    </View>
                </View>
                
            </View>
        </View>
        
    </View>
    }

    {prescription.length > 0 && 
        <View style={{marginVertical:7, backgroundColor:'rgba(255,255,255,1)', padding:10, borderRadius:2, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        
        elevation: 5,}}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%',}}>
                    <Text style={{ width:'25%',color:'black', padding:2, marginLeft:15, marginVertical:5, borderRadius:25}} >Medicine</Text>
                    <Text style={{width:'15%', color:'black', textAlign:'center', padding:2,  marginVertical:5, borderRadius:25}}>Qty/Day</Text>
                    <Text style={{width:'15%', color:'black', textAlign:'center', padding:2, marginVertical:5, borderRadius:25}}>Total</Text>
                    <Text
                        style={{ width:'20%',color:'black', textAlign:'center', padding: 10, justifyContent:"center", alignItems:"center", borderRadius:10}}
                        onPress={()=>deletePrescription(prescriptionData.key)}>
                        Action
                    </Text>
                </View>
        {prescription.map((prescriptionData, index) => {
            return (
                <>
            
                    
                    
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%',}}>
                            <Text style={{ width:'30%', backgroundColor:"rgba(0,0,0,0.2)", color:'black', padding:15, marginVertical:5, borderRadius:25}} >{prescriptionData.medicine}</Text>
                            <Text style={{width:'10%',backgroundColor:"rgba(0,0,0,0.2)", color:'black', textAlign:'center', padding:5,  marginVertical:5, borderRadius:25}}>{prescriptionData.amountDay}</Text>
                            <Text style={{width:'10%',backgroundColor:"rgba(0,0,0,0.2)", color:'black', textAlign:'center', padding:5, marginVertical:5, borderRadius:25}}>{prescriptionData.totalDays}</Text>
                            <TouchableOpacity
                                disabled={status!=="in-progress"}
                                style={{ width:'20%',backgroundColor: 'red', padding: 10, justifyContent:"center", alignItems:"center", borderRadius:10}}
                                onPress={()=>deletePrescription(prescriptionData.key)}>
                                <MaterialCommunityIcons name="delete-sweep" size={20} color={'white'} />
                            </TouchableOpacity>
                        </View>
            
            </>
            
            );
        })}
            </View>
      </View>
    }
      
    </View>
  );
}


