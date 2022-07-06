import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Helper from "../Components/Helper/Helper";
import UserDetailsForm from "../Components/userDetails/UserDetailsForm";

const UserDetailsScreen = ({ route, navigation }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(route.params?.user);
  }, []);
  console.log(user);
  return (
    <SafeAreaView
      style={
        Platform.OS === "android"
          ? Helper.AndroidSafeArea
          : styles.globalSafeAreaView
      }
    >
      <ScrollView style={{ flexGrow: 1 }}>
        <UserDetailsForm navigation={navigation} user={user} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  globalSafeAreaView: {
    backgroundColor: "#000037",
    flex: 1,
  },
});

export default UserDetailsScreen;
