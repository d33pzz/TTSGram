import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Helper from "../Components/Helper/Helper";
import NewPostPage from "../Components/newPost/NewPostPage";

const AddPostScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={
        Platform.OS === "android"
          ? Helper.AndroidSafeArea
          : styles.globalSafeAreaView
      }
    >
      <NewPostPage navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  globalSafeAreaView: {
    backgroundColor: "#000037",
    flex: 1,
  },
});

export default AddPostScreen;
