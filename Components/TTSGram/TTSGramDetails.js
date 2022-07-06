import { View, Text, StyleSheet, Image } from "react-native";

import React from "react";
import { TouchableOpacity } from "react-native";

import * as Linking from "expo-linking";
import {
  GITHUB_LOGO,
  INSTA_LOGO,
  LINKEDIN_LOGO,
  SKYPE_LOGO,
  TWITTER_LOGO,
  MAIL,
  FACEBOOK,
} from "../Helper/Helper";

const TTSGramDetails = ({ navigation }) => {
  const handleonTwitterPress = () => {
    Linking.openURL("https://twitter.com/truetechsoluti2");
  };
  const handleonFacebookPress = () => {
    Linking.openURL(
      "https://www.facebook.com/TrueTech-Solutions-185637474867633/"
    );
  };
  const handleonInstagramPress = () => {
    Linking.openURL("https://www.instagram.com/truetech_solutions/");
  };
  const handleonLinkedInPress = () => {
    Linking.openURL(
      "https://in.linkedin.com/company/truetech-staffing-experts"
    );
  };
  return (
    <View>
      <View style={styles.container}>
        <Header navigation={navigation} />
      </View>
      <View style={styles.logoContainer}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL("http://www.truetechsolutions.in/");
          }}
        >
          <Image
            style={{ height: 130, width: 100 }}
            source={require("../../assets/truetech_logo.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: "#fff", padding: 10, fontSize: 15 }}>
          {" "}
          This is a social networking platform to connect all TrueTech
          employees. Click on the logo to redirect to our website to know more
          about TrueTech. Thankyou for loging into this platform to connect with
          others.We always need your feedback and response so that we could
          improve ourselves.
        </Text>
      </View>

      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Image
          style={styles.icon}
          source={{ uri: "https://img.icons8.com/nolan/512/share-2.png" }}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ color: "#FFF" }}>CONNECT WITH US</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity onPress={handleonFacebookPress}>
          <View>
            <Image
              source={{
                uri: FACEBOOK,
              }}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleonLinkedInPress}>
          <View>
            <Image
              source={{
                uri: LINKEDIN_LOGO,
              }}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleonInstagramPress}>
          <View>
            <Image
              source={{
                uri: INSTA_LOGO,
              }}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleonTwitterPress}>
          <View>
            <Image
              source={{
                uri: TWITTER_LOGO,
              }}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity
      onPress={() => {
        navigation != null ? navigation.goBack() : null;
      }}
    >
      <Image
        source={{
          uri: "https://img.icons8.com/ios-filled/100/ffffff/back.png",
        }}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Image style={styles.logo} source={require("../../assets/ttsgram_logo.png")} />
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 25,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default TTSGramDetails;
