import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";

import Helper from "../Components/Helper/Helper";
import SearchScreenListView from "../Components/searchScreen/SearchScreenListView";

import { Searchbar } from "react-native-paper";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <SafeAreaView
      style={
        Platform.OS === "android" ? Helper.AndroidSafeArea : styles.container
      }
    >
      <View style={styles.logoContainer}>
        <Searchbar
          style={{
            backgroundColor: "#000000",
            borderRadius: 10,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
          placeholder="Search"
          iconColor="#ffffff"
          selectionColor={"#ffffff"}
          placeholderTextColor={"#ffffff"}
          color="#fff"
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputStyle={{color: "#ffffff"}}
        />
      </View>
      <SearchScreenListView navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    //marginTop: 20,
  },
});

export default SearchScreen;
