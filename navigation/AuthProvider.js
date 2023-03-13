import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import axios from "axios";
import { Alert } from "react-native";

export const AuthContext = createContext(); 

export const AuthProvider = ({children}) =>{
    // const backendUrl = 'http://192.168.171.31:3000/';
    const backendUrl = 'http://192.168.137.26:3000/';
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const DummyAvatar = "https://firebasestorage.googleapis.com/v0/b/medcom-e961c.appspot.com/o/avatar.png?alt=media&token=f6a81a27-c82c-4f22-9ba4-ca8ead95cb5a"

    return (
        <AuthContext.Provider
            value={{
                user,
                DummyAvatar,
                setUser,
                token,
                setToken,
                backendUrl,
                login: async (cnic, password) =>{
                    try{
                        // await auth().signInWithEmailAndPassword(email, password);
                        // const response = await axios.post(backendUrl + 'auth/login', {
                        //     cnic: cnic,
                        //     password: password
                        // });
                        // const user = response.data.user;
                        const user = {email:"faiq@gmail.com", identifier:"1234", role:"patient", verified:true}
                        // const user_token = response.data.token;
                        const user_token = "abcd";
                        setToken(user_token);
                        setUser(user);
                    } catch(e){
                        console.log(e.response.data);
                        alert(e.response.data.message);

                    }
                },
                register: async (email, password, fname, lname, cnic, bloodGroup, dob, gender, nextOfKin, phone, emergencyContact, profile) =>{
                    try{
                        // await auth().createUserWithEmailAndPassword(email, password).then(()=>{
                        //     firestore().collection('users').doc(auth().currentUser.uid)
                        //     .set({
                        //         fname: fname,
                        //         lname: lname,
                        //         email: email,
                        //         phone: phone,
                        //         gender: gender,
                        //         dob: dob,
                        //         createdAt: firestore.Timestamp.fromDate(new Date()),
                        //         userImg: userImg?userImg:DummyAvatar,
                        //     }).catch(error => {
                        //         console.log('Something went wrong with added user to firestore: ', error);
                                
                        //     })
                        // {
                            // email: email,
                            // password: password,
                            // cnic: cnic,
                            // name: fname+" "+lname,
                            // contact: phone,
                            // bloodGroup: bloodGroup,
                            // nextOfKin: nextOfKin,
                            // emergencyContact: emergencyContact,
                            // }
                        let formdata = new FormData();
                        formdata.append('email', email);
                        formdata.append('password', password);
                        formdata.append('cnic', cnic);
                        formdata.append('name', fname+" "+lname);
                        formdata.append('contact', phone);
                        formdata.append('bloodGroup', bloodGroup);
                        formdata.append('dob', dob.toLocaleDateString());
                        formdata.append('gender', gender);
                        formdata.append('nextOfKin', nextOfKin);
                        formdata.append('emergencyContact', emergencyContact);
                        formdata.append('profile', profile);
                        console.log("formdata ",formdata)
                        const response  = await axios.post(backendUrl+'auth/registerPatient', formdata, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                                }
                                });
                        console.log(response.data);
                        Alert.alert("Success", "Account created successfully, Verify your email to login");
                        }
                    catch(error) {
                        console.log('Something went wrong with added user ', error);
                        console.log('eror', error.data);

                        
                    };
                },
                logout: async () =>{
                    try{
                        // await auth().signOut();
                        setUser(null);
                        setToken(null);
                    } catch(e){
                        console.log(e);
                    }
                },
            }}
            > 
            {children}
        </AuthContext.Provider>
    );
}