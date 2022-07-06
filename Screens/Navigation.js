import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import NewPostScreen from "./NewPostScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import LandingScreen from "./LandingScreen";
import ProfileScreen from "./ProfileScreen";
import ProfileEditScreen from "./ProfileEditScreen";
import SearchScreen from "./SearchScreen";
import UserDetailsScreen from "./UserDetailsScreen";
import TTSGramScreen from "./TTSGramScreen";
import AddNewPost from "../Components/newPost/AddNewPost";
import AddPostScreen from "./AddPostScreen";

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
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UpdateProfileScreen" component={ProfileEditScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} /> 
      <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
      <Stack.Screen name="TTSGramScreen" component={TTSGramScreen} />
      <Stack.Screen name="AddPostScreen" component={AddPostScreen} />
      
      
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

