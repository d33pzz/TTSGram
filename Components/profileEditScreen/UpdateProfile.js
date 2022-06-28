import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    Alert,
    Image,
  } from "react-native";
  import React, { useState } from "react";
  
  import {firebase} from "../../firebase";
  
  import { Formik } from "formik";
  import * as Yup from "yup";
  import Validator from "email-validator";
  import UpdatProfileForm from "./UpdateProfileForm";
  

const UpdateProfile = ({ navigation }) => (
  <View style={styles.container}>
    <Header navigation={navigation} />

    <UpdatProfileForm navigation={navigation} />
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
    <Text style={styles.headerText}>Update Profile</Text>
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

export default UpdateProfile;
