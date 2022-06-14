import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { firebase, db } from "../../firebase";

export const bottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/material-sharp/96/ffffff/home-page.png",
    inactive:
      "https://img.icons8.com/material-outlined/96/ffffff/home-page.png",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/100/ffffff/search--v1.png",
    inactive: "https://img.icons8.com/ios/100/ffffff/search--v1.png",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/100/ffffff/instagram-reel.png",
    inactive: "https://img.icons8.com/ios/100/ffffff/instagram-reel.png",
  },
  {
    name: "Acivity",
    active: "https://img.icons8.com/ios-glyphs/90/ffffff/like--v1.png",
    inactive: "https://img.icons8.com/material-outlined/96/ffffff/like--v1.png",
  },
  {
    name: "Profile",
    active:
      "https://scontent-maa2-1.xx.fbcdn.net/v/t39.30808-6/260896643_1553211365029296_4050257997148333829_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=UFv5ULgJ_MgAX_HuN0H&_nc_ht=scontent-maa2-1.xx&oh=00_AT9ozNjGjWH4iVsy7f_g5FOLTQA9JAZpZS9RdAqdGsPouw&oe=62952A40",
    inactive:
      "https://scontent-maa2-1.xx.fbcdn.net/v/t39.30808-6/260896643_1553211365029296_4050257997148333829_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=UFv5ULgJ_MgAX_HuN0H&_nc_ht=scontent-maa2-1.xx&oh=00_AT9ozNjGjWH4iVsy7f_g5FOLTQA9JAZpZS9RdAqdGsPouw&oe=62952A40",
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const [users, setUsers] = useState([]);
  useEffect(() => {
    db.collection("user").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((users) => ({
          id: users.id,
          ...users.data(),
        }))
      );
    });
  }, []);

  function findUser(users) {
    return users.email === firebase.auth().currentUser.email
      ? users.email === firebase.auth().currentUser.email
      : null;
  }

  const Icon = ({ icon }) => (
    console.log(icon.name),
    //console.log(users.find(findUser).profile_picture),
    (
      //console.log(users.find(x => x.b === firebase.auth().currentUser.email)),
      <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
        <Image
          source={[
            { uri: activeTab === icon.name ? icon.active : icon.inactive },
            // {
            //   uri:
            //     icon.name === "Profile"
            //       ? users.find(findUser).profile_picture
            //       : null,
            // },
          ]}
          style={[
            styles.ICON,
            icon.name === "Profile" ? styles.profilepic() : null,
            activeTab === "Profile" && icon.name === activeTab
              ? styles.profilepic(activeTab)
              : null,
          ]}
        />
      </TouchableOpacity>
    )
  );
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
export default BottomTabs;
