import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  GITHUB_LOGO,
  INSTA_LOGO,
  LINKEDIN_LOGO,
  SKYPE_LOGO,
  SNAPCHAT_LOGO,
  TWITTER_LOGO,
  WHATSAPP_LOGO,
  PHONE,
  MAIL,
} from "../Helper/Helper";

import * as Linking from "expo-linking";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const UserDetailsForm = ({ navigation, user }) => (
  <View style={styles.container}>
    <Main navigation={navigation} user={user} />
  </View>
);

const Main = ({ navigation, user }) => {
  const handleonWhatsappPress = () => {
    user.whatsapp ? Linking.openURL("https://wa.me/+91" + user.whatsapp) : null;
  };
  const handleonLinkedinPress = () => {
    user.linkedin
      ? Linking.openURL("https://in.linkedin.com/" + user.linkedin)
      : null;
  };
  const handleonInstaPress = () => {
    user.instagram
      ? Linking.openURL("https://www.instagram.com/" + user.instagram)
      : null;
  };
  const handleonSnapPress = () => {
    user.snapchat
      ? Linking.openURL("http://www.snapchat.com/add/" + user.snapchat)
      : null;
  };
  const handleonGithubPress = () => {
    user.github ? Linking.openURL("https://github.com/" + user.github) : null;
  };
  const handleonSkypePress = () => {
    user.skype ? Linking.openURL("skype:" + user.skype + "?chat") : null;
  };
  const handleonTwitterPress = () => {
    user.twitter
      ? Linking.openURL("https://twitter.com/" + user.twitter)
      : null;
  };
  const handleonPhonePress = () => {
    user.whatsapp ? Linking.openURL("tel:+91" + user.whatsapp) : null;
  };
  const handleonMailPress = () => {
    user.email ? Linking.openURL("mailto: " + user.email) : null;
  };

  return (
    <>
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

        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.headerText}>
          {user.username}
        </Text>
        <Text></Text>
      </View>
      <View style={styles.logoContainer}>
        <Image
          style={{ borderRadius: 15, height: 300, width: "100%" }}
          source={{ uri: user.profile_picture }}
        />
      </View>
      <View
        style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={{ uri: "https://img.icons8.com/nolan/512/share-2.png" }}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ color: "#FFF" }}>CONNECT WITH ME</Text>
        </View>
      </View>

      <View style={[styles.socialMainRow, { marginTop: 25 }]}>
        <TouchableOpacity onPress={handleonWhatsappPress}>
          <View style={styles.sociallistRowdetail}>
            <Image
              source={{
                uri: WHATSAPP_LOGO,
              }}
              style={styles.socialcon}
            />
            <Text style={styles.socialText}>
              {user.whatsapp ? user.whatsapp : "PRIVATE"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleonLinkedinPress}>
          <View style={styles.sociallistRowdetail}>
            <Text style={styles.socialTextR}>
              {user.linkedin ? user.linkedin : "PRIVATE"}
            </Text>
            <Image
              source={{
                uri: LINKEDIN_LOGO,
              }}
              style={styles.socialcon}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.socialMainRow}>
        <TouchableOpacity onPress={handleonInstaPress}>
          <View style={styles.sociallistRowdetail}>
            <Image
              source={{
                uri: INSTA_LOGO,
              }}
              style={styles.socialcon}
            />
            <Text style={styles.socialText}>
              {user.instagram ? user.instagram : "PRIVATE"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleonSnapPress}>
          <View style={styles.sociallistRowdetail}>
            <Text style={styles.socialTextR}>
              {user.snapchat ? user.snapchat : "PRIVATE"}
            </Text>
            <Image
              source={{
                uri: SNAPCHAT_LOGO,
              }}
              style={styles.socialcon}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.socialMainRow}>
        <TouchableOpacity onPress={handleonGithubPress}>
          <View style={styles.sociallistRowdetail}>
            <Image
              source={{
                uri: GITHUB_LOGO,
              }}
              style={styles.socialcon}
            />
            <Text style={styles.socialText}>
              {user.github ? user.github : "PRIVATE"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleonSkypePress}>
          <View style={styles.sociallistRowdetail}>
            <Text style={styles.socialTextR}>
              {user.skype ? user.skype : "PRIVATE"}
            </Text>
            <Image
              source={{
                uri: SKYPE_LOGO,
              }}
              style={styles.socialcon}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.socialMainRow}>
        <TouchableOpacity onPress={handleonTwitterPress}>
          <View style={styles.sociallistRowdetail}>
            <Image
              source={{
                uri: TWITTER_LOGO,
              }}
              style={styles.socialcon}
            />
            <Text style={styles.socialText}>
              {user.twitter ? user.twitter : "PRIVATE"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleonPhonePress}>
          <View style={styles.sociallistRowdetail}>
            <Text style={styles.socialTextR}>
              {user.whatsapp ? user.whatsapp : "PRIVATE"}
            </Text>
            <Image
              source={{
                uri: PHONE,
              }}
              style={styles.socialcon}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.socialMainRow}>
        <TouchableOpacity onPress={handleonMailPress}>
          <View style={styles.sociallistRowdetail}>
            <Image
              source={{
                uri: MAIL,
              }}
              style={styles.socialcon}
            />
            <Text style={styles.socialText}>
              {user.email ? user.email : "PRIVATE"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.sociallistRowdetail}>
            <Text style={styles.socialTextR}></Text>
            <Image style={styles.socialcon} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  socialText: { marginLeft: 20, color: "#fff" },
  socialTextR: { marginRight: 20, color: "#fff" },
  sociallistRowdetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialMainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginRight: 10,
  },
  socialcon: {
    width: 30,
    height: 30,
    alignSelf: "center",
    borderRadius: 10,
  },

  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    //fontWeight: "700",
    fontSize: RFPercentage(3),
    marginRight: 25,
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  socialNetworkLogos: {
    width: 50,
    height: 50,
  },
  socialNeworkCards: {
    backgroundColor: "#212121",
    padding: 10,
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 20,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserDetailsForm;
