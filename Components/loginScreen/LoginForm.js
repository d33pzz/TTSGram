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

import {firebase} from "../../firebase";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

const LoginForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(6, "Your password has to have at least 8 charecters"),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Firebase Login Successful", email, password);
    } catch (error) {
      Alert.alert(
        "Error", 
        error.message + "\n\n What would you like to do next?",
        [
          {
            text: "OK",
            onPress: () => console.log("OK"),
            style: "cancel",
          },
          {
            text: "Sign Up",
            onPress: () => navigation.push("SignUpScreen"),
          }
        ]
      );
    }
  };
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
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
                      ? "#ffc453"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#cfd8dc"
                placeholder="Phone Number, username or email"
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
                    values.password.length < 1 || values.password.length >= 6
                      ? "#ffc453"
                      : "red",
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
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              {/* <Text style={{ color: "#216aff" }}>Forgot Password?</Text> */}
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text style={{ color: "#cfd8dc" }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push("SignUpScreen")}>
                <Text style={styles.signUpText}>Sign Up</Text>
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
    backgroundColor: isValid ? "#f7931d" : "#ffc453",
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
    color: "#ffc453",
  },
});
export default LoginForm;
