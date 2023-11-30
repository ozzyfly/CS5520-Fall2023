import { View, Button, StyleSheet, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MAPS_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

export default function LocationManager() {
  const navigation = useNavigation();
  const route = useRoute();

  const [status, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (route.params) {
      // I have come from interactive map
      setLocation(route.params.selectedCoord);
    }
  }, [route]);

  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };
  async function locateMeHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give access to the location");
      }
      const locationObject = await Location.getCurrentPositionAsync();

      setLocation({
        latitude: locationObject.coords.latitude,
        longitude: locationObject.coords.longitude,
      });
    } catch (err) {
      console.log("locate user ", err);
    }
  }
  const chooseLocationHandler = () => {
    navigation.navigate("Map");
  };
  return (
    <View>
      <Button title="Locate Me!" onPress={locateMeHandler} />
      <Button
        title="Let me choose on the map"
        onPress={chooseLocationHandler}
      />
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${MAPS_API_KEY}`,
          }}
          style={styles.image}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: 300,
  },
});
