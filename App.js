import React from 'react';
import Providers from './navigation';
import {ToastProvider} from 'react-native-toast-notifications';

function App() {
  return (
    <ToastProvider placement="top" animationType="slide-in" normalColor="white" textStyle={{color:'black'}} swipeEnabled={true}>
      <Providers />
    </ToastProvider>
  );
}

export default App;
