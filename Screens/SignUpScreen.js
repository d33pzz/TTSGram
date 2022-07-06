import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import SignUpForm from "../Components/signupScreen/SignUpForm";

import Helper from "../Components/Helper/Helper";

const T_LOGO = "https://img.icons8.com/nolan/96/t-key.png";
const INSTA_LOGO = "https://img.icons8.com/nolan/512/instagram-new.png";

const SignUpScreen = ({ navigation }) => (
  <SafeAreaView
    style={
      Platform.OS === "android" ? Helper.AndroidSafeArea : styles.container
    }
  >
    <ScrollView style={{ flexGrow: 1 }}>
      <View style={styles.logoContainer}>
        <Image
          style={{ height: 130, width: 100 }}
          source={require("../assets/truetech_logo.png")}
        />
        {/* <Image source={{ uri: T_LOGO, height: 100, width: 100,}} /> */}
      </View>

      <SignUpForm navigation={navigation} />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000037",
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
