import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import React from "react";
import SignUpForm from "../Components/signupScreen/SignUpForm";


import Helper from "../Components/Helper/Helper";

const T_LOGO ="https://img.icons8.com/nolan/96/t-key.png"
const INSTA_LOGO =
  "https://img.icons8.com/nolan/512/instagram-new.png";

const SignUpScreen = ({navigation}) => (
    <SafeAreaView
      style={
        Platform.OS === "android" ? Helper.AndroidSafeArea : styles.container
      }
    >
     
      <View style={styles.logoContainer}>
        <Image source={{ uri: T_LOGO, height: 100, width: 100,}} />
      </View>

      <SignUpForm navigation={navigation}/> 
    </SafeAreaView>
  );

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default SignUpScreen;
