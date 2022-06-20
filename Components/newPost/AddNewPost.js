import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import FormikPostUploader from "./FormikPostUploader";

const AddNewPost = ({ navigation }) => (
  <View style={styles.container}>
    <Header navigation={navigation} />

    {/* Post form */}
    <FormikPostUploader  navigation={navigation}/>
  </View>
);

const Header = ({navigation}) => ( 
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => {navigation!=null? navigation.goBack() : null}}>
      <Image
        source={{
          uri: "https://img.icons8.com/ios-filled/100/ffffff/back.png",
        }}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
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

export default AddNewPost;
