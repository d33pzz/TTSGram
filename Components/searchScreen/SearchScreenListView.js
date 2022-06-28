import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

import { Card } from "react-native-shadow-cards";

const SearchScreenListView = ({navigation}) => {
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

  return (
    <View>
      <ScrollView>
        {users.map((user, index) => (
          
          <View key={index}>
            <TouchableOpacity  onPress={() => {
              /* 1. Navigate to the Details route with params, passing the params as an object in the method navigate */
              navigation.navigate('UserDetailsScreen', {user});
            }}>
              <Card
                style={{
                  padding: 10,
                  //margin: 10,
                  marginBottom: 10,
                  width: "100%",
                  marginRight: 10,
                  marginLeft: 10,
                  backgroundColor: "#2c2c2c",
                  elevation: 2,
                  opacity: 0.8,
                  borderRadius: 15,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: user.profile_picture }}
                  style={styles.story}
                />
                <Text style={{ color: "white", marginStart: 20 }}>
                  {user.username.length > 11
                    ? user.username.slice(0, 6).toLowerCase() + "..."
                    : user.username.toLowerCase()}
                </Text>
              </Card>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginLeft: 5,
    //borderWidth: 3,
    //borderColor: "#76ff03",
  },
});

export default SearchScreenListView;
