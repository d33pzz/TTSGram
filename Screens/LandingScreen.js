import * as React from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { useState } from "react";
import Helper from "../Components/Helper/Helper";
import HomeScreen from "./HomeScreen";
import NewPostScreen from "./NewPostScreen";
import SearchScreen from "./SearchScreen";
import ProfileScreen from "./ProfileScreen";
import ReelsScreen from "./ReelsScreen";

const LandingScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [mainView, setMainView] = useState(0);
  const bottomTabImages = [
    {
      case: 0,
      name: "Home",
      active: "https://img.icons8.com/material-sharp/96/ffffff/home-page.png",
      inactive:
        "https://img.icons8.com/material-outlined/96/ffffff/home-page.png",
    },
    {
      case: 1,
      name: "Search",
      active: "https://img.icons8.com/ios-filled/100/ffffff/search--v1.png",
      inactive: "https://img.icons8.com/ios/100/ffffff/search--v1.png",
    },
    {
      case: 2,
      name: "Reels",
      active: "https://img.icons8.com/ios-filled/100/ffffff/instagram-reel.png",
      inactive: "https://img.icons8.com/ios/100/ffffff/instagram-reel.png",
    },
    {
      case: 3,
      name: "Acivity",
      active: "https://img.icons8.com/ios-filled/100/ffffff/undefined/plus-2-math.png",
      inactive:
        "https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/64/ffffff/external-plus-multimedia-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png",
    },
    {
      case: 4,
      name: "Profile",
      active:
        "https://img.icons8.com/ios-filled/100/ffffff/undefined/user.png",
      inactive:
        "https://img.icons8.com/ios-filled/100/ffffff/undefined/user.png",
    },
  ];

  const BottomIcon = ({ bottomTabImages }) => (
    console.log(bottomTabImages.name),
    (
      <TouchableOpacity
        onPress={() => {
          setActiveTab(bottomTabImages.name),
           setMainView(bottomTabImages.case);
        }}
      >
        <Image
          source={[
            {
              uri:
                activeTab === bottomTabImages.name
                  ? bottomTabImages.active
                  : bottomTabImages.inactive,
            },
          ]}
          style={[
            styles.ICON,
            bottomTabImages.name === "Profile" ? styles.profilepic() : null,
            activeTab === "Profile" && bottomTabImages.name === activeTab
              ? styles.profilepic(activeTab)
              : null,
          ]}
        />
      </TouchableOpacity>
    )
  );

  const MainView = ({ mainView }) => {
    switch (mainView) {
      case 0:
        return <HomeScreen navigation={navigation}/>;
      case 1:
        return <SearchScreen navigation={navigation}/>;
      case 2:
        return <ReelsScreen navigation={navigation}/>;
      case 3:
        return <NewPostScreen navigation={navigation}/>;
      case 4:
        return <ProfileScreen navigation={navigation}/>;

      default:
        return <HomeScreen navigation={navigation}/>;
    }
  };

  return (
    <SafeAreaView
      style={
        Platform.OS === "android"
          ? Helper.AndroidSafeArea
          : styles.mainContainer
      }
    >
      <ScrollView style={{ flexGrow: 1 }}>
        <MainView mainView={mainView} />
      </ScrollView>
      <View style={styles.wrapper}>
        <Divider width={1} orientation="vertical" />
        <View style={styles.container}>
          {bottomTabImages.map((icon, index) => (
            <BottomIcon key={index} bottomTabImages={icon} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#000037",
    flex: 1,
  },

  wrapper: {
    position: "relative",
    width: "100%",
    bottom: "3%",
    zIndex: 999,
    backgroundColor: "#000037",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    backgroundColor: "#000037",
    paddingTop: 10,
  },
  ICON: {
    width: 30,
    height: 30,
  },

  profilepic: (activeTab = "") => ({
    borderRadius: 50,
    borderWidth: activeTab === "Profile" ? 2 : 0,
    borderColor: "#ffffff",
  }),
});

export default LandingScreen;
