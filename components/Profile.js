import { View, Text } from "react-native";
import React from "react";
import { auth } from "../firebase/firebaseSetup";
import LocationManager from "./LocationManager";

export default function Profile() {
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
      <Text>{auth.currentUser.uid}</Text>
      <LocationManager />
    </View>
  );
}
