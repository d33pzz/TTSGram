import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";
import React from "react";

import Helper from "../Components/Helper/Helper";
import ProfilePage from "../Components/profilePage/ProfilePage";

const ProfileScreen = ({ navigation }) => (
  <SafeAreaView
    style={
      Platform.OS === "android" ? Helper.AndroidSafeArea : styles.container
    }
  >
    <ScrollView style={{ flexGrow: 1 }}>
      <ProfilePage navigation={navigation} />
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
});

export default ProfileScreen;
