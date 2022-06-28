import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import React from "react";

import LoginForm from "../Components/loginScreen/LoginForm";

import Helper from "../Components/Helper/Helper";

const INSTA_LOGO =
  "https://img.icons8.com/nolan/512/instagram-new.png";
  const T_LOGO ="https://img.icons8.com/nolan/96/t-key.png"

const LoginScreen = ({navigation}) => (
    <SafeAreaView
      style={
        Platform.OS === "android" ? Helper.AndroidSafeArea : styles.container
      }
    >
     
      <View style={styles.logoContainer}>
        <Image source={{ uri: T_LOGO, height: 100, width: 100,}} />
      </View>

      <LoginForm navigation={navigation}/>
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

export default LoginScreen;
