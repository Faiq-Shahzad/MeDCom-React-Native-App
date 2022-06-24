import React, {useState, useEffect, useContext} from 'react';
import { Text, View, Image,FlatList, Alert, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';


export default SearchDoctors = ({navigation}) => {
    const [doctors, getDoctors] = useState([{"name":"Faiq Shahzad", "speciality":"MBBS | Surgeon", "time":"11:00 - 1550", "star":"3.5"},{"name":"Fazal Khan", "speciality":"MBBS | Biologist", "time":"800 - 1200", "star":"4.7"}]);
    // const onStarRatingPress = (rating) => {
    //   this.setState({
    //     starCount: rating
    //   });
    // }

   
  

    return(
      <View style={{flex:1, marginTop:10, alignItems:"center"}}>
        <View style={{flexDirection:"row", width:"85%", marginTop:30}}>
            <MaterialCommunityIcons name="account-search" size={30} 
            style={{
              backgroundColor:'white',
              padding:10,
              marginRight:10,
              borderRadius:30,
              shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.84,
              elevation: 5,}} color="grey" />
            <TextInput
            style={{
              width:'80%',
              backgroundColor:'white',
              paddingHorizontal:20,
              borderRadius:30,
              shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.84,
              color:'gray',
              elevation: 5,}}
            placeholderTextColor="gray"
            placeholder="Search">
            </TextInput>
        </View>
        {doctors.map( (element) =>{
  
            return(
            <TouchableOpacity style=
            {{marginTop:10, width:'90%', backgroundColor:'rgba(255,255,255,1)', padding:10, borderRadius:30, shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.84,
              
              elevation: 5,}}
             onPress={()=> navigation.navigate("Make Appointment")}>
                <View style={{width:"100%", justifyContent:'center'}}>
                {/* <View style={{width:"85%", borderRadius:20, backgroundColor:"red", justifyContent:'center', padding:10}}> */}
                <View style={{flexDirection:'row'}}>
                    <View style={{}}>
                      <Image style={{width: 100, height: 100, alignSelf:'center', borderRadius:100, marginTop:10}}
                        source={{ uri: "https://firebasestorage.googleapis.com/v0/b/medcom-e961c.appspot.com/o/avatar.png?alt=media&token=f6a81a27-c82c-4f22-9ba4-ca8ead95cb5a"}}/>
                    </View>
                    <View style={{paddingLeft:25}}>
                      <Text style={{fontSize:17, fontWeight:"bold", color:"red", marginVertical:10}}>Dr. {element.name}</Text>

                      <Text style={{fontSize:16, fontFamily:"sans-serif", color:"blue", marginRight:15}}>{element.speciality}</Text>
                      
                      <View style={{flexDirection:"row", marginTop:5, alignItems:'center'}}>
                          <MaterialCommunityIcons name="clock-time-three" size={24} color="blue" />
                          <Text style={{marginLeft:5, fontSize:16, fontFamily:"sans-serif", color:"blue"}}>{element.time}</Text>
                      </View>

                      <View style={{flexDirection:"row", justifyContent:'flex-start', marginTop:5}}>
                          <Text style={{fontSize:16, fontFamily:"sans-serif", color:"blue", marginRight:10}}>Rating</Text>
                          <StarRating
                              disabled={true}
                              maxStars={5}
                              rating={element.star}
                              starSize={20}
                              starStyle={{color:'blue'}}
                            />
                      </View>
                      <View style={{flexDirection:"row", justifyContent:'flex-start', marginTop:5}}>
                      <Text>user.uid</Text>
                      </View>
                    </View>
                  </View>
                </View>
            </TouchableOpacity>
  
          );
        })}
      </View>
    );
  }