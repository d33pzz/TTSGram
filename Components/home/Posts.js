import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";

const PostFooterIcons = [
  {
    name: "Like",
    likedimageurl: "https://img.icons8.com/ios-glyphs/90/fa314a/like--v1.png",
    imageUrl: "https://img.icons8.com/ios/100/ffffff/like--v1.png",
  },
  {
    name: "Comment",
    imageUrl: "https://img.icons8.com/ios/100/ffffff/topic.png",
  },
  {
    name: "Share",
    imageUrl: "https://img.icons8.com/ios/100/ffffff/sent.png",
  },
  {
    name: "Saved",
    imageUrl:
      "https://img.icons8.com/windows/32/ffffff/bookmark-ribbon--v1.png",
  },
];

const Posts = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};
const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profilepicture }} style={styles.story} />

      <Text style={{ fontWeight: "700", marginLeft: 5, color: "white" }}>
        {post.user_name}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = () => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={styles.leftFootedContainer}>
      <Icon
        imgStyle={styles.footerICon}
        imageUrl={PostFooterIcons[0].imageUrl}
      />
      <Icon
        imgStyle={styles.footerICon}
        imageUrl={PostFooterIcons[1].imageUrl}
      />
      <Icon
        imgStyle={styles.footerICon}
        imageUrl={PostFooterIcons[2].imageUrl}
      />
    </View>
    <View>
      <Icon
        imgStyle={styles.footerICon}
        imageUrl={PostFooterIcons[3].imageUrl}
      />
    </View>
  </View>
);

const Icon = ({ imgStyle, imageUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imageUrl }} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600" }}>{post.user_name} </Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

//post.comments.length => 0,1,2,3...
// 0 returns false
// 1 or more returns true

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && ( 
      <Text style={{ color: "gray" }}>
        View{post.comments.length > 1 ? " all" : ""} {post.comments.length}
        {post.comments.length > 1 ? " comments" : " comment"}
      </Text>
    )}
  </View>

  // 3 Scenarios
  // A. 0 Comments
  // B. 1 comment
  // C. multiple Comments
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ marginTop: 5, flexDirection: "row" }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "600" }}>{comment.user_name}</Text>{" "}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#76ff03",
  },
  leftFootedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "32%",
  },

  footerICon: {
    width: 33,
    height: 33,
  },
});

export default Posts;
