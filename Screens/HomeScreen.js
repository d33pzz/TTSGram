import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Header from "../Components/home/Header";
import Stories from "../Components/home/Stories";
import Posts from "../Components/home/Posts";
import { POSTS } from "../data/posts";
import BottomTabs, { bottomTabIcons } from "../Components/home/BottomTabs";
import Helper from "../Components/Helper/Helper";
import { db } from "../firebase";

const HomeScreen = ({navigation}) => {
  useEffect(() => {
    db.collectionGroup("posts").onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()))
    })
  }, [])
  return (
    <SafeAreaView style={ Platform.OS === "android"
    ? Helper.AndroidSafeArea
    : styles.container}>
      <Header navigation={navigation}/>
      <Stories />
      <ScrollView style= {{flexGrow: 1}}>
        {POSTS.map((post,index) =>(
          <Posts post={post} key={index}/>
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
