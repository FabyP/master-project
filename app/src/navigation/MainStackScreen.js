import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MainScreen from "../screens/main/Main";
import QRCodeScreen from "../screens/qrCode/QRCode";
import LocationScreen from "../screens/location/Location";

// Haupt-Navigation
const MainStack = createBottomTabNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "QR-Code") {
          iconName = "qr-code-outline";
        } else if (route.name === "GPS") {
          iconName = "locate-outline";
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <MainStack.Screen name="Home" component={MainScreen} />
    <MainStack.Screen name="QR-Code" component={QRCodeScreen} />
    <MainStack.Screen name="GPS" component={LocationScreen} />
  </MainStack.Navigator>
);

export default MainStackScreen;
