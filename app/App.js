import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RootStackScreen from "./src/navigation/RootStackScreen";

import store from "./src/context/store/store";
import { setCurrentUser, logoutUser } from "./src/context/actions/authActions";

export default function App() {
  useEffect(() => {
    async function getToken() {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        if (token !== null) {
          console.log(jwt_decode(token));
          const decoded = jwt_decode(token);
          store.dispatch(setCurrentUser(decoded));
          const currentTime = Date.now() / 1000;
          if (decoded.exp < currentTime) {
            store.dispatch(logoutUser());
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    getToken();
  }, []);

  return (
    // Provider -> Connects React and Redux
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
}
