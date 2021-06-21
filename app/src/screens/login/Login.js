import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../context/actions/authActions";
import { AuthTitle } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    width: '100%',
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default function LoginScreen({ navigation }) {
  const [userdata, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(userdata));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View>
        <AuthTitle />
        <Input
          placeholder="E-Mail"
          onChangeText={(text) => setUserData({ ...userdata, email: text })}
          value={userdata.email || ""}
          containerStyle={{ maxWidth: 400, minWidth: 300 }}
          autoCompleteType="off"
        />
        {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
        <Input
          placeholder="Passwort"
          onChangeText={(text) => setUserData({ ...userdata, password: text })}
          value={userdata.password || ""}
          secureTextEntry
          containerStyle={{ maxWidth: 400, minWidth: 300 }}
          autoCompleteType="off"
        />
        {errors.password && (
          <Text style={{ color: "red" }}>{errors.password}</Text>
        )}
      </View>
      <View style={styles.buttonRow}>
        <Button title="Login" type="submit" onPress={(e) => onLogin(e)} />
        <Button
          title="Registrierung"
          type="outline"
          onPress={() => navigation.navigate("Registrierung")}
        />
      </View>
    </SafeAreaView>
  );
}
