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
import StarRating from 'react-native-star-rating';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import {Avatar, Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

const HomePage = ({navigation}) => {
  const {doctor, setDoctor, backendUrl, logout, setSelectedCat } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [PopularDoctors, SetPopularDoctors] = useState([]);


  const getDoc = async () => {
    try {
      console.log("Getting Docs ",)
      const response = await axios.post(backendUrl + 'doctors/search/msp/org2.department1');
      // console.log(response.data);
      console.log(response.data);
      SetPopularDoctors(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      logout()
    }
  }

  const Categories = [
    {
      title: 'Cardiologist',
      avatar: require('../assets/c1.png'),
    },
    {
      title: 'Dermatologist',
      avatar: require('../assets/c9.png'),
    },
    {
      title: 'Dentist',
      avatar: require('../assets/c3.png'),
    },
  ];

  // const PopularDoctors = [
  //   {
  //     key: 0,
  //     name: 'Dr. Faiq Shahzad',
  //     specialization: 'Heart Surgeon',
  //     avatar: require('../assets/avatar.jpg'),
  //     price: 'Rs. 1000/-',
  //     startTime: '10 AM',
  //     endTime: '4 PM',
  //     days: 'Mon - Fri',
  //   },
  //   {
  //     key: 1,
  //     name: 'Dr. Arif Shahzad',
  //     specialization: 'Heart Surgeon',
  //     avatar: require('../assets/avatar2.jpg'),
  //     price: 'Rs. 2000/-',
  //     startTime: '10 AM',
  //     endTime: '4 PM',
  //     days: 'Mon - Fri',
  //   },
  //   {
  //     key: 2,
  //     name: 'Dr. Saima Riaz',
  //     specialization: 'Heart Surgeon',
  //     avatar: require('../assets/avatar4.jpg'),
  //     price: 'Rs. 1000/-',
  //     startTime: '10 AM',
  //     endTime: '4 PM',
  //     days: 'Mon - Fri',
  //   },
  //   {
  //     key: 3,
  //     name: 'Dr. Saima Riaz',
  //     specialization: 'Heart Surgeon',
  //     avatar: require('../assets/avatar3.png'),
  //     price: 'Rs. 1000/-',
  //     startTime: '10 AM',
  //     endTime: '4 PM',
  //     days: 'Mon - Fri',
  //   },
  //   {
  //     key: 4,
  //     name: 'Dr. Saima Riaz',
  //     specialization: 'Heart Surgeon',
  //     avatar: require('../assets/avatar.jpg'),
  //     price: 'Rs. 1000/-',
  //     startTime: '10 AM',
  //     endTime: '4 PM',
  //     days: 'Mon - Fri',
  //   },
  // ];

  const handleBookAppointment = element => {
    setDoctor(element.Record);
    navigation.navigate('Book Appointment');
  };

  const [categories, setCategories] = useState(Categories);
  // const [popular, setPopular] = useState(PopularDoctors);

  useEffect(() => {
    getDoc();
    
  },[]);

  if(loading){
    return (
      <View>
        <Text> Loading </Text>
      </View>
    );
  }else{

  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#555DF2',
        marginTop: 0,
      }}>
      <View style={{flexDirection:'row', width:'100%'}}>
        
        <TouchableOpacity
          style={{
            marginTop: 15,
            marginLeft: '5%',
            marginRight: '5%',
            flexDirection: 'row',
          }}
          onPress={() => viewNotifications()}>
          <Icon
            name="notifications-none"
            size={25}
            color="white"
            style={{fontWeight: 'bold'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 15,
            marginLeft: '3%',
            marginRight: 'auto',
            flexDirection: 'row',
          }}
          onPress={() => navigation.navigate('Medical Access')}>
          <MaterialCommunityIcons
            name="folder-key-outline"
            size={25}
            color="white"
            style={{fontWeight: 'bold'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 15,
            marginLeft: 'auto',
            marginRight: '3%',
            flexDirection: 'row',
          }}
          onPress={() => logout()}>
          <MaterialCommunityIcons
            name="logout"
            size={25}
            color="white"
            style={{fontWeight: 'bold'}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
          marginTop: 30,
          marginLeft: 20,
          marginRight: 20,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 30,
            marginTop: 5,
          }}>
          <Text>Med</Text>
          <Text style={{color: '#44E354'}}>Com</Text>
        </Text>
        <View>
          <Text style={{color: 'white'}}>Find your desired</Text>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 23}}>
            Doctor Right Now!
          </Text>
        </View>
      </View>
      <TextInput
        placeholder="Search"
        style={{
          padding: 4,
          backgroundColor: 'white',
          marginBottom: 20,
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 5,
        }}></TextInput>

      <View
        style={{
          backgroundColor: '#E6EFF9',
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 10,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
              Categories
            </Text>
            <Text
              style={{fontWeight: 'bold', fontSize: 15, color: '#555DF2'}}
              onPress={() => navigation.navigate('Categories')}>
              See all
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {categories.map((element, index) => {
              return (
                <Card style={{width: '32%', alignItems: 'center'}}
                  onPress={() =>
                    {
                    setSelectedCat({title: element.title, avatar: element.avatar})
                    navigation.navigate('Doctors')
                    }
                  }>
                  <Card.Content style={{alignItems: 'center'}}>
                    <Avatar.Image size={45} source={element.avatar} />
                    <Title
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {element.title}
                    </Title>
                  </Card.Content>
                </Card>
              );
            })}
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
              Popular Doctors
            </Text>
            <Text
              style={{fontWeight: 'bold', fontSize: 15, color: '#555DF2'}}
              onPress={() => navigation.navigate('Doctors')}>
              See all
            </Text>
          </View>

          <ScrollView style={{marginBottom: 190}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {console.log(PopularDoctors.length)}
            {PopularDoctors.map((item, index) => {
              {/* console.log(item.Record); */}
              return (
                <Card key={index+"PD"}
                  style={{
                    padding: 5,
                    marginBottom: 10,
                  }}
                  onPress={()=>{
                    setDoctor(item.Record);
                    // setDoctorData(element);
                    // console.log(element.Record);
                    navigation.navigate('Doctor Details');
                  }}>
                  <View
                    style={{
                      padding: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Avatar.Image
                      style={{marginTop: 'auto', marginBottom: 'auto'}}
                      size={60}
                      // source={item.Record.profile}
                      source={{ uri: item.Record.profile? 'data:image/png;base64,'+item.Record.profile: DummyAvatar }}
                    />
                    <Card.Content>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          fontWeight: '700',
                        }}>
                        {item.Record.name}
                      </Text>
                      <Text>{item.Record.speciality}</Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'green',
                          fontWeight: '700',
                        }}>
                        Rs. {item.Record.price}
                      </Text>
                    </Card.Content>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#555DF2',
                        padding: 5,
                        borderRadius: 5,
                        width: '25%',
                        height: '50%',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                      }}
                      onPress={() => handleBookAppointment(item)}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        Book
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
  }
};

export default HomePage;
