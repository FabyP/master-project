import React from "react";
import { View, Text, StatusBar } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";

import { logoutUser } from "../../context/actions/authActions";

export default function MainScreen({ navigation }) {
  const dispatch = useDispatch();

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text>Main</Text>
        <Button title="Logout" type="outline" onPress={(e) => onLogout(e)} />
      </View>
    </SafeAreaView>
  );
}
