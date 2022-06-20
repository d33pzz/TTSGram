import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

import Helper from "../Components/Helper/Helper";
import SearchScreenListView from '../Components/searchScreen/SearchScreenListView';

const SearchScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={
        Platform.OS === "android" ? Helper.AndroidSafeArea : styles.container
      }
    >
     <View style={styles.logoContainer}>
      <Text style={{color: "white", fontSize: 16}}>This Feature will be available on the Next Update</Text>
    </View>
      <SearchScreenListView navigation={navigation}/>
    </SafeAreaView>
    
  )

}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "black",
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 12,
    },
    logoContainer: {
      alignItems: "center",
      marginTop: 60,
    },
  });

export default SearchScreen