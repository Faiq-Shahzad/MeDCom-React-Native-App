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
// import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import {Avatar, Card, Title, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

const Doctors = ({navigation, route}) => {
  const {doctor, setDoctor, backendUrl, selectedCat, setSelectedCat} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [allDocs, setAllDocs] = useState([]);
  const [popular, setPopular] = useState([]);
  const [searchText, setSearchText] = useState('');

  // const searchCategory = route.params?.searchCategory;
  // const [cat, setCat] = useState(searchCategory);
  
  
  const getDoc = async () => {
    try {
      console.log("Getting Docs ",)
      const response = await axios.post(backendUrl + 'doctors/search/msp/org2.department1');
      // console.log(response.data);
      // console.log(response.data);
      setPopular(response.data);
      setAllDocs(response.data)
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      logout()
    }
  }
  const getDocByCat = async (cat) => {
    try {
      console.log("Getting Docs by cat", cat)
      const response = await axios.post(backendUrl + 'doctors/search/speciality/'+cat.title);
      // console.log(response.data);
      // console.log(response.data);
      setPopular(response.data);
      setAllDocs(response.data)
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      logout()
    }
  }

  const filterByName = async (name) => {
    console.log(name)
    const filteredDoc = allDocs.filter(o => o.Record.name.toLowerCase().includes(name.toLowerCase()));
      console.log("filteredDoc ", filteredDoc.length)
      setPopular(filteredDoc)
  }
  
  const doctorDetails = element => {
    setDoctor(element.Record);
    // setDoctorData(element);
    console.log(element.Record);
    navigation.navigate('Doctor Details');
  };

  const bookAppointment = element => {
    setDoctor(element.Record);
    // setDoctorData(element);
    console.log(element);
    navigation.navigate('Book Appointment');
  };
  const PopularDoctors = [
    {
      key: 0,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 1,
      name: 'Dr. Arif Shahzad',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 2000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 2,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 3,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 4,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 5,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 5,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 6,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
    {
      key: 7,
      name: 'Dr. Saima Riaz',
      specialization: 'Heart Surgeon',
      avatar: require('../assets/avatar2.jpg'),
      price: 'Rs. 1000/-',
      startTime: '10 AM',
      endTime: '4 PM',
      days: 'Mon - Fri',
    },
  ];


  useEffect(() => {
    if(!selectedCat){
      getDoc();
    }else{
      getDocByCat(selectedCat);
    }
    
  },[selectedCat]);

  const renderItem = ({item}) => (
    <Card
      style={{
        padding: 10,
        marginBottom: 15,
        borderRadius: 10,
      }}
      onPress={() => doctorDetails(item)}>
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
          // source={item.avatar}
          source={{ uri: item.Record.profile? 'data:image/png;base64,'+item.Record.profile: DummyAvatar }}
        />
        <Card.Content>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: 'bold',
            }}>
            {item.Record.name}
          </Text>
          <Text>{item.Record.speciality}</Text>
          <Text
            style={{
              marginTop: 5,
              fontStyle: 'italic',
              color: 'black',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>{item.Record.timeStart} - {item.Record.timeEnd}</Text>
            <Text></Text>
          </Text>
        </Card.Content>
        <Text
          style={{
            fontSize: 15,
            color: 'green',
            fontWeight: '700',
          }}>
          Rs. {item.Record.price} /-
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#555DF2',
          padding: 5,
          borderRadius: 5,
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }} onPress={() => bookAppointment(item)}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Book
        </Text>
      </TouchableOpacity>
    </Card>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#E6EFF9',
        marginTop: 10,
      }}>
      <View style={{flexDirection: 'row'}}>

        
        <TextInput
          placeholder="Search"
          style={{
            padding: 4,
            backgroundColor: 'white',
            width: '75%',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 5,
            shadowOpacity: 1,
            shadowRadius: 3,
            elevation: 3,
          }} 
          onChangeText={text => {
            console.log("setting search text")
            setSearchText(text)
            }}
          value={searchText}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#555DF2',
              padding: 5,
              borderRadius: 5,
              width: '20%',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }} onPress={() => filterByName(searchText)}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>

        {selectedCat && 

        <Card
          style={{
            margin: 10,
            padding: 10,
            marginBottom: 15,
            borderRadius: 10,
          }}
          // onPress={() => doctorDetails(item)}
          >
          <View
            style={{
              padding: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Avatar.Image size={30} source={selectedCat.avatar} />
            {/* <Avatar.Image
              style={{marginTop: 'auto', marginBottom: 'auto'}}
              size={60}
              // source={item.avatar}
              source={{ uri: item.Record.profile? 'data:image/png;base64,'+item.Record.profile: DummyAvatar }}
            /> */}
            <Card.Content style={{ alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                {selectedCat.title}
              </Text>
            </Card.Content>
            
          

          <TouchableOpacity
            style={{
              backgroundColor: '#f74545',
              padding: 5,
              borderRadius: 5,
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
              marginRight: 5,
            }} onPress={() => {setSelectedCat(null)}}>
            {/* <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Get All
            </Text> */}
            <MaterialCommunityIcons
              name="close"
              size={20}
              color="white"
              style={{fontWeight: 'bold'}}
            />
          </TouchableOpacity>
          </View>
        </Card>
        
          
      }

      <View
        style={{
          backgroundColor: '#E6EFF9',
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
        }}>
        <View>
          <FlatList
            data={popular}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Doctors;
