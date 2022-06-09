import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import { USERS } from "../../data/users";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index}  style={{ alignItems: "center" }}>
            <Image source={{ uri: story.image_url }} style={styles.story} />
            <Text style={{ color: "white" }}>{
                story.user_name.length > 11 ? story.user_name.slice(0, 6).toLowerCase() + "..." :
                story.user_name.toLowerCase()

            }</Text>       

          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 18,
    borderWidth: 3,
    borderColor: "#76ff03",
  },
});

export default Stories;
