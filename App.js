import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalDetails from "./components/GoalDetails";
import PressableButton from "./components/PressableButton";
import { Ionicons } from "@expo/vector-icons";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseSetup";
import Profile from "./components/Profile";
import Map from "./components/Map";

const Stack = createNativeStackNavigator();
const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);

const AppStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => {
        return {
          headerTitle: "All My Goals",
          headerRight: () => {
            return (
              <PressableButton
                pressedFunction={() => {
                  console.log("profile pressed");
                  navigation.navigate("Profile");
                }}
                defaultStyle={{ backgroundColor: "#bbb", padding: 5 }}
                pressedStyle={{ opacity: 0.6 }}
              >
                <Ionicons name="person" size={24} color="black" />
              </PressableButton>
            );
          },
        };
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerRight: () => {
          return (
            <PressableButton
              pressedFunction={() => {
                console.log("logout pressed");
                try {
                  signOut(auth);
                } catch (err) {
                  console.log("singout err", err);
                }
              }}
              defaultStyle={{ backgroundColor: "#bbb", padding: 5 }}
              pressedStyle={{ opacity: 0.6 }}
            >
              <Ionicons name="exit" size={24} color="black" />
            </PressableButton>
          );
        },
      }}
    />
    <Stack.Screen
      name="Details"
      component={GoalDetails}
      options={
        ({ route }) => {
          return {
            title: route.params ? route.params.pressedGoal.text : "Details",
          };
        }
        //pass a function that receives route prop as argument
        //use route prop to extrat goal text and set it on title
      }
    />
    <Stack.Screen name="Map" component={Map} />
  </>
);
export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        // a valid user is logged in
        setIsUserLoggedIn(true);
      } else {
        //before authentication or after logout
        setIsUserLoggedIn(false);
      }
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#b8a" },
          headerTintColor: "white",
        }}
        initialRouteName="Signup"
      >
        {isUserLoggedIn ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
