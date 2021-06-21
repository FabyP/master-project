import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 4,
    marginBottom: 5,
    textTransform: "uppercase",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  lightText: {
    color: "rgb(134, 147, 158)",
    fontSize: 18,
    marginBottom: 25,
  },
});

const AuthTitle = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Corona Tracker</Text>
    <Text style={styles.lightText}>Mehr Sicherheit durch Daten!</Text>
  </View>
);

export default AuthTitle;
