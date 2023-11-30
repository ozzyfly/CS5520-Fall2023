import { View, Image, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImageManager({ passImageUri }) {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const [imageUri, setImageUri] = useState("");
  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };
  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give access to the camera");
      }
      //   if hasPermission, launch the camera

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      console.log(result);
      setImageUri(result.assets[0].uri);
      passImageUri(result.assets[0].uri);
    } catch (err) {
      console.log("take image error ", err);
    }
  };

  return (
    <View>
      <Button onPress={takeImageHandler} title="Take an Image" />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
