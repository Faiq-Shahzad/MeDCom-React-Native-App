import React, {useState, useEffect, useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "./AuthProvider";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import {AsyncStorage} from 'react-native';

const Routes = () => {

  const {user, setUser, setToken} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const _retrieveData = async () => {
    try {
      console.log("Reading from async storage")
      const value = await AsyncStorage.getItem('user');
      console.log("Value Reading from async storage", value)
      if (value !== null) {
        // We have data!!
        // console.log(value);
        const data = JSON.parse(value)
        setToken(data.user_token)
        setUser(data.user);
      }
    } catch (error) {
      // Error retrieving data
        console.log(error);

    }
  };


  useEffect(() => {
    _retrieveData()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    
  }, []);

  if (initializing) return null;

  return(
      <NavigationContainer>
        { user ? <AppStack/> : <AuthStack/>}
      </NavigationContainer>
  );
}

export default Routes;