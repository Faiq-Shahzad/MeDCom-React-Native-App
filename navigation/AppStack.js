import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DoctorHome from '../components/doctorhome.js';
import MakeAppointment from '../screens/MakeAppointments.js';
import HandleAppointments from '../components/HandleAppointment';
import PatientTabMavigation from './PatientTabNavigation.js';
import CustomHeader from '../components/CustomHeader.js';
import DoctorDetails from '../screens/DoctorDetails.js';
import BookAppointment from '../screens/BookAppointment.js';
import Faqs from '../screens/Faqs.js';
import ChangePassword from '../screens/ChangePassword.js';
import AppointmentReviews from '../screens/AppointmentReviews.js';

const Stack = createNativeStackNavigator();

const AppStack = () => {
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
      <Stack.Screen name="Handle Appointment" component={HandleAppointments} />
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
    </Stack.Navigator>
  );
};

export default AppStack;
