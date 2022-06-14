import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, {useState, useEffect} from "react";
import { USERS } from "../../data/users";
import { db } from "../../firebase";



const Stories = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    db.collection("user")
      .onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((users) => ({
            id: users.id,
            ...users.data(),
          }))
        );
      });
  }, []);
  


  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {users.map((story, index) => (
          <View key={index}  style={{ alignItems: "center" }}>
            <Image source={{ uri: story.profile_picture }} style={styles.story} />
            <Text style={{ color: "white" }}>{
                story.username.length > 11 ? story.username.slice(0, 6).toLowerCase() + "..." :
                story.username.toLowerCase()

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
