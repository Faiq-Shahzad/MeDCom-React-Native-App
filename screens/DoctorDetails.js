import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import firestore from '@react-native-firebase/firestore';
import {AuthContext, AuthProvider} from '../navigation/AuthProvider';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import {Avatar, Card, Title, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {white} from 'react-native-paper/lib/typescript/styles/colors';
import {UserContext} from '../navigation/UserProvider';
import StarRating from 'react-native-star-rating-widget';

const DoctorDetails = ({navigation}) => {
  const { doctor, backendUrl } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  console.log(doctor);

  const [doctorArr, setDoctor] = useState({
    name: 'Dr. Saima Riaz',
    specialization: 'Heart Surgeon',
    avatar: '../assets/avatar2.jpg',
    price: 'Rs. 1000/-',
    timings: '10AM - 4PM',
    days: 'Mon - Fri',
  });

  // const Reviews = [
  //   {
  //     name: 'Ali Khan',
  //     comment: 'Very Good Experience',
  //     rating: '5 Stars',
  //   },
  //   {
  //     name: 'Ali Khan',
  //     comment: 'Very Good Experience',
  //     rating: '5 Stars',
  //   },
  //   {
  //     name: 'Ali Khan',
  //     comment: 'Very Good Experience',
  //     rating: '5 Stars',
  //   },
  //   {
  //     name: 'Ali Khan',
  //     comment: 'Very Good Experience',
  //     rating: '5 Stars',
  //   },
  //   {
  //     name: 'Ali Khan',
  //     comment: 'Very Good Experience',
  //     rating: '5 Stars',
  //   },
  //   {
  //     name: 'Ali Khan',
  //     comment: 'Very Good Experience',
  //     rating: '5 Stars',
  //   },
  //   {
  //     name: 'Ali Khan',
  //     comment: 'Very Good Experience',
  //     rating: '5 Stars',
  //   },
  // ];

  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    try {
      // console.log("Getting Doc appointment for ",doctor.cnic)
      // console.log("Getting Doc appointment for ",startDate, endDate)
      console.log("url " +backendUrl + 'appointments/reviews/'+doctor.cnic )

      const response = await axios.get(backendUrl + 'appointments/reviews/'+doctor.cnic);
      console.log("Got Response");
      // console.log(response.data);
      const rev = response.data
      
      setReviews(rev)
      setLoading(false);
      

    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(()=>{
    getReviews();
  },[])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#E6EFF9',
        marginTop: 0,
      }}>
      <Card
        style={{
          padding: 10,
          marginBottom: 15,
          borderRadius: 10,
          width: '90%',
          margin: 15,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <View
          style={{
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 5,
          }}>
          <Avatar.Image
            style={{marginTop: 'auto', marginBottom: 'auto'}}
            size={60}
            source={{ uri: doctor.profile? 'data:image/png;base64,'+doctor.profile: DummyAvatar }}
          />
          <Card.Content>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
              }}>
              {doctor.name}
            </Text>
            <Text>{doctor.speciality}</Text>
            <Text
              style={{
                marginTop: 5,
                fontStyle: 'italic',
                color: 'black',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{doctor.timeStart} - {doctor.timeEnd}</Text>
              <Text></Text>
            </Text>
          </Card.Content>
          <Text
            style={{
              fontSize: 15,
              color: 'green',
              fontWeight: '700',
            }}>
            Rs. {doctor.price} /-
          </Text>
        </View>
      </Card>

      <View
        style={{
          backgroundColor: '#E6EFF9',
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 10,
        }}>
        <View>
          {/* <hr></hr> */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
              Reviews
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#555DF2'}}>
              See all
            </Text>
          </View>

          {!loading && (<ScrollView style={{maxHeight:'75%', marginBottom:10, borderRadius:10, padding:5, backgroundColor:'white'}}>
            {reviews.map((item, index) => {
              return (
                <View
                  style={{
                    // padding: 0,
                    marginHorizontal: 15,
                    paddingTop: index>0?15:8,
                    marginBottom: 8,
                    borderTopColor: 'lightgray',
                    borderTopWidth: index>0?1:0,
                  }}>
                  <View
                    style={{
                      padding: 5,
                      
                      flexDirection: 'row',
                      // justifyContent: 'space-around',
                      marginBottom: 5,
                  }}>
                    <Avatar.Image
                      style={{marginTop: 'auto', marginBottom: 'auto', marginHorizontal: 10,}}
                      size={45}
                      source={{ uri: item.Record.profile? 'data:image/png;base64,'+item.Record.profile: DummyAvatar }}
                    />
                    <View style={{
                      // borderColor: 'red',
                      // borderWidth: 2,
                      padding: 0,
                      width: '80%',
                    }}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          // borderColor: 'red',
                          // borderWidth: 2,
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'black',
                            fontWeight: '600',
                            maxWidth: '60%',
                          }}>
                          {item.Record.name}
                        </Text>
                        <View
                        style={{
                          marginLeft: 'auto',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <MaterialCommunityIcons
                            name="calendar"
                            size={20}
                            color="lightgray"
                            style={{fontWeight: 'bold', marginRight: 2}}
                          />
                          <Text>{new Date(item.Record.date).toLocaleDateString()}</Text>
                        </View>
                      </View>
                      <StarRating
                        rating={item.Record.rating}
                        starSize={25}
                        onChange={()=>{}}
                        style={{padding: 2}}
                      />
                      <Text>{item.Record.comments}</Text>
                      
                      
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>)}
          <TouchableOpacity
            style={{
              backgroundColor: '#555DF2',
              padding: 10,
              borderRadius: 5,
              width: '90%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }} onPress={() => navigation.navigate('Book Appointment')}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DoctorDetails;
