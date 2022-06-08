import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";


import Helper from "../Components/Helper/Helper";



const LoginScreen = () => (
    <SafeAreaView
      style={
        Platform.OS === "android" ? Helper.AndroidSafeArea : styles.container
      }
    >
     
      <View style={styles.logoContainer}>
        <Text style={{color: "white"}}>SCREENIT IN</Text>
      </View>

    </SafeAreaView>
  );

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#262a34",
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
