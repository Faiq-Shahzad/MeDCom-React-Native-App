import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DoctorDetails from '../screens/DoctorDetails';
import BookAppointment from '../screens/BookAppointment';

const Stack = createNativeStackNavigator();

const TabStackNavigator = () => {

  

  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default TabStackNavigator;