import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { firebase, db } from "../../firebase";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

const SignUpForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string().required().min(2, "A username is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to have at least 8 charecters"),
  });

  const onSignUp = async (email, password, username) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("Firebase SignUp Successful", email, password);

      db.collection("user")
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username: username,
          email: authUser.user.email,
          profile_picture: await getRandomProfilePicture(),
        });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => {
          onSignUp(values.email, values.password, values.username);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputfield,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#9c27b0"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#cfd8dc"
                placeholder="Phone Number or email"
                autoCapitalize="none"
                color="#fff"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={false}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputfield,
                {
                  borderColor:
                    values.username.length < 1 || values.username.length >= 4
                      ? "#9c27b0"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#cfd8dc"
                placeholder="Username"
                autoCapitalize="none"
                color="#fff"
                autoCorrect={false}
                autoFocus={false}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>

            <View
              style={[
                styles.inputfield,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length >= 6
                      ? "#9c27b0"
                      : "red",
                },
                {
                  marginBottom: 60,
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#cfd8dc"
                placeholder="Password"
                autoCapitalize="none"
                color="#fff"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                autoFocus={false}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>

            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text style={{ color: "#cfd8dc" }}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.signUpText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
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
    borderColor: "#9c27b0",
    padding: 12,
    backgroundColor: "#212121",
    marginBottom: 10,
    borderWidth: 1,
  },
  button: (isValid) => ({
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 15,
    backgroundColor: isValid ? "#820682" : "#e8a3e2",
  }),
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
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
export default SignUpForm;
