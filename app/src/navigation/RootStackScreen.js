import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import AuthStackScreen from "./AuthStackScreen";
import MainScreen from "../screens/main/Main";

// Hauptnavigation (Jenachdem ob eingeloggt oder nicht, wird Auth. oder MainScreen angezeigt)
const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const isSignedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <RootStack.Navigator headerMode="none">
      {isSignedIn ? (
        <RootStack.Screen
          name="App"
          component={MainScreen}
          options={{ animationEnabled: false }}
        />
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{ animationEnabled: false }}
        />
      )}
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
