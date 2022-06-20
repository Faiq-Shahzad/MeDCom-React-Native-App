import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";

const Routes = () => {
  return(
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
  );
}