import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef, createRef } from "react";
import { Divider } from "react-native-elements";
import { db, firebase } from "../../firebase";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";

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
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    );

    db.collection("user")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => {
        console.log("document succesfully updated");
      })
      .catch((error) => {
        console.log("Error updating document " + error);
      });
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Divider width={1} orientation="vertical" />
      <View style={{ marginBottom: 5 }}></View>
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 5, zIndex: 999 }}>
        <PostFooter post={post} handleLike={handleLike} />
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
      zIndex: 99,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />

      <Text style={{ fontWeight: "700", marginLeft: 5, color: "white" }}>
        {post.user}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => {
  const [panEnabled, setPanEnabled] = useState(false);

  const { width } = Dimensions.get("window");
  const SIZE = width;

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = createRef();
  const panRef = createRef();

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const handlePinchStateChange = ({ nativeEvent }) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }
    }
  };
  return (
    <View>
      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside
      >
        <Animated.View>
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}
            shouldCancelWhenOutside
          >
            <Animated.Image
              source={{
                uri: post.imageUrl,
              }}
              style={{
                width: SIZE,
                height: SIZE,
                zIndex: -99,
                transform: [{ scale }, { translateX }, { translateY }],
              }}
              resizeMode="cover"
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
      {/* <PinchGestureHandler >
        <Animated.View style={{ width: SIZE, height: SIZE }}>
          <Animated.Image
            source={{ uri: post.imageUrl }}
            style={{ width: SIZE, height: SIZE, resizeMode: "cover" }}
          />
        </Animated.View>
      </PinchGestureHandler> */}
    </View>
  );
};

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={styles.leftFootedContainer}>
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={styles.footerICon}
          source={{
            uri: post.likes_by_users.includes(firebase.auth().currentUser.email)
              ? PostFooterIcons[0].likedimageurl
              : PostFooterIcons[0].imageUrl,
          }}
        />
      </TouchableOpacity>

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
      {post.likes_by_users.length.toLocaleString("en")} likes
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
