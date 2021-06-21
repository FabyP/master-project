import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";
import { useSelector } from "react-redux";
import { LocationGeofencingEventType } from "expo-location";

/* import {configureBgTasks} from "./locationTask"; */
import { GET_LOCATION } from "../../context/actions/types";
import store from "../../context/store/store";

const LOCATION_TRACKING = "location-tracking";
const GEOFENCING = "geofencing";

function LocationScreen() {
  const [backgroundTracking, setBackgroundTraking] = useState(false);
  const location = useSelector((state) => state.location);

  let region = {
    identifier: "test",
    latitude: 50.6986613,
    longitude: 8.2956575,
    radius: 5,
    notifyOnEnter: true,
    notifyOnExit: true,
  };

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 0,
    });
    await Location.startGeofencingAsync(GEOFENCING, [region]);
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    setBackgroundTraking(hasStarted);
    console.log("tracking started?", hasStarted);
  };

  const stopLocationTracking = async () => {
    Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
    Location.stopGeofencingAsync(GEOFENCING);
    setBackgroundTraking(false);
  };

  useEffect(() => {
    const config = async () => {
      let res = await Permissions.askAsync(Permissions.LOCATION);
      if (res.status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        console.log("Permission to access location granted");
      }
    };

    config();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {backgroundTracking ? (
        <Button title="Stop tracking" onPress={stopLocationTracking} />
      ) : (
        <Button title="Start tracking" onPress={startLocationTracking} />
      )}
      <Text>{JSON.stringify(location)}</Text>
    </View>
  );
}

export default LocationScreen;

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);

    store.dispatch({ type: GET_LOCATION, payload: locations });
  }
});

TaskManager.defineTask(GEOFENCING, ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    console.log("GEOFENCING task ERROR:", error);
    return;
  }
  if (eventType === LocationGeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === LocationGeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});
