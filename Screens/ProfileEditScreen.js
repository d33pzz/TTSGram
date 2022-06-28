import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Helper from "../Components/Helper/Helper"
import UpdateProfile from "../Components/profileEditScreen/UpdateProfile";


const ProfileEditScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={
        Platform.OS === "android"
          ? Helper.AndroidSafeArea
          : styles.globalSafeAreaView
      }
    >
      <UpdateProfile navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  globalSafeAreaView: {
    backgroundColor: "black",
    flex: 1,
  },
});

export default ProfileEditScreen;
