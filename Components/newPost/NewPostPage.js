import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FormikPostUploaderPage from "./FormikPostUploaderPage";

const NewPostPage = ({ navigation }) => (
  <View style={styles.container}>
    <Header navigation={navigation} />

    {/* Post form */}
    <FormikPostUploaderPage navigation={navigation} />
  </View>
);

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <Text></Text>
    <Text style={styles.headerText}>New Post</Text>
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
});

export default NewPostPage;
