import React, {useEffect, useContext, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorHome from '../components/doctorhome.js';
import MakeAppointment from '../screens/MakeAppointments.js';
import HandleAppointments from '../components/HandleAppointment';
import PatientTabMavigation from './PatientTabNavigation.js';
import DoctorDetails from '../screens/DoctorDetails.js';
import LabAppointment from '../screens/LabAppointment.js';
import BookAppointment from '../screens/BookAppointment.js';
import Faqs from '../screens/Faqs.js';
import ChangePassword from '../screens/ChangePassword.js';
import AppointmentReviews from '../screens/AppointmentReviews.js';
import HandleLabAppointment from '../components/HandleLabAppointment.js';
import AppointmentLabReviews from '../screens/AppointmentLabReview.js';
import EventSource from 'react-native-sse';
import {AuthContext} from './AuthProvider.js';
import {useToast} from 'react-native-toast-notifications';
import Notifications from '../screens/Notifications.js';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const {eventUrl, user, eventData, setEventData} = useContext(AuthContext);
  const toast = useToast();

  let source;
  const sourceUrl = `${eventUrl}events`;
  console.log('sourceUrl is ', sourceUrl);

  const handleEventData = msg => {
    console.log('GOT EVENT DATA', msg);

    console.log('Got MSG DAta', msg.data);
    const abc = msg.data;
    const abcd = JSON.parse(msg.data);
    // toast.show(abcd.eventType)

    if (abcd.eventType == "Patient.Requested") {
      console.log("Requested Access")
      toast.show(abcd.emitter + ' has Requested Access');
    } else if (abcd.eventType == 'MedicalRecord.Created') {
      toast.show(abcd.emitter + ' has created your Medical Record');
    } else if (abcd.eventType == 'LabRecord.Created') {
      toast.show(abcd.emitter + ' has created your Lab Record');
    } else if (abcd.eventType == 'Appointment.Updated') {
      toast.show(abcd.emitter + ' has approved your Appointment');
    } else if (abcd.eventType == 'LabAppointment.Updated') {
      toast.show(abcd.emitter + ' has approved your Lab Appointment');
    }

    console.log('abcd is ', abcd.entity);

    console.log('abc is', abc.entity);
    console.log('JSON: ', abcd.entity);

    console.log('Event Data', eventData);
    const eventArr = [...eventData];

    setEventData(eventData => [...eventData, abcd]);

    console.log('Arr', eventArr);
    eventArr.push(abcd);
    console.log('JOSON ARR ', eventArr);
    // setEventData(eventArr);
    console.log('SetEventData', eventArr);
    // toast.show("Hello World");
  };

  useEffect(() => {
    source = new EventSource(sourceUrl);
    source.onmessage = e => console.log(JSON.parse(e.data));
    console.log(source);
    console.log('APPSTACK USER IS', user);

    // if (!data) {
    //   const a = JSON.parse(localStorage.getItem("data"));
    //   if (a?.cnic) {
    //     console.log(a);
    //     console.log("notification-" + a?.cnic);
    source.addEventListener('notification-' + user?.identifier, message => {
      handleEventData(message);
    });
    //     setListeningEvent(true);
    //   }
    // }

    source.addEventListener('retry', message => {
      console.log('Retry', message);
    });

    const reconnectSSE = async () => {
      await new Promise(resolve => setTimeout(resolve, 30000));
      console.log('Reconnecting ...');
      source = new EventSource(sourceUrl);
    };

    source.onerror = e => {
      if (source.readyState == 2 || source.readyState == 0) {
        reconnectSSE();
      }
    };
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Patient Home"
        component={PatientTabMavigation}
        options={{
          // headerTitle: () => <CustomHeader name="MedCom" />,
          // headerStyle: { backgroundColor: '#555DF2'},
          // headerTintColor: "white",
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Doctor Home"
        component={DoctorHome}
        options={{title: 'DOCTOR'}}
      />
      <Stack.Screen name="Make Appointment" component={MakeAppointment} />
      <Stack.Screen
        name="Book Appointment"
        component={BookAppointment}
        options={{
          title: 'Book Appointment',
          headerStyle: {
            backgroundColor: '#555DF2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Handle Appointment"
        component={HandleAppointments}
        options={{
          title: 'Medical Record',
          headerStyle: {
            backgroundColor: '#555DF2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Handle Lab Appointment"
        component={HandleLabAppointment}
        options={{
          title: 'Lab Record',
          headerStyle: {
            backgroundColor: '#555DF2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Doctor Details"
        component={DoctorDetails}
        options={{
          title: 'Doctor Details',
          headerStyle: {
            backgroundColor: '#555DF2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="FAQs"
        component={Faqs}
        options={{
          title: 'FAQs',
          headerStyle: {
            backgroundColor: '#555DF2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Change Password"
        component={ChangePassword}
        options={{
          title: 'Change Password',
          headerStyle: {
            backgroundColor: '#555DF2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Reviews"
        component={AppointmentReviews}
        options={{
          title: 'Write a Review',
          headerStyle: {
            backgroundColor: '#555DF2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Lab Reviews"
        component={AppointmentLabReviews}
        options={{
          title: 'Write a Review',
          headerStyle: {
            backgroundColor: '#555DF2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Medical Access"
        component={SearchDoctors}
        options={{
          title: 'Medical Access',
          headerStyle: {
            backgroundColor: '#555DF2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: '#555DF2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Lab Appointment"
        component={LabAppointment}
        options={{
          title: 'Lab Appointment',
          headerStyle: {
            backgroundColor: '#555DF2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
