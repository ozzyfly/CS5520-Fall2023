import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Map({ navigation, route }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  function confirmLocationHandler() {
    navigation.navigate("Profile", { selectedCoord: selectedLocation });
  }
  return (
    <>
      <MapView
        initialRegion={{
          latitude: route.params.initialLocation
            ? route.params.initialLocation.latitude
            : 37.78825,
          longitude: route.params.initialLocation
            ? route.params.initialLocation.longitude
            : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ flex: 1 }}
        onPress={(e) => {
          setSelectedLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>
      <Button
        disabled={!selectedLocation}
        title="Confirm Selected Location"
        onPress={confirmLocationHandler}
      />
    </>
  );
}
