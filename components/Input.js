import {
  Button,
  Modal,
  StyleSheet,
  Image,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../colors";
import ImageManager from "./ImageManager";

// receive the modalIsvisible prop
const Input = ({ changedHandler, modalVisiblity, hideModal }) => {
  const [enteredText, setEnteredText] = useState("");
  const [takenImageUri, setTakenImageUri] = useState("");
  //update this callback function to receive the changed text and store it in text state variable
  function changeTextHandler(changedText) {
    setEnteredText(changedText);
  }

  function cancelHandler() {
    hideModal();
  }
  function confirmHandler() {
    // call a function that is passed to me from App.js and pass the enteredText via it
    changedHandler({ text: enteredText, uri: takenImageUri });
    //clear the textinput
    setEnteredText("");
  }
  function passImageUri(uri) {
    // store the uri in a state variable
    setTakenImageUri(uri);
  }

  return (
    // use the new peop to show the modal
    <Modal visible={modalVisiblity}>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png",
          }}
          style={styles.image}
        />
        <Image source={require("../assets/goal.png")} style={styles.image} />

        <TextInput
          style={styles.input}
          onChangeText={changeTextHandler}
          value={enteredText}
        />
        <ImageManager passImageUri={passImageUri} />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button color="red" title="Cancel" onPress={cancelHandler} />
          </View>
          <View style={styles.button}>
            <Button
              disabled={!enteredText}
              title="Confirm"
              onPress={confirmHandler}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "purple",
    borderBottomWidth: 2,
    width: 200,
  },
  container: {
    flex: 1,
    backgroundColor: colors.mdoal,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  buttonContainer: { flexDirection: "row", marginTop: 15 },
  button: {
    marginHorizontal: 10,
    width: "30%",
  },
});
