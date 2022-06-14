import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import NewPostScreen from "./NewPostScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import LandingScreen from "./LandingScreen";

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const SignedInStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LandingScreen"
      screenOptions={screenOptions}
    >
     
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);


export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

