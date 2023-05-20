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

const AppointmentLabReviews = ({route, navigation}) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState();
  const [review, setReview] = useState();

  const {user, backendUrl, token} = useContext(AuthContext);

  const appointment = route.params?.appointment;

  const postReview = async () => {

    try {
      console.log(
        'url ' +
          backendUrl +
          'appointments/labreview/' +
          appointment.appointmentId,
        token,
        rating,
        comments,
      );
      if (!rating) {
        alert('Please Provide rating');
        return;
      } else if (!comments) {
        alert('Please Provide comments');
        return;
      }

      const response = await axios.post(
        backendUrl + 'appointments/labreview/' + appointment.appointmentId,
        {star: rating, comments: comments},
        {
          headers: {
            authorization: 'Bearer ' + token,
          },
        },
      );
      console.log('Got Response');
      alert(response.data.message);
      navigation.navigate("Appointments");
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
            source={{
              uri: appointment.op.profile
                ? 'data:image/png;base64,' + appointment.op.profile
                : DummyAvatar,
            }}
          />
          <Card.Content>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
              }}>
              {appointment.op.name}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Date: {new Date(appointment.date).toLocaleDateString()}</Text>
            <Text>
              HexoLife Lab
            </Text>
          </Card.Content>
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
        onPress={() => {
          postReview();
        }}>
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

export default AppointmentLabReviews;
