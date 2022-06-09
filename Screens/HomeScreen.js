import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/home/Header";
import Stories from "../Components/home/Stories";
import Posts from "../Components/home/Posts";
import { POSTS } from "../data/posts";
import BottomTabs, { bottomTabIcons } from "../Components/home/BottomTabs";
import Helper from "../Components/Helper/Helper";
import { db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  //const [users, setUsers] = useState([]);
  useEffect(() => {
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
  }, []);
  return (
    <SafeAreaView
      style={
        Platform.OS === "android" ? Helper.AndroidSafeArea : styles.container
      }
    >
      <Header navigation={navigation} />
      <Stories />
      <ScrollView style={{ flexGrow: 1 }}>
        {posts.map((post, index) => (
          <Posts post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});

export default HomeScreen;
