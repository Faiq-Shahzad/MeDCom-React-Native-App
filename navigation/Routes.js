import React, {useState, useEffect, useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "./AuthProvider";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import DoctorStack from "./DoctorStack"
const Routes = () => {

  const {user, setUser} = useContext(AuthContext);
  const {doctor_id} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return(
      <NavigationContainer>
        { doctor_id !== "" ? <DoctorStack/> : (user ? <AppStack/> : <AuthStack/>)}
        
      </NavigationContainer>
  );
}

export default Routes;