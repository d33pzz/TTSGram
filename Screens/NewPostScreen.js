import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Helper from "../Components/Helper/Helper";
import AddNewPost from "../Components/newPost/AddNewPost";

const NewPostScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={
        Platform.OS === "android"
          ? Helper.AndroidSafeArea
          : styles.globalSafeAreaView
      }
    >
      <AddNewPost navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  globalSafeAreaView: {
    backgroundColor: "#000037",
    flex: 1,
  },
});

export default NewPostScreen;
