import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Platform,
} from "react-native";
import React from "react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Header({ appName }) {
  const { width, height } = useWindowDimensions();
  const dynamicFontStyle = width < 400 ? 20 : 25;
  return (
    <View>
      <Text style={[styles.header, { fontSize: dynamicFontStyle }]}>
        Welcome to {appName}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    color: "darkslateblue",
    borderColor: "darkslateblue",
    borderWidth: Platform.os === "ios" ? 0 : 3,
    fontSize: windowWidth < 400 ? 20 : 25,
    fontWeight: "bold",
    padding: 5,
  },
});
