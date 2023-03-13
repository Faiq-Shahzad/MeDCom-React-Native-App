import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Button, Avatar, RadioButton} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../navigation/AuthProvider';
import DocumentPicker from 'react-native-document-picker';
import * as Animatable from 'react-native-animatable';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [phone, setPhone] = useState();
  const [cnic, setCnic] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [nextOfKin, setNextOfKin] = useState();
  const [emergencyContact, setEmergencyContact] = useState();

  const [password, setPassword] = useState();
  const [signup_confirm, setSignUpConfirm] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = React.useState('male');
  const [selectedDate, setSelectedDate] = useState();
  const [profile, setProfile] = useState();
  const [displayPicIcon, setDisplayPicIcon] = useState(true);

  const {register} = useContext(AuthContext);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const selectProfilePic = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      console.log('res : ' + JSON.stringify(res));
      setDisplayPicIcon(false);
      setProfile(res);
    } catch (err) {
      setProfile(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const registerUser = () => {
    // register(email, password, fname, lname, phone, gender, selectedDate)
    register(
      email,
      password,
      fname,
      lname,
      cnic,
      bloodGroup,
      selectedDate,
      gender,
      nextOfKin,
      phone,
      emergencyContact,
      profile,
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        alignItems: 'center',
        backgroundColor: '#555DF2',
      }}>
      <Animatable.View
        style={{
          backgroundColor: '#555DF2',
          width: '100%',
          alignItems: 'center',
          padding: 10,
          paddingTop: 40,
        }}
        animation="fadeInDownBig"
        duration={1500}>
        <MaterialCommunityIcons
          name="account-plus"
          size={50}
          color="#07f2e7"
          style={{fontWeight: 'normal'}}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: '#07f2e7',
            textAlign: 'center',
          }}>
          Sign Up
        </Text>
      </Animatable.View>

      <Animatable.View
        style={{
          flex: 1,
          borderWidth: 1,
          padding: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 30,
          borderColor: 'lightgrey',
          width: '100%',
          marginTop: 20,
          backgroundColor: '#07f2e7',
          paddingHorizontal: 5,
        }}
        animation="fadeInUpBig"
        duration={1500}>
        {/* <ScrollView style={{width: '100%', borderTopLeftRadius: 30}}>
          <Text>First Name:</Text>
          <TextInput
            value={fname}
            onChangeText={setFname}
            placeholder="e.g: Faiq"
            style={{
              marginTop: 5,
              borderColor: 'lightgrey',
              borderRadius: 5,
              borderWidth: 1,
              padding: 3,
            }}></TextInput>
          <Text style={{marginTop: 15}}>Last Name:</Text>
          <TextInput
            value={lname}
            onChangeText={setLname}
            placeholder="e.g: Shahzad"
            style={{
              marginTop: 5,
              borderColor: 'lightgrey',
              borderRadius: 5,
              borderWidth: 1,
              padding: 3,
            }}></TextInput>
          <Text style={{marginTop: 15}}>Email:</Text>
          <TextInput
            placeholder="e.g: abcdef@gmail.com"
            style={{
              marginTop: 5,
              borderColor: 'lightgrey',
              borderRadius: 5,
              borderWidth: 1,
              padding: 3,
            }}
            value={email}
            onChangeText={setEmail}></TextInput>
          <Text style={{marginTop: 15}}>Password:</Text>
          <TextInput
            secureTextEntry
            placeholder="********"
            style={{
              marginTop: 5,
              borderColor: 'lightgrey',
              borderRadius: 5,
              borderWidth: 1,
              padding: 3,
            }}
            value={password}
            onChangeText={setPassword}></TextInput>
          <Text style={{marginTop: 15}}>Confirm Password:</Text>
          <TextInput
            secureTextEntry
            placeholder="********"
            style={{
              marginTop: 5,
              borderColor: 'lightgrey',
              borderRadius: 5,
              borderWidth: 1,
              padding: 3,
            }}></TextInput>
          <Text style={{marginTop: 15}}>Cnic:</Text>
          <TextInput
            value={cnic}
            onChangeText={setCnic}
            placeholder="********"
            style={{
              marginTop: 5,
              borderColor: 'lightgrey',
              borderRadius: 5,
              borderWidth: 1,
              padding: 3,
            }}></TextInput>
          <Text style={{marginTop: 15}}>Next of Kin:</Text>
          <TextInput
            value={nextOfKin}
            onChangeText={setNextOfKin}
            placeholder="********"
            style={{
              marginTop: 5,
              borderColor: 'lightgrey',
              borderRadius: 5,
              borderWidth: 1,
              padding: 3,
            }}></TextInput>
          <Text style={{marginTop: 15}}>Phone Number:</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="********"
            style={{
              marginTop: 5,
              borderColor: 'lightgrey',
              borderRadius: 5,
              borderWidth: 1,
              padding: 3,
            }}></TextInput>
          <Text style={{marginTop: 15}}>Emergency Contact:</Text>
          <TextInput
            value={emergencyContact}
            onChangeText={setEmergencyContact}
            placeholder="e.g: 0333-5558444"
            style={{
              marginTop: 5,
              borderColor: 'lightgrey',
              borderRadius: 5,
              borderWidth: 1,
              padding: 3,
            }}></TextInput>
          <Text style={{marginTop: 15}}>Blood Group:</Text>
          <TextInput
            value={bloodGroup}
            onChangeText={setBloodGroup}
            placeholder="e.g AB-"
            style={{
              marginTop: 5,
              borderColor: 'lightgrey',
              borderRadius: 5,
              borderWidth: 1,
              padding: 3,
            }}></TextInput>
          <Text style={{marginTop: 15}}>Date of Birth:</Text>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              borderColor: 'lightgrey',
            }}
            onPress={showDatePicker}>
            <Text style={{fontSize: 15}}>
              {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={{marginTop: 15}}>Gender:</Text>

          <View
            style={{
              borderColor: 'lightgrey',
              borderWidth: 1,
              borderRadius: 10,
            }}>
            <RadioButton.Group
              onValueChange={value => setGender(value)}
              value={gender}>
              <RadioButton.Item
                mode="android"
                label="Male"
                labelStyle={{fontSize: 13}}
                value="male"
                color="red"
              />
              <RadioButton.Item
                mode="android"
                label="Female"
                labelStyle={{fontSize: 13}}
                value="female"
                color="red"
              />
              <RadioButton.Item
                mode="android"
                label="Custom"
                labelStyle={{fontSize: 13}}
                value="custom"
                color="red"
              />
            </RadioButton.Group>
          </View>

          <Text style={{marginTop: 15}}>Profile Picture:</Text>
          <TouchableOpacity
            onPress={selectProfilePic}
            style={{
              alignItems: 'center',
              backgroundColor: 'antiquewhite',
              padding: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'lightgrey',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 12}}>
              {profile?.name
                ? (profile?.name).substring(0, 10) + '...'
                : 'Upload Image'}
            </Text>
          </TouchableOpacity>
          {profile && (
            <Image
              style={{
                width: 150,
                height: 150,
                margin: 10,
                alignSelf: 'center',
                borderRadius: 100,
              }}
              source={{uri: profile?.uri}}
            />
          )}

          <Button
            mode="contained"
            style={{marginTop: 20, padding: 5}}
            onPress={() => registerUser()}>
            Sign Up
          </Button>

          <Text style={{marginTop: 30, textAlign: 'center'}}>
            Already have an account?
          </Text>
          <Button
            mode="outlined"
            style={{marginTop: 20, padding: 5, marginBottom: 20}}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Button>
        </ScrollView> */}

        <ScrollView
          style={{width: '100%'}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            {displayPicIcon ? (
              <Avatar.Image
                style={{marginTop: 'auto', marginBottom: 'auto'}}
                size={100}
                source={require('../assets/ProfilePicIcon3.png')}
              />
            ) : (
              profile && (
                <Avatar.Image
                  style={{marginTop: 'auto', marginBottom: 'auto'}}
                  size={100}
                  source={{uri: profile?.uri}}
                />
              )
            )}

            {/* <Avatar.Image
              style={{marginTop: 'auto', marginBottom: 'auto'}}
              size={100}
              source={{uri: profile?.uri}}
            /> */}
            <TouchableOpacity
              onPress={selectProfilePic}
              style={{
                alignItems: 'center',
                backgroundColor: 'antiquewhite',
                padding: 5,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'lightgrey',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 12}}>
                {profile?.name
                  ? (profile?.name).substring(0, 10) + '...'
                  : 'Upload Image'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 10, width: '100%'}}>
            <Text
              style={{
                fontSize: 20,
                marginTop: '5%',
                fontWeight: '600',
                color: 'black',
              }}>
              Personal Information:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%'}}>
                <Text>First Name:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value={fname}
                  onChangeText={setFname}
                  placeholder="e.g: Faiq"></TextInput>
              </View>
              <View style={{width: '48%'}}>
                <Text>Last Name:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value={lname}
                  onChangeText={setLname}
                  placeholder="e.g: Shahzad"></TextInput>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%'}}>
                <Text>CNIC:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value={cnic}
                  onChangeText={setCnic}
                  placeholder="without spaces/dashes"></TextInput>
              </View>
              <View style={{width: '48%'}}>
                <Text>Email:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="e.g: faiq@gmail.com"></TextInput>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%'}}>
                <Text>Phone Number:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="e.g: 0331-5558407"></TextInput>
              </View>
              <View style={{width: '48%'}}>
                <Text>Blood Group:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value={bloodGroup}
                  onChangeText={setBloodGroup}
                  placeholder="e.g AB-"></TextInput>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%'}}>
                <Text>Password:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholder="* * * * * * * *"></TextInput>
              </View>
              <View style={{width: '48%'}}>
                <Text>Confirm Password:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  secureTextEntry
                  placeholder="* * * * * * * *"></TextInput>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%'}}>
                <Text>Date of Birth:</Text>
                <TouchableOpacity
                  style={{
                    alignItems: 'center',
                    backgroundColor: 'antiquewhite',
                    padding: 5,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                    marginTop: 5,
                  }}
                  onPress={showDatePicker}>
                  <Text style={{fontSize: 15}}>
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : 'Select Date'}
                  </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </View>
            <Text style={{marginTop: 10}}>Gender:</Text>
            <View
              style={{
                flexDirection: 'row',
                borderColor: 'lightgrey',
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <View style={{width: '100%'}}>
                <RadioButton.Group
                  onValueChange={value => setGender(value)}
                  value={gender}>
                  <RadioButton.Item
                    mode="android"
                    label="Male"
                    labelStyle={{fontSize: 13}}
                    value="male"
                    color="red"
                  />
                  <RadioButton.Item
                    mode="android"
                    label="Female"
                    labelStyle={{fontSize: 13}}
                    value="female"
                    color="red"
                  />
                  <RadioButton.Item
                    mode="android"
                    label="Custom"
                    labelStyle={{fontSize: 13}}
                    value="custom"
                    color="red"
                  />
                </RadioButton.Group>
              </View>
            </View>
            <Text
              style={{
                fontSize: 20,
                marginTop: '5%',
                fontWeight: '600',
                color: 'black',
              }}>
              Emergency Information:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%'}}>
                <Text>Next of Kin:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value={nextOfKin}
                  onChangeText={setNextOfKin}
                  placeholder="Cnic without spaces"></TextInput>
              </View>
              <View style={{width: '48%'}}>
                <Text>Emergency Contact:</Text>
                <TextInput
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    borderColor: 'lightgrey',
                    borderRadius: 5,
                    padding: 3,
                  }}
                  value={emergencyContact}
                  onChangeText={setEmergencyContact}
                  placeholder="e.g: 0333-5558444"></TextInput>
              </View>
            </View>

            <Button
              mode="contained"
              style={{marginTop: 20, padding: 5}}
              onPress={() => registerUser()}>
              Sign Up
            </Button>

            <Text style={{marginTop: 30, textAlign: 'center'}}>
              Already have an account?
            </Text>
            <Button
              mode="outlined"
              style={{marginTop: 20, padding: 5, marginBottom: 20}}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Button>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
}
