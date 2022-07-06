import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import validUrl from "valid-url";
import { firebase, db } from "../../firebase";
import {
  GITHUB_LOGO,
  INSTA_LOGO,
  LINKEDIN_LOGO,
  SKYPE_LOGO,
  SNAPCHAT_LOGO,
  TWITTER_LOGO,
  WHATSAPP_LOGO,
} from "../Helper/Helper";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const PLACEHOLDER_IMG =
  "https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png";

const UpdatProfileForm = ({ navigation }) => {
  const [thumbnailurl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
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
  const UpdateProfileFormSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("A Url is required"),
    username: Yup.string().required().min(2, "A username is required"),
  });

  const onUpdateProfile = async (
    imageUrl,
    username,
    whatsapp,
    instagram,
    skype,
    linkedin,
    twitter,
    snapchat,
    github
  ) => {
    try {
      db.collection("user")
        .doc(firebase.auth().currentUser.email)
        .update({
          //email: firebase.auth().currentUser.email,
          username: username ? username : user.username,
          profile_picture: imageUrl ? imageUrl : user.profile_picture,
          whatsapp: whatsapp ? whatsapp : user.whatsapp ? user.whatsapp : "",
          instagram: instagram
            ? instagram
            : user.instagram
            ? user.instagram
            : "",
          skype: skype ? skype : user.skype ? user.skype : "",
          linkedin: linkedin ? linkedin : user.linkedin ? user.linkedin : "",
          twitter: twitter ? twitter : user.twitter ? user.twitter : "",
          snapchat: snapchat ? snapchat : user.snapchat ? user.snapchat : "",
          github: github ? github : user.github ? user.github : "",
        })
        .then(() => navigation.goBack());
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  //console.log(user)
  // const onLogin = async (email, password) => {
  //   try {
  //     await firebase.auth().signInWithEmailAndPassword(email, password);
  //     console.log("Firebase Login Successful", email, password);
  //   } catch (error) {
  //     Alert.alert(
  //       "Error",
  //       error.message + "\n\n What would you like to do next?",
  //       [
  //         {
  //           text: "OK",
  //           onPress: () => console.log("OK"),
  //           style: "cancel",
  //         },
  //         {
  //           text: "Sign Up",
  //           onPress: () => navigation.push("SignUpScreen"),
  //         }
  //       ]
  //     );
  //   }
  // };

  return (
    <ScrollView style={{ flexGrow: 1 }}>
      <View style={styles.wrapper}>
        <Formik
          initialValues={{
            imageUrl: "",
            username: "",
            whatsapp: "",
            instagram: "",
            skype: "",
            linkedin: "",
            twitter: "",
            snapchat: "",
            github: "",
          }}
          onSubmit={(values) => {
            //onLogin(values.email, values.password);
            onUpdateProfile(
              values.imageUrl,
              values.username,
              values.whatsapp,
              values.instagram,
              values.skype,
              values.linkedin,
              values.twitter,
              values.snapchat,
              values.github
            );
          }}
          validationSchema={UpdateProfileFormSchema}
          validateOnMount={true}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              <View
                style={{
                  //margin: 20,
                  width: "100%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{
                    uri: validUrl.isUri(thumbnailurl)
                      ? thumbnailurl
                      : PLACEHOLDER_IMG,
                  }}
                  style={{
                    width: "30%",
                    height: 100,
                    alignSelf: "center",
                    borderRadius: 15,
                  }}
                />
                <View style={{ width: "65%" }}>
                  <Text
                    style={{
                      color: "#cfd8dc",
                      marginBottom: 5,
                      marginLeft: 10,
                    }}
                  >
                    profile pic url
                  </Text>
                  <View style={[styles.inputfield]}>
                    <TextInput
                      onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                      style={{ color: "white", fontSize: 18 }}
                      placeholder="Enter Image Url"
                      placeholderTextColor="gray"
                      onChangeText={handleChange("imageUrl")}
                      onBlur={handleBlur("imageUrl")}
                      value={values.imageUrl}
                    />

                    {errors.imageUrl && (
                      <Text style={{ fontSize: 10, color: "red" }}>
                        {errors.imageUrl}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={{
                      color: "#cfd8dc",
                      marginBottom: 5,
                      marginLeft: 10,
                    }}
                  >
                    username
                  </Text>
                  <View
                    style={[
                      styles.inputfield,
                      {
                        borderColor:
                          values.username.length < 1 ||
                          values.username.length >= 3
                            ? "#ffc453"
                            : "red",
                      },
                    ]}
                  >
                    <TextInput
                      placeholderTextColor="#cfd8dc"
                      placeholder={user.username ? user.username : "Username"}
                      autoCapitalize="none"
                      color="#fff"
                      autoCorrect={false}
                      autoFocus={false}
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      value={values.username}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{
                    uri: WHATSAPP_LOGO,
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                />
                <View style={{ width: "90%", marginLeft: 10 }}>
                  <Text
                    style={{
                      color: "#cfd8dc",
                      marginBottom: 5,
                      marginLeft: 10,
                    }}
                  >
                    Whatsapp Number
                  </Text>
                  <View
                    style={[
                      styles.inputfield,
                      {
                        borderColor:
                          values.whatsapp.length < 1 ||
                          values.whatsapp.length >= 10
                            ? "#ffc453"
                            : "red",
                      },
                    ]}
                  >
                    <TextInput
                      placeholderTextColor="#cfd8dc"
                      placeholder={user.whatsapp ? user.whatsapp : "Whatsapp"}
                      autoCapitalize="none"
                      color="#fff"
                      autoCorrect={false}
                      autoFocus={false}
                      onChangeText={handleChange("whatsapp")}
                      onBlur={handleBlur("whatsapp")}
                      value={values.whatsapp}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{
                    uri: INSTA_LOGO,
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                />
                <View style={{ width: "90%", marginLeft: 10 }}>
                  <Text
                    style={{
                      color: "#cfd8dc",
                      marginBottom: 5,
                      marginLeft: 10,
                    }}
                  >
                    Instagram id
                  </Text>
                  <View
                    style={[
                      styles.inputfield,
                      {
                        borderColor:
                          values.instagram.length < 1 ||
                          values.instagram.length >= 3
                            ? "#ffc453"
                            : "red",
                      },
                    ]}
                  >
                    <TextInput
                      placeholderTextColor="#cfd8dc"
                      placeholder={
                        user.instagram ? user.instagram : "Instagram"
                      }
                      autoCapitalize="none"
                      color="#fff"
                      autoCorrect={false}
                      autoFocus={false}
                      onChangeText={handleChange("instagram")}
                      onBlur={handleBlur("instagram")}
                      value={values.instagram}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{
                    uri: LINKEDIN_LOGO,
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                />
                <View style={{ width: "90%", marginLeft: 10 }}>
                  <Text
                    style={{
                      color: "#cfd8dc",
                      marginBottom: 5,
                      marginLeft: 10,
                    }}
                  >
                    Linkedin
                  </Text>
                  <View
                    style={[
                      styles.inputfield,
                      {
                        borderColor:
                          values.linkedin.length < 1 ||
                          values.linkedin.length >= 3
                            ? "#ffc453"
                            : "red",
                      },
                    ]}
                  >
                    <TextInput
                      placeholderTextColor="#cfd8dc"
                      placeholder={user.linkedin ? user.linkedin : "Linkedin"}
                      autoCapitalize="none"
                      color="#fff"
                      autoCorrect={false}
                      autoFocus={false}
                      onChangeText={handleChange("linkedin")}
                      onBlur={handleBlur("linkedin")}
                      value={values.linkedin}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{
                    uri: SKYPE_LOGO,
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                />
                <View style={{ width: "90%", marginLeft: 10 }}>
                  <Text
                    style={{
                      color: "#cfd8dc",
                      marginBottom: 5,
                      marginLeft: 10,
                    }}
                  >
                    Skype Id
                  </Text>
                  <View
                    style={[
                      styles.inputfield,
                      {
                        borderColor:
                          values.skype.length < 1 || values.skype.length >= 3
                            ? "#ffc453"
                            : "red",
                      },
                    ]}
                  >
                    <TextInput
                      placeholderTextColor="#cfd8dc"
                      placeholder={user.skype ? user.skype : "Skype"}
                      autoCapitalize="none"
                      color="#fff"
                      autoCorrect={false}
                      autoFocus={false}
                      onChangeText={handleChange("skype")}
                      onBlur={handleBlur("skype")}
                      value={values.skype}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{
                    uri: SNAPCHAT_LOGO,
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                />
                <View style={{ width: "90%", marginLeft: 10 }}>
                  <Text
                    style={{
                      color: "#cfd8dc",
                      marginBottom: 5,
                      marginLeft: 10,
                    }}
                  >
                    Snapchat Id
                  </Text>
                  <View
                    style={[
                      styles.inputfield,
                      {
                        borderColor:
                          values.snapchat.length < 1 ||
                          values.snapchat.length >= 3
                            ? "#ffc453"
                            : "red",
                      },
                    ]}
                  >
                    <TextInput
                      placeholderTextColor="#cfd8dc"
                      placeholder={user.snapchat ? user.snapchat : "Snapchat"}
                      autoCapitalize="none"
                      color="#fff"
                      autoCorrect={false}
                      autoFocus={false}
                      onChangeText={handleChange("snapchat")}
                      onBlur={handleBlur("snapchat")}
                      value={values.snapchat}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{
                    uri: TWITTER_LOGO,
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                />
                <View style={{ width: "90%", marginLeft: 10 }}>
                  <Text
                    style={{
                      color: "#cfd8dc",
                      marginBottom: 5,
                      marginLeft: 10,
                    }}
                  >
                    Twitter Id
                  </Text>
                  <View
                    style={[
                      styles.inputfield,
                      {
                        borderColor:
                          values.twitter.length < 1 ||
                          values.twitter.length >= 3
                            ? "#ffc453"
                            : "red",
                      },
                    ]}
                  >
                    <TextInput
                      placeholderTextColor="#cfd8dc"
                      placeholder={user.twitter ? user.twitter : "Twitter"}
                      autoCapitalize="none"
                      color="#fff"
                      autoCorrect={false}
                      autoFocus={false}
                      onChangeText={handleChange("twitter")}
                      onBlur={handleBlur("twitter")}
                      value={values.twitter}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  //margin: 20,
                  //justifyContent: "space-between",
                  flexDirection: "row",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{
                    uri: GITHUB_LOGO,
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                />
                <View style={{ width: "90%", marginLeft: 10 }}>
                  <Text
                    style={{
                      color: "#cfd8dc",
                      marginBottom: 5,
                      marginLeft: 10,
                    }}
                  >
                    Github Id
                  </Text>
                  <View
                    style={[
                      styles.inputfield,
                      {
                        borderColor:
                          values.github.length < 1 || values.github.length >= 3
                            ? "#ffc453"
                            : "red",
                      },
                    ]}
                  >
                    <TextInput
                      placeholderTextColor="#cfd8dc"
                      placeholder={user.github ? user.github : "Github"}
                      autoCapitalize="none"
                      color="#fff"
                      autoCorrect={false}
                      autoFocus={false}
                      onChangeText={handleChange("github")}
                      onBlur={handleBlur("github")}
                      value={values.github}
                    />
                  </View>
                </View>
              </View>

              <Pressable
                // titleSize={20}
                style={styles.button(isValid)}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.buttonText}>Update</Text>
              </Pressable>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  inputfield: {
    borderRadius: 15,
    padding: 12,
    backgroundColor: "#2c2b62",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ffc453",
  },
  button: (isValid) => ({
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 15,
    marginBottom: 100,
    backgroundColor: isValid ? "#f7931d" : "#ffc453",
  }),
  buttonText: {
    //fontWeight: "600",
    color: "#fff",
    fontSize: RFPercentage(3),
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 50,
  },
  signUpText: {
    color: "#003cff",
  },
});
export default UpdatProfileForm;
