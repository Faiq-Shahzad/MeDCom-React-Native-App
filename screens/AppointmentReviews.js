import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {Avatar, Card, Title, IconButton} from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import {AuthContext, AuthProvider} from '../navigation/AuthProvider';
import axios from 'axios';

const AppointmentReviews = ({route, navigation}) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState();
  const [review, setReview] = useState();

  const {user, backendUrl, token} = useContext(AuthContext);

  const appointment = route.params?.appointment;

  // const [doctor, setDoctor] = useState({
  //   name: 'Dr. Saima Riaz',
  //   specialization: 'Heart Surgeon',
  //   avatar: require('../assets/avatar2.jpg'),
  //   price: 'Rs. 1000/-',
  //   startTime: '10 AM',
  //   endTime: '4 PM',
  //   days: 'Mon - Fri',
  // });

  const postReview = async () => {
    // setReview({userID: user.identifier, ratings: rating, comments: comments});

    try {
      // console.log("Getting Doc appointment for ",doctor.cnic)
      // console.log("Getting Doc appointment for ",startDate, endDate)
      console.log("url " +backendUrl + 'appointments/review/'+appointment.appointmentId, token, rating, comments )
      if(!rating){
        alert('Please Provide rating')
        return;
      }else if(!comments){
        alert('Please Provide comments')
        return;
      }

      // alert("Sending request")

      const response = await axios.post(backendUrl + 'appointments/review/'+appointment.appointmentId, { star: rating, comments: comments}, {
        headers: {
          authorization: 'Bearer '+token,
        },
      });
      console.log("Got Response");
      // console.log(response.data);
      // const allMedicalRecords = response.data
      alert(response.data.message)
      
      // setMedicalRecords(allMedicalRecords)
      // setLoading(false)

    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
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
            source={{ uri: appointment.doc.profile? 'data:image/png;base64,'+appointment.doc.profile: DummyAvatar }}
          />
          <Card.Content>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
              }}>
              {appointment.doc.name}
            </Text>
            <Text>{appointment.doc.speciality}</Text>
            <Text
              style={{
                marginTop: 5,
                fontStyle: 'italic',
                color: 'black',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>
                {appointment.doc.timeStart} - {appointment.doc.timeEnd}
              </Text>
              <Text></Text>
            </Text>
          </Card.Content>
          <Text
            style={{
              fontSize: 15,
              color: 'green',
              fontWeight: '700',
            }}>
            Rs. {appointment.doc.price} /-
          </Text>
        </View>
      </Card>

      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Rate your Experience:
      </Text>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <StarRating
          rating={rating}
          onChange={setRating}
          style={{backgroundColor: 'white', padding: 5, borderRadius: 10}}
        />
      </View>
      <View style={{marginTop: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Comments:</Text>
        <Card
          style={{
            backgroundColor: 'white',
            width: '95%',
            padding: 10,
            borderRadius: 5,
            alignSelf: 'center',

            marginTop: 20,
          }}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            placeholder="Write a review..."
            value={comments}
            onChangeText={comments => setComments(comments)}
            style={{
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius: 5,
              padding: 10,
              width: '95%',
              alignSelf: 'center',
              textAlignVertical: 'top',
            }}></TextInput>
        </Card>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#555DF2',
          padding: 10,
          marginTop: 50,
          borderRadius: 5,
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        onPress={() => {postReview()}}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Submit Review
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AppointmentReviews;
