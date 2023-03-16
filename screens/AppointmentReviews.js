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

const AppointmentReviews = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState();
  const {user} = useContext(AuthContext);
  const [review, setReview] = useState();

  const [doctor, setDoctor] = useState({
    name: 'Dr. Saima Riaz',
    specialization: 'Heart Surgeon',
    avatar: require('../assets/avatar2.jpg'),
    price: 'Rs. 1000/-',
    startTime: '10 AM',
    endTime: '4 PM',
    days: 'Mon - Fri',
  });

  const postReview = () => {
    setReview({userID: user.identifier, ratings: rating, comments: comments});
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
            source={doctor.avatar}
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
            <Text>{doctor.specialization}</Text>
            <Text
              style={{
                marginTop: 5,
                fontStyle: 'italic',
                color: 'black',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{doctor.days}</Text>
              <Text> | </Text>
              <Text>
                {doctor.startTime} - {doctor.endTime}
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
            {doctor.price}
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
        onPress={() => postReview()}>
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
