import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";

import TTSGramDetails from "../Components/TTSGram/TTSGramDetails";
import Helper from "../Components/Helper/Helper";

const TTSGramScreen = ({ navigation }) => (
  <SafeAreaView
    style={
      Platform.OS === "android" ? Helper.AndroidSafeArea : styles.container
    }
  >
    <ScrollView style={{ flexGrow: 1 }}>
      <TTSGramDetails navigation={navigation} />
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

export default TTSGramScreen;
