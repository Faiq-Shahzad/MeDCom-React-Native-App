import React, {useState, useEffect, useContext} from 'react';
import { Text, View, Image,FlatList, Alert, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import firestore from '@react-native-firebase/firestore';

export default SearchDoctors = ({navigation}) => {
    // const [doctors, getDoctors] = useState([{"name":"Faiq Shahzad", "speciality":"MBBS | Surgeon", "time":"11:00 - 1550", "star":"3.5"},{"name":"Fazal Khan", "speciality":"MBBS | Biologist", "time":"800 - 1200", "star":"4.7"}]);
    // const onStarRatingPress = (rating) => {
    //   this.setState({
    //     starCount: rating
    //   });
    // }

    const [details, setDetails] = useState()
    const [searchInput, setSearchInput] = useState()
    // var details;
    const [loading, setLoading] = useState(true)

    const [docList, setDocList] = useState([]);

    const getDoc = async () => {
      const tempList = []
      await firestore()
      .collection('doctors')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          const {name, degree, specialty, imgUrl, fee, timing, rating} = doc.data()

          tempList.push({
            id: doc.id,
            imgUrl,
            name,
            degree,
            specialty,
            fee,
            timing,
            rating
          })
        });
        
        setDocList(tempList)
        // console.log("DOC", docList)
        setLoading(false)
      })
    }

    const getDocFiltered = async (input) => {
      setLoading(true)
      const tempList = []
      await firestore()
      .collection('doctors')
      .where('name', '>=', input)
      .where('name', "<=", input +'\uf8ff')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          const {name, degree, specialty, imgUrl, fee, timing, rating} = doc.data()
          console.log(doc)

          tempList.push({
            id: doc.id,
            imgUrl,
            name,
            degree,
            specialty,
            fee,
            timing,
            rating
          })
        });
        
        setDocList(tempList)
        // console.log("DOC", docList)
        setLoading(false)
      })
    }
    
  
    useEffect(() => {
      getDoc();
      
    }, []);
  
  
    if(loading){
      console.log("loading Data")
      return(
        <View>
          <Text> Loading </Text>
        </View>
      )
    }else{

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
              elevation: 5,}} color="grey" onPress={()=>getDocFiltered(searchInput)}/>
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
            placeholder="Search"
            value={searchInput}
            onChangeText={setSearchInput}>
            </TextInput>
        </View>
        
        {docList.map( (element) =>{
            return(
            <TouchableOpacity key={element.id} style=
            {{marginTop:10, width:'90%', backgroundColor:'rgba(255,255,255,1)', padding:10, borderRadius:30, shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.84,
              
              elevation: 5,}}
             onPress={()=> navigation.navigate("Make Appointment", {doctor:element})}>
                <View style={{width:"100%", justifyContent:'center'}}>
                {/* <View style={{width:"85%", borderRadius:20, backgroundColor:"red", justifyContent:'center', padding:10}}> */}
                <View style={{flexDirection:'row'}}>
                    <View style={{}}>
                      <Image style={{width: 100, height: 100, alignSelf:'center', borderRadius:100, marginTop:10}}
                        source={{ uri: element.imgUrl}}/>
                    </View>
                    <View style={{paddingLeft:25}}>
                      <Text style={{fontSize:17, fontWeight:"bold", color:"red", marginVertical:10}}>Dr. {element.name}</Text>

                      <Text style={{fontSize:16, fontFamily:"sans-serif", color:"blue", marginRight:15}}>{element.degree} | {element.specialty}</Text>
                      
                      <View style={{flexDirection:"row", marginTop:5, alignItems:'center'}}>
                          <MaterialCommunityIcons name="clock-time-three" size={24} color="blue" />
                          <Text style={{marginLeft:5, fontSize:16, fontFamily:"sans-serif", color:"blue"}}>{element.timing[0]} - {element.timing[element.timing.length-1]}</Text>
                      </View>

                      <View style={{flexDirection:"row", justifyContent:'flex-start', marginTop:5}}>
                          <Text style={{fontSize:16, fontFamily:"sans-serif", color:"blue", marginRight:10}}>Rating</Text>
                          <StarRating
                              disabled={true}
                              maxStars={5}
                              rating={element.rating}
                              starSize={20}
                              fullStarColor={'blue'}
                            />
                      </View>
                      <View style={{flexDirection:"row", justifyContent:'flex-start', marginTop:5}}>
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
  }