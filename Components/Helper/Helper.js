import { StyleSheet, Platform, StatusBar } from "react-native";



export const INSTA_LOGO = "https://img.icons8.com/nolan/512/instagram-new.png";
export const WHATSAPP_LOGO = "https://img.icons8.com/nolan/512/whatsapp.png";
export const SKYPE_LOGO = "https://img.icons8.com/nolan/512/skype.png";
export const GITHUB_LOGO = "https://img.icons8.com/nolan/512/github.png";
export const LINKEDIN_LOGO = "https://img.icons8.com/nolan/512/linkedin.png";
export const YOUTUBE_LOGO = "https://img.icons8.com/nolan/512/youtube-play.png";
export const REACTNATIVE_LOGO = "https://img.icons8.com/nolan/512/react-native.png";
export const JAVASCRIPT_LOGO = "https://img.icons8.com/nolan/512/javascript.png";
export const TWITTER_LOGO = "https://img.icons8.com/nolan/512/twitter.png";
export const EDIT_PROFILE =
  "https://img.icons8.com/glyph-neue/512/ffffff/undefined/edit.png";
export const SNAPCHAT_LOGO = "https://img.icons8.com/nolan/512/snapchat.png";
export const PHONE= "https://img.icons8.com/nolan/96/phone.png";
export const MAIL= "https://img.icons8.com/nolan/96/new-post.png";
export const FACEBOOK = "https://img.icons8.com/nolan/96/facebook-new.png"


export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#000037",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
