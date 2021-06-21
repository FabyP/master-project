import React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../context/actions/authActions";
import { AuthTitle } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});

function RegisterScreen({ navigation }) {
  const [userdata, setUserData] = React.useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);

  const onRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(userdata, navigation));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View>
        <AuthTitle />
        <Input
          placeholder="Benutzername"
          onChangeText={(text) => setUserData({ ...userdata, name: text })}
          value={userdata.name || ""}
          containerStyle={{ maxWidth: 400, minWidth: 300 }}
          autoCompleteType="off"
        />
        {errors.name && <Text style={{ color: "red" }}>{errors.name}</Text>}
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
        <Input
          placeholder="Passwort wiederholen"
          onChangeText={(text) => setUserData({ ...userdata, password2: text })}
          value={userdata.password2 || ""}
          secureTextEntry
          containerStyle={{ maxWidth: 400, minWidth: 300 }}
          autoCompleteType="off"
        />
        {errors.password2 && (
          <Text style={{ color: "red" }}>{errors.password2}</Text>
        )}
        <Button
          title="Registrieren"
          type="submit"
          onPress={(e) => onRegister(e)}
        />
      </View>
    </SafeAreaView>
  );
}

export default RegisterScreen;
