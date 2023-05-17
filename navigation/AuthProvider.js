import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  // const backendUrl = 'http://192.168.171.31:3000/';
  const backendUrl = 'http://192.168.1.111:3000/';
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const DummyAvatar =
    'https://firebasestorage.googleapis.com/v0/b/medcom-e961c.appspot.com/o/avatar.png?alt=media&token=f6a81a27-c82c-4f22-9ba4-ca8ead95cb5a';

  useEffect(() => {
    AsyncStorage.getItem('user').then(value => {
      if (value) {
        setUser(JSON.parse(value));
      }
    });
    AsyncStorage.getItem('token').then(value => {
      if (value) {
        setToken(JSON.parse(value));
      }
    });
    AsyncStorage.getItem('doctor').then(value => {
      if (value) {
        setDoctor(JSON.parse(value));
      }
    });
    AsyncStorage.getItem('appointment').then(value => {
      if (value) {
        setAppointment(JSON.parse(value));
      }
    });
    AsyncStorage.getItem('selectedCat').then(value => {
      if (value) {
        setSelectedCat(JSON.parse(value));
      }
    });
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    } else {
      AsyncStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (!token) {
      return;
    } else {
      AsyncStorage.setItem('token', JSON.stringify(token));
    }
  }, [token]);

  useEffect(() => {
    if (!doctor) {
      return;
    } else {
      AsyncStorage.setItem('doctor', JSON.stringify(doctor));
    }
  }, [doctor]);

  useEffect(() => {
    if (!appointment) {
      return;
    } else {
      AsyncStorage.setItem('appointment', JSON.stringify(appointment));
    }
  }, [appointment]);

  useEffect(() => {
    if (!selectedCat) {
      return;
    } else {
      AsyncStorage.setItem('selectedCat', JSON.stringify(selectedCat));
    }
  }, [selectedCat]);

  return (
    <AuthContext.Provider
      value={{
        user,
        DummyAvatar,
        setUser,
        setDoctor,
        doctor,
        appointment,
        setAppointment,
        token,
        setToken,
        backendUrl,
        selectedCat,
        setSelectedCat,
        login: async (cnic, password) => {
          try {
            // await auth().signInWithEmailAndPassword(email, password);
            const response = await axios.post(backendUrl + 'auth/login', {
              cnic: cnic,
              password: password,
            });
            // console.log('abcd1', response.data);
            const user = response.data.user;
            console.log('abcd');
            // const user = {email:"faiq@gmail.com", identifier:"1234", role:"patient", verified:true}
            const user_token = response.data.token;
            // const user_token = "abcd";
            try {
              await AsyncStorage.setItem(
                'user',
                JSON.stringify({user, user_token}),
              );
            } catch (error) {
              // Error saving data
            }

            setToken(user_token);
            setUser(user);
          } catch (e) {
            console.log(e.response.data);
            alert(e.response.data.message);
          }
        },
        register: async (
          email,
          password,
          fname,
          lname,
          cnic,
          bloodGroup,
          dob,
          gender,
          nextOfKin,
          phone,
          emergencyContact,
          profile,
        ) => {
          try {
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
            formdata.append('name', fname + ' ' + lname);
            formdata.append('contact', phone);
            formdata.append('bloodGroup', bloodGroup);
            formdata.append('dob', dob.toLocaleDateString());
            formdata.append('gender', gender);
            formdata.append('nextOfKin', nextOfKin);
            formdata.append('emergencyContact', emergencyContact);
            formdata.append('profile', profile);
            console.log('formdata ', formdata);
            const response = await axios.post(
              backendUrl + 'auth/registerPatient',
              formdata,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
            console.log(response.data);
            Alert.alert(
              'Success',
              'Account created successfully, Verify your email to login',
            );
          } catch (error) {
            console.log('Something went wrong with added user ', error);
            console.log('eror', error.data);
          }
        },
        logout: async () => {
          try {
            // await auth().signOut();
            await AsyncStorage.removeItem('user');
            setUser(null);
            setToken(null);
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
