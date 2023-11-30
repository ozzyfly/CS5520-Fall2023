import { View, Text, Button, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import { Ionicons } from "@expo/vector-icons";
import GoalUsers from "./GoalUsers";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebaseSetup";

export default function GoalDetails({ navigation, route }) {
  const [isWarned, setIsWarned] = useState(false);
  const [downalodURL, setDownloadURL] = useState("");
  useEffect(() => {
    async function getURL() {
      console.log(route.params.pressedGoal.imageRef);
      const imageUriRef = ref(storage, route.params.pressedGoal.imageRef);
      const url = await getDownloadURL(imageUriRef);
      setDownloadURL(url);
    }
    if (route.params.pressedGoal.imageRef) {
      getURL();
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            pressedFunction={() => {
              console.log("warning pressed");
              setIsWarned(true);
            }}
            defaultStyle={{ backgroundColor: "#bbb", padding: 5 }}
            pressedStyle={{ opacity: 0.6 }}
          >
            <Ionicons name="warning" size={24} color="black" />
          </PressableButton>
        );
      },
    });
  }, [navigation]);

  return (
    <View>
      {route.params ? (
        <Text>{route.params.pressedGoal.text}</Text>
      ) : (
        <Text>No extra data</Text>
      )}
      {isWarned && (
        <Button title=" More" onPress={() => navigation.push("Details")} />
      )}
      {downalodURL && (
        <Image source={{ uri: downalodURL }} style={styles.image} />
      )}
      <GoalUsers />
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
