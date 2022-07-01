import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/home/Header";
import Posts from "../Components/home/Posts";
import Helper from "../Components/Helper/Helper";
import { db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = async () => {
    db.collectionGroup("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((post) => ({
            id: post.id,
            ...post.data(),
          }))
        );
      });
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    assignUsers();
  }, []);

  const assignUsers = async () => {
    db.collection("user").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((users) => ({
          id: users.id,
          ...users.data(),
        }))
      );
    });
  };

  return (
    <SafeAreaView
      style={
        Platform.OS === "android" ? Helper.AndroidSafeArea : styles.container
      }
    >
      <Header navigation={navigation} />
      {/* <Stories /> */}
      <ScrollView style={{ flexGrow: 1 }} pinchGestureEnabled={false}>
        {posts.map((post, index) => (
          <Posts post={post} key={index} />
        ))}
      </ScrollView>
      {/* <BottomTabs icons={bottomTabIcons} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000037",
    flex: 1,
  },
});

export default HomeScreen;
