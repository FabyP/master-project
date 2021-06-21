import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button  } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });

function QRCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  //Permissions for Camera
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code mit Typ ${type} und URL ${data} wurde gescannt`);
    // validate Barcode
    // start session 
  };

  if (hasPermission === null) {
    return <Text>Bitte um Kameraerlaubnis</Text>;
  }
  if (hasPermission === false) {
    return <Text>Keine Erlaubnis für Kamera</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>QRCode!</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'erneut scannen'} onPress={() => setScanned(false)} />}
    </View>
  );
}

export default QRCode;
