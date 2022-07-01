import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase, db } from "../../firebase";
import {
  GITHUB_LOGO,
  INSTA_LOGO,
  LINKEDIN_LOGO,
  SKYPE_LOGO,
  SNAPCHAT_LOGO,
  TWITTER_LOGO,
  WHATSAPP_LOGO,
  EDIT_PROFILE,
} from "../Helper/Helper";

import * as Linking from "expo-linking";

const ProfilePage = ({ navigation }) => (
  <View style={styles.container}>
    <Main navigation={navigation} />
  </View>
);

const Main = ({ navigation }) => {
  const [user, setUser] = useState("");
  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      console.log("Signed out successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    assignUsers();
  }, []);

  const assignUsers = async () => {
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
  };

  const handleonWhatsappPress = () => {
    user.whatsapp ? Linking.openURL("https://wa.me/+91" + user.whatsapp) : null;
  };
  return (
    <>
      <View style={styles.headerContainer}>
        <Text></Text>
        <Text style={styles.headerText}>{user.username}</Text>
        <TouchableOpacity
          onPress={() => navigation.push("UpdateProfileScreen")}
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
          style={{ borderRadius: 15, height: 300, width: "100%" }}
          source={{ uri: user.profile_picture }}
        />
      </View>

      <View
        style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
      >
        <Image
          style={styles.socialcon}
          source={{ uri: "https://img.icons8.com/nolan/512/share-2.png" }}
        />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ color: "#FFF" }}>SOCIAL NETWORK</Text>
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
        <TouchableOpacity>
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
        <TouchableOpacity>
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
        <TouchableOpacity>
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
        <TouchableOpacity>
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
        <TouchableOpacity>
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
        <TouchableOpacity>
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
        <TouchableOpacity>
          <View style={styles.sociallistRowdetail}>
            <Image style={styles.socialcon} />
            <Text style={styles.socialText}></Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: 50,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={{ color: "#fff" }}>SIGN OUT</Text>
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
