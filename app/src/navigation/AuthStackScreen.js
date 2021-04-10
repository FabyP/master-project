import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/login/Login";
import RegisterScreen from "../screens/register/Register";

// Navigation für die Authentifizierung (Login, Registrierung)
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Registrierung" component={RegisterScreen} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
