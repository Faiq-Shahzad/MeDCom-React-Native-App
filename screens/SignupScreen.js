import React, {useState, useEffect, useContext} from 'react';
import { Text, View, FlatList, Alert, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {Button, RadioButton} from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../navigation/AuthProvider';
import * as Animatable from 'react-native-animatable';

export default function SignupScreen({navigation}) {

  const [email, setEmail] = useState()
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [phone, setPhone] = useState()
  const [password, setPassword] = useState()
  const [signup_confirm, setSignUpConfirm] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false)
  const [gender, setGender] = React.useState('male');
  const [selectedDate, setSelectedDate] = useState();

  const {register} = useContext(AuthContext)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date)
    hideDatePicker();
  };

  const registerUser = () =>{
    register(email, password, fname, lname, phone, gender, selectedDate)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor:"#07f2e7"}}>

      <Animatable.View style={{backgroundColor:"#07f2e7", width:"100%", alignItems:"center", padding:10, paddingTop:40}} animation="fadeInDownBig" duration={1500}>
        <MaterialCommunityIcons name="account-plus" size={50} color="black" style={{fontWeight:"bold"}}/>
        <Text style={{fontSize:25, fontWeight:"bold", color:"black"}}>Sign Up</Text>
        
      </Animatable.View>

      
        
      <Animatable.View style={{flex:1, borderWidth:1, padding:8, borderTopLeftRadius:40, borderTopRightRadius:40, paddingTop:30, borderColor:"lightgrey", width:"100%", marginTop:20, backgroundColor:"white", paddingHorizontal:20}} animation="fadeInUpBig" duration={1500}>
        <ScrollView style={{width:"100%", borderTopLeftRadius:30}}>

          <Text>First Name:</Text>
          <TextInput value={fname} onChangeText={setFname} placeholder="e.g: Faiq" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:7}}></TextInput>
          <Text style={{marginTop:15}}>Last Name:</Text>
          <TextInput value={lname} onChangeText={setLname} placeholder="e.g: Shahzad" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}}></TextInput>
          <Text style={{marginTop:15}}>Email:</Text>
          <TextInput  placeholder="e.g: abcdef@gmail.com" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}} value={email} onChangeText={setEmail}></TextInput>
          <Text style={{marginTop:15}}>Password:</Text>
          <TextInput  placeholder="********" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}} value={password} onChangeText={setPassword}></TextInput>
          <Text style={{marginTop:15}}>Confirm Password:</Text>
          <TextInput  placeholder="********" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}}></TextInput>
          <Text style={{marginTop:15}}>Phone Number:</Text>
          <TextInput value={phone} onChangeText={setPhone} placeholder="e.g: 0333-5558444" style={{marginTop:5, borderColor:"lightgrey", borderRadius:5, borderWidth:1, padding:3}}></TextInput>
          <Text style={{marginTop:15}}>Date of Birth:</Text>
          <TouchableOpacity style={{alignItems:"center", borderWidth:1, padding:5, borderRadius:5, borderColor:"lightgrey"}} onPress={showDatePicker}>
            <Text style={{fontSize:15}}>{selectedDate?selectedDate.toLocaleDateString():'Select Date'}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={{marginTop:15}}>Gender:</Text>

          <View style={{borderColor:"lightgrey", borderWidth:1, borderRadius:10}}>
          <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
            <RadioButton.Item mode='android' label="Male" labelStyle={{fontSize:13}} value="male" color='red' />
            <RadioButton.Item mode='android' label="Female" labelStyle={{fontSize:13}} value="female" color='red' />
            <RadioButton.Item mode='android' label="Custom" labelStyle={{fontSize:13}} value="custom" color='red' />
          </RadioButton.Group>
          </View>

          <Text style={{marginTop:15}}>Profile Picture:</Text>
          <TouchableOpacity style={{alignItems:"center", backgroundColor:"antiquewhite", padding:5, borderRadius:5, borderWidth:1, borderColor:"lightgrey", marginTop:5}}>
            <Text style={{fontSize:12}}>Upload Image</Text></TouchableOpacity> 
          <Button mode='contained' style={{marginTop:20, padding:5}} onPress={()=>registerUser()}>Sign Up</Button> 

          <Text style={{marginTop:30, textAlign:"center"}}>Already have an account?</Text>
          <Button mode='outlined' style={{marginTop:20, padding:5}} onPress={() => navigation.navigate("Login")}>Login</Button> 
        </ScrollView>

      </Animatable.View>
      
    </View>

  );


}

// import React , {useContext,useState} from 'react';
// import { Text, View, Alert, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import Feather from 'react-native-vector-icons/Feather'
// import {AuthContext} from '../navigation/AuthProvider'
// // import {auth} from '../Services'


// const SignUpScreen = ({navigation}) => {

    
//     const [email, setEmail] = useState();
//     const [name, setname] = useState();
//     const [password, setPassword] = useState();
//     const [confirmPassword, setConfirmPassword] = useState();
//     const [confirmPasswordchange, setConfirmPasswordchange] = useState(false);
//     const {register} = useContext(AuthContext);

    
  

//   const[data, setData] =useState({
//     email:'',
//     password:'',
//     name:'',
//     confirmPassword:'',
//     CheckTextChange:false,
//     secureTextEntry:true,
//     isValidUser: true,
//     isValidPassword: true,
//     MatchPassword:true,
//     passwordchange:false,
//   }
//   );

//   const PasswordChange= (val)=>{
//     setData({
//       ...data,
//       password:val
//     })
//   }
//   const nameChange= (val)=>{
//     setData({
//       ...data,
//       name:val
//     })
//   }
//   const ConfirmPasswordChange= (val)=>{
//     setData({
//       ...data,
//       confirmPassword:val,
//       passwordchange:true,
//     })
//   }
  
//   const UpdateSecureTextEntry=()=>{
//     setData({
//       ...data,
//       secureTextEntry: !data.secureTextEntry
//     })
//   }


//   const HandleValidPassword = val => {
//     if (val.trim().length >= 6) {
//       setData({
//         ...data,
//         password: val,
//         isValidPassword: true,
//       });
//     } else {
//       setData({
//         ...data,
//         password: val,
//         isValidPassword: false,
//       });
//     }
//   };

//   const HandleValidEmail = val => {
//     console.log(val);
//     let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
//     if (reg.test(val) === false) {
//       setData({
//         ...data,
//         email: val,
//         isValidUser: false,
//         CheckTextChange: false,
//       });
//     } else {
//       setData({
//         ...data,
//         email: val,
//         isValidUser: true,
//         CheckTextChange: true,
//       });
//     }
//   };


 

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Animatable.Image
//           animation="bounceIn"
//           source = {require('../assets/SignUplogo.png')}
//           style={styles.logo}
//           resizeMode="stretch"
//         />

//       </View>

//       <Animatable.View style={styles.footer} animation="fadeInUpBig">
//         <ScrollView>
          
//         <Text style={styles.text1}>Email</Text>
//         <View style={styles.awesomefont}>
//             <FontAwesome
//                 name='user-o'
//                 color='#FE2E2E80'
//                 size={20}
//                 />
//                 <TextInput
//                 placeholder="Email"
//                 style={styles.textinput}
//                 // value={email}
//                 // onChangeText={e=>setEmail(e)}
//                 onChangeText ={(val)=>{setEmail(val);HandleValidEmail(val)}}
                 
//                 />

// {data.CheckTextChange? (
//             <Animatable.View animation="bounceIn">
//             <Feather name="check-circle" color="green" size={20} />
//             </Animatable.View>
//           ) : null}
//         </View>
//         {data.isValidUser ? null : (
//           <Animatable.View animation="fadeInLeft" duration={500}>
//             <Text style={styles.error}>Enter a valid email</Text>
//           </Animatable.View>
//         )}
            
//             <Text style={styles.text2}>Password</Text>
//             <View style={styles.awesomefont}>
//             <FontAwesome
//                 name='lock'
//                 color='#FE2E2E60'
//                 size={20}
//                 />
//                 <TextInput
//                 placeholder="Password"
//                 style={styles.textinput}
//                 secureTextEntry={data.secureTextEntry?true:false}
//                 // value={password}
//                 // onChangeText={e=>setEmail(e)}
//                 onChangeText ={(val)=>{PasswordChange(val),setPassword(val),HandleValidPassword(val)}}
//                 />
//                 <TouchableOpacity
//                  onPress={UpdateSecureTextEntry}>
                
//                 {data.secureTextEntry ?
//                 <Feather
//                 name ='eye-off'
//                 color ='grey'
//                 size={20}/>

//                 :
                
//                 <Feather
//                 name ='eye'
//                 color ='grey'
//                 size={20}/>
//                 }

//                 </TouchableOpacity>
//             </View>
//             {data.isValidPassword ? null : (
//           <Animatable.View animation="fadeInLeft" duration={500}>
//             <Text style={styles.error}>
//               Weak Password (Must be 6 characters)
//             </Text>
//           </Animatable.View>
//         )}

//             <Text style={styles.text2}>Confirm password</Text>
//             <View style={styles.awesomefont}>
//             <FontAwesome
//                 name='lock'
//                 color='#FE2E2E60'
//                 size={20}
//                 />
//                 <TextInput
//                 placeholder="Password"
//                 style={styles.textinput}
//                 secureTextEntry={data.secureTextEntry?true:false}
//                 onChangeText ={(val)=>{ConfirmPasswordChange(val),setConfirmPassword(val), setConfirmPasswordchange(true)}}
//                 />
//                 <TouchableOpacity
//                  onPress={UpdateSecureTextEntry}>
                
//                 {data.secureTextEntry ?
//                 <Feather
//                 name ='eye-off'
//                 color ='grey'
//                 size={20}/>

//                 :
                
//                 <Feather
//                 name ='eye'
//                 color ='grey'
//                 size={20}/>
//                 }

//                 </TouchableOpacity>

//             </View>
        
//             {password!==confirmPassword && confirmPassword!==null?          (<Animatable.View animation="fadeInLeft" duration={500}>
//             <Text style={styles.error}>
//               Passwords not matched
//             </Text>
//           </Animatable.View>):null
// }


//         <TouchableOpacity style={styles.LogIn} onPress={()=>{Alert.alert('Scan2Shop','Registered successfully.',[{text:'Okay', onPress:()=>{navigation.navigate('login')}}])}}   onPressIn={() => {
//       register(email,name,password);
//     }}>
//           <Text style={styles.text1}>Sign up</Text>


//         </TouchableOpacity>
//         <Text style={styles.signup}>Already Registered?<Text onPress={()=>{navigation.navigate('login')}}> Login</Text></Text>
//     </ScrollView>
//     </Animatable.View>

//     </View>
//   );
// ;
//               }

// export default SignUpScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   header: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   footer: {
//     flex: 2,
//     backgroundColor: '#6E6E6E45',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingVertical: 50,
//     paddingHorizontal: 30,
//   },
//   text1: {
//       color:'white'
//   },

//   text2: {
//     color:'white',
//     marginTop:50
// },

//   awesomefont:{
//       marginTop:20,
//       flexDirection:'row'
//   },

//   textinput: {
//     color: '#CAC9CB',
//     height:35,
//     width:220,
//     backgroundColor:'#84848450',
//     marginLeft:20,
//     marginRight:20
    
//   },

//   logo: {
//     width: 450,
//     height: 480,
//     marginRight:35
//   },


//   LogIn: {
//     width: 100,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 50,
//     backgroundColor: '#FE2E2E80',
//     marginTop: 50,
//     marginLeft: 100,
//     flexDirection: 'row',
//   },

//   signup:{
//     fontSize:12,
//     color: '#CAC9CB',
//     marginTop:15,
//     marginLeft:80
//   },
//   error: {
//     marginTop: 5,
//     marginLeft: 37,
//     color: 'red',
//   },

// });