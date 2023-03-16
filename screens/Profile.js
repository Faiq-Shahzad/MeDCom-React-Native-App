import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';

export default function Profile({navigation, route}) {
  const {user, logout, backendUrl, token, DummyAvatar} =
    useContext(AuthContext);

  const [details, setDetails] = useState();
  // var details;
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const edit = () => {
    setDisabled(!disabled);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDetails({...details, dob: date});
    hideDatePicker();
  };

  const getUser = async () => {
    // await firestore()
    // .collection('users')
    // .doc(user.uid)
    // .get()
    // .then((documentSnapshot) => {
    //   if( documentSnapshot.exists ) {
    //     // console.log('User Data', documentSnapshot.data());
    //     // setDetails({...documentSnapshot.data(), dob:(new Date(documentSnapshot.data().dob.seconds))});
    //     setDetails({...documentSnapshot.data(), dob:(new Date(documentSnapshot.data().dob.seconds * 1000))});
    //     // console.log('Details Data', details.dob);
    //     setLoading(false)
    //   }
    // })
    try {
      console.log("Getting Profile ", token)
      const response = await axios.get(backendUrl + 'patients/view', {
        headers: {
          authorization: 'Bearer '+token,
        },
      });
      // console.log(response.data);
      console.log(response.data[0].Value);
      setDetails(response.data[0].Value);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleProfileUpdate = async () => {
    setDisabled(true);
    let imgUrl = details.userImg;
    await firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        fname: details.fname,
        lname: details.lname,
        email: details.email,
        phone: details.phone,
        gender: details.gender,
        dob: details.dob,
        createdAt: details.createdAt,
        userImg: imgUrl,
      })
      .then(() => {
        console.log('User Updated');
        Alert.alert('Profile', 'Your Profile Updated Successfully.');
      });
  };

  const logoutUser = () => {
    logout()
  }

  useEffect(() => {
    getUser();

  }, []);

  if (loading) {
    console.log('Some data');
    return (
      <View>
        <Text> Loading </Text>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <ScrollView
          style={{width: '95%'}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{padding:8, borderRadius:10, width:"100%", backgroundColor:'white', marginVertical:20,
                      shadowColor: "#000",
                      shadowOffset: {
                          width: 0,
                          height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4.84,    
                      elevation: 5,}}>
          <TouchableOpacity onPress={edit}><Icon style={{alignSelf:"flex-end"}} name="edit" size={24} color="black"/></TouchableOpacity>
          <Image style={{width: 150, height: 150, marginBottom:50, alignSelf:'center', borderRadius:100}}
                source={{ uri: details.profile? 'data:image/png;base64,'+details.profile: DummyAvatar }}/>
        </View>
        <View style={{paddingHorizontal:10}}>
        <View style={{flexDirection:'row', marginTop:10}}>
          <View style={{width:'48%', marginRight:10}}>
            <Text>Name:</Text>
            <TextInput style={{marginTop:5, backgroundColor:'white', paddingHorizontal:10, borderColor:"lightgrey", borderRadius:5,  padding:3}} value={details.name} onChangeText={(val)=>setDetails({...details, name:val})} editable={!disabled}></TextInput>
          </View>
          <View style={{width:'48%', marginLeft:10}}>
            <Text style={{paddingHorizontal: 10}}>Email:</Text>
            <TextInput style={{marginTop:5, backgroundColor:'white', paddingHorizontal:10, borderColor:"lightgrey", borderRadius:5,  padding:3}} value={details.email} onChangeText={(val)=>setDetails({...details, email:val})} editable={!disabled}></TextInput>
          </View>
        </View>
        <View style={{flexDirection:'row', marginTop:10}}>
          <View style={{width:'50%'}}>
            <Text style={{marginTop:15}}>Phone Number:</Text>
            <TextInput style={{marginTop:5, backgroundColor:'white', paddingHorizontal:10, borderColor:"lightgrey", borderRadius:5,  padding:3}} value={details.contact} onChangeText={(val)=>setDetails({...details, contact:val})} editable={!disabled}></TextInput>
            <Text style={{marginTop:15}}>Next Of Kin:</Text>
            <TextInput style={{marginTop:5, backgroundColor:'white', paddingHorizontal:10, borderColor:"lightgrey", borderRadius:5,  padding:3}} value={details.emergencyContact} onChangeText={(val)=>setDetails({...details, emergencyContact:val})} editable={!disabled}></TextInput>
            {/* <Text style={{marginTop:15}}>Date of Birth:</Text>
            <TouchableOpacity style={{alignItems:"center", backgroundColor:disabled?'lightgray':'rgb(120,220,140)', borderWidth:1, padding:10, borderRadius:5, borderColor:"lightgrey"}} onPress={showDatePicker} disabled={disabled}>
              <Text style={{fontSize:15, color:'white'}}>{details.dob.toLocaleDateString()}</Text> 
              <Text style={{fontSize:15, color:'white'}}></Text>
            </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              /> */}
          </View >
          <View style={{width:'50%'}}>

            <View style={{backgroundColor:'transparent', marginHorizontal:10, borderRadius:10}}>
            <Text style={{marginTop:15, paddingHorizontal: 10}}>Blood Group:</Text>
            <TextInput style={{marginTop:5, backgroundColor:'white', paddingHorizontal:10, borderColor:"lightgrey", borderRadius:5,  padding:3}} value={details.bloodGroup} onChangeText={(val)=>setDetails({...details, bloodGroup:val})} editable={!disabled}></TextInput>
            <Text style={{marginTop:15, paddingHorizontal: 10}}>Emergency Number:</Text>
            <TextInput style={{marginTop:5, backgroundColor:'white', paddingHorizontal:10, borderColor:"lightgrey", borderRadius:5,  padding:3}} value={details.nextOfKin} onChangeText={(val)=>setDetails({...details, nextOfKin:val})} editable={!disabled}></TextInput>
            {/* <RadioButton.Group onValueChange={(val)=>setDetails({...details, gender:val})} value={details.gender} >
              <RadioButton.Item mode='android' label="Male" labelStyle={{fontSize:13}} value="male" color='red' disabled={disabled}/>
              <RadioButton.Item mode='android' label="Female" labelStyle={{fontSize:13}} value="female" color='red' disabled={disabled}/>
              <RadioButton.Item mode='android' label="Custom" labelStyle={{fontSize:13}} value="custom" color='red' disabled={disabled}/>
            </RadioButton.Group> */}
            </View>
          </View>
        </View>


        <Button mode='contained' style={{marginTop:20, padding:5, borderColor:"blue"}} disabled={disabled} onPress={handleProfileUpdate} >Update</Button> 
        </View>
          {/* <Text style={{fontSize: 25, marginTop: 10, fontWeight: 'bold'}}>
            Profile:
          </Text> */}

          {/* <View
            style={{
              padding: 8,
              borderRadius: 10,
              width: '100%',
              backgroundColor: 'white',
              marginVertical: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.84,
              elevation: 5,
            }}>
            <TouchableOpacity onPress={edit}>
              <Icon
                style={{alignSelf: 'flex-end'}}
                name="edit"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Image
              style={{
                width: 150,
                height: 150,
                marginBottom: 50,
                alignSelf: 'center',
                borderRadius: 100,
              }}
              source={require('../assets/avatar.jpg')}
            />
          </View> */}
          {/* <View style={{paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{width: '48%', marginRight: 10}}>
                <Text>Name:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value="Faiq Shahzad"
                  onChangeText={val => setDetails({...details, name: val})}
                  editable={!disabled}></TextInput>
              </View>
              <View style={{width: '48%', marginLeft: 10}}>
                <Text style={{paddingHorizontal: 10}}>Email:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value="faiq@gmail.com"
                  onChangeText={val => setDetails({...details, email: val})}
                  editable={!disabled}></TextInput>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{width: '50%'}}>
                <Text style={{marginTop: 15}}>Phone Number:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value="0331-5558407"
                  onChangeText={val => setDetails({...details, contact: val})}
                  editable={!disabled}></TextInput>
                <Text style={{marginTop: 15}}>Next Of Kin:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value="0331-5558407"
                  onChangeText={val =>
                    setDetails({...details, emergencyContact: val})
                  }
                  editable={!disabled}></TextInput>
                
              </View>
              <View style={{width: '50%'}}>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    marginHorizontal: 10,
                    borderRadius: 10,
                  }}>
                  <Text style={{marginTop: 15, paddingHorizontal: 10}}>
                    Blood Group:
                  </Text>
                  <TextInput
                    style={{
                      marginTop: 5,
                      backgroundColor: 'white',
                      paddingHorizontal: 10,
                      borderColor: 'lightgrey',
                      borderRadius: 5,
                      padding: 3,
                    }}
                    value="O+"
                    onChangeText={val =>
                      setDetails({...details, bloodGroup: val})
                    }
                    editable={!disabled}></TextInput>
                  <Text style={{marginTop: 15, paddingHorizontal: 10}}>
                    Emergency Number:
                  </Text>
                  <TextInput
                    style={{
                      marginTop: 5,
                      backgroundColor: 'white',
                      paddingHorizontal: 10,
                      borderColor: 'lightgrey',
                      borderRadius: 5,
                      padding: 3,
                    }}
                    value="12345"
                    onChangeText={val =>
                      setDetails({...details, nextOfKin: val})
                    }
                    editable={!disabled}></TextInput>
                </View>
              </View>
            </View>

            <Button
              mode="contained"
              style={{marginTop: 20, padding: 5, borderColor: 'blue'}}
              disabled={disabled}
              onPress={handleProfileUpdate}>
              Update
            </Button>
          </View> */}
          <Text style={{color: 'grey', fontWeight: 'bold', alignSelf: 'center'}}>
            ____________________________________________________________
          </Text>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                marginTop: 15,
                margin: 10,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 8,
                width: '98%',
                shadowOpacity: 1,
                shadowRadius: 3,
                elevation: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }} onPress={() => navigation.navigate('Change Password')}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color="grey"
              />
              <Text style={{fontSize: 16, fontWeight: 'bold', padding:5}}>
                Change Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 0,
                margin: 10,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 8,
                width: '98%',
                shadowOpacity: 1,
                shadowRadius: 3,
                elevation: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }} onPress={() => navigation.navigate('FAQs')}>
              <MaterialCommunityIcons
                name="chat-question-outline"
                size={20}
                color="grey"
              />
              <Text style={{fontSize: 16, fontWeight: 'bold', padding:5}}>FAQs</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginTop: 0,
                margin: 10,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 8,
                width: '98%',
                shadowOpacity: 1,
                shadowRadius: 3,
                elevation: 3,
                flexDirection: 'row',
                alignItems: 'center',
              }} onPress={() => logoutUser()}>
              <MaterialCommunityIcons
                name="logout"
                size={20}
                color="grey"
              />
              <Text style={{fontSize: 16, fontWeight: 'bold', padding:5}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
