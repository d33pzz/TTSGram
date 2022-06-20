import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { firebase, db } from "../../firebase";
import { Card } from "react-native-shadow-cards";

import { Divider } from "react-native-elements";

const INSTA_LOGO = "https://img.icons8.com/nolan/512/instagram-new.png";
const WHATSAPP_LOGO = "https://img.icons8.com/nolan/512/whatsapp.png";
const SKYPE_LOGO = "https://img.icons8.com/nolan/512/skype.png";
const GITHUB_LOGO = "https://img.icons8.com/nolan/512/github.png";
const LINKEDIN_LOGO = "https://img.icons8.com/nolan/512/linkedin.png";
const YOUTUBE_LOGO = "https://img.icons8.com/nolan/512/youtube-play.png";
const REACTNATIVE_LOGO = "https://img.icons8.com/nolan/512/react-native.png";
const JAVASCRIPT_LOGO = "https://img.icons8.com/nolan/512/javascript.png";
const TWITTER_LOGO = "https://img.icons8.com/nolan/512/twitter.png";
const EDIT_PROFILE = "https://img.icons8.com/glyph-neue/512/ffffff/undefined/edit.png";

const ProfilePage = ({ navigation }) => (
  <View style={styles.container}>
    <Main navigation={navigation} />
  </View>
);

const Main = ({ navigation }) => {
  const [user, setUser] = useState("");
  db.collection("user")
    .doc(firebase.auth().currentUser.email)
    .get()
    .then((snapshot) => {
      const data = snapshot.data();
      //console.log(data);
      setUser(data);
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });
  return (
    <>
      <View style={styles.headerContainer}>
        <Text></Text>
        <Text style={styles.headerText}>{user.username}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation != null ? navigation.goBack() : null;
          }}
        >
          <Image
            source={{
              uri: EDIT_PROFILE,
            }}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: user.profile_picture, height: 300, width: "100%" }}
        />
      </View>
      {/* <Divider color="#fff" width={1} orientation="vertical" /> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <TouchableOpacity>
          <Card style={styles.socialNeworkCards}>
            <Image
              source={{ uri: INSTA_LOGO }}
              style={styles.socialNetworkLogos}
            />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity>
          <Card style={styles.socialNeworkCards}>
            <Image
              source={{ uri: WHATSAPP_LOGO }}
              style={styles.socialNetworkLogos}
            />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity>
          <Card style={styles.socialNeworkCards}>
            <Image
              source={{ uri: SKYPE_LOGO }}
              style={styles.socialNetworkLogos}
            />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity>
          <Card style={styles.socialNeworkCards}>
            <Image
              source={{ uri: GITHUB_LOGO }}
              style={styles.socialNetworkLogos}
            />
          </Card>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <TouchableOpacity>
          <Card style={styles.socialNeworkCards}>
            <Image
              source={{ uri: LINKEDIN_LOGO }}
              style={styles.socialNetworkLogos}
            />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity>
          <Card style={styles.socialNeworkCards}>
            <Image
              source={{ uri: TWITTER_LOGO }}
              style={styles.socialNetworkLogos}
            />
          </Card>
        </TouchableOpacity>
      </View>
    </>
  );
};

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

export default ProfilePage;
