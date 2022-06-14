import * as React from "react";
import BottomTabs, { bottomTabIcons } from "../Components/home/BottomTabs";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { useState } from "react";
import Helper from "../Components/Helper/Helper";
import HomeScreen from "./HomeScreen";

const LandingScreen = () => {
  const [activeTab, setActiveTab] = useState("Home");
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
      active: "https://img.icons8.com/ios-glyphs/90/ffffff/like--v1.png",
      inactive:
        "https://img.icons8.com/material-outlined/96/ffffff/like--v1.png",
    },
    {
      case: 4,
      name: "Profile",
      active:
        "https://scontent-maa2-1.xx.fbcdn.net/v/t39.30808-6/260896643_1553211365029296_4050257997148333829_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=UFv5ULgJ_MgAX_HuN0H&_nc_ht=scontent-maa2-1.xx&oh=00_AT9ozNjGjWH4iVsy7f_g5FOLTQA9JAZpZS9RdAqdGsPouw&oe=62952A40",
      inactive:
        "https://scontent-maa2-1.xx.fbcdn.net/v/t39.30808-6/260896643_1553211365029296_4050257997148333829_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=UFv5ULgJ_MgAX_HuN0H&_nc_ht=scontent-maa2-1.xx&oh=00_AT9ozNjGjWH4iVsy7f_g5FOLTQA9JAZpZS9RdAqdGsPouw&oe=62952A40",
    },
  ];
  const BottomIcon = ({ bottomTabImages }) => (
    console.log(bottomTabImages.name),
    (
      <TouchableOpacity onPress={() => setActiveTab(bottomTabImages.name)}>
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

  return (
    <SafeAreaView
      style={
        Platform.OS === "android"
          ? Helper.AndroidSafeArea
          : styles.mainContainer
      }
    >
      <ScrollView style={{ flexGrow: 1 }}>
        <HomeScreen />
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
    backgroundColor: "black",
    flex: 1,
  },

  wrapper: {
    position: "relative",
    width: "100%",
    bottom: "3%",
    zIndex: 999,
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
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
