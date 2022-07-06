import { View, Image, TextInput, Text, Button, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import { db, firebase } from "../../firebase";

const PLACEHOLDER_IMG =
  "https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png";
const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A Url is required"),
  caption: Yup.string().max(2200, "Caption Reached the charector Limit."),
});

const FormikPostUploaderPage = ({ navigation }) => {
  const [thumbnailurl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);

  const { width } = Dimensions.get("window");
  const SIZE = width;
  const [currentLoggedinUser, setCurrentLoggedInUser] = useState(null);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection("user")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        })
      );

    return unsubscribe;
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
      .collection("user")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedinUser.username,
        profile_picture: currentLoggedinUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(
        navigation.reset({
          index: 0,
          routes: [{ name: "LandingScreen" }],
        })
      );

    return unsubscribe;
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                width: SIZE,
                height: SIZE,
              }}
            >
              <Image
                source={{
                  uri: validUrl.isUri(thumbnailurl)
                    ? thumbnailurl
                    : PLACEHOLDER_IMG,
                }}
                style={{
                  borderRadius: 15,
                  width: "90%",
                  height: "90%",
                }}
              />
            </View>
            <TextInput
              onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
              style={{
                borderRadius: 15,
                padding: 12,
                backgroundColor: "#2c2b62",
                marginBottom: 10,
                marginTop: 10,
                borderWidth: 1,
                color: "#fff",
                borderColor: "#ffc453",
                width: "100%",
              }}
              placeholder="Enter Image Url"
              placeholderTextColor="gray"
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              value={values.imageUrl}
            />

            {errors.imageUrl && (
              <Text style={{ fontSize: 10, color: "red", width: "100%" }}>
                {errors.imageUrl}
              </Text>
            )}
            <Divider width={0.2} orientation="vertical" />

            <View style={{ marginTop: 10, width: "100%" }}>
              <TextInput
                style={{ color: "white", fontSize: 16, width: "100%" }}
                placeholder="Write a Caption..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
            <View style={{ marginTop: 20, marginBottom: 50, width: "100%" }}>
              <Button
                onPress={handleSubmit}
                title="Share"
                disabled={!isValid}
              />
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploaderPage;
