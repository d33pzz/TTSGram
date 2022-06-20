import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import React from "react";


import Helper from "../Components/Helper/Helper";
import ProfilePage from "../Components/profilePage/ProfilePage";


const ProfileScreen = ({navigation}) => (
    <SafeAreaView
      style={
        Platform.OS === "android" ? Helper.AndroidSafeArea : styles.container
      }
    >
      <ProfilePage navigation={navigation}/>
    
    </SafeAreaView>
  );

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
});

export default ProfileScreen;
