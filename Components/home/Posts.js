import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import React, { useState, useEffect, useRef, createRef } from "react";
import { Divider } from "react-native-elements";
import { db, firebase } from "../../firebase";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
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
  const handleLike = async (post) => {
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
      <Caption post={post} />
      <PostImage post={post} handleLike={handleLike} />
      <View style={{ marginHorizontal: 15, marginTop: 5, zIndex: -99 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <CommentInput post={post} />
        <CommentSection post={post} />
        {/* <Comments post={post} /> */}
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
      zIndex: -99,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />

      <Text style={{ fontWeight: "700", marginLeft: 15, color: "white" }}>
        {post.user}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}></Text>
  </View>
);

const PostImage = ({ post, handleLike }) => {
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

    // when scale < 1 & scale > 1, reset scale back to original (1)
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
      } else if (nScale > 1) {
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
      <TapGestureHandler
        numberOfTaps={2}
        onActivated={() => {
          handleLike(post);
        }}
      >
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
                  resizeMethod="resize"
                />
              </PinchGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </TapGestureHandler>
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

const PostFooter = ({ handleLike, post }) => {
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.leftFootedContainer}>
          <TouchableOpacity onPress={() => handleLike(post)}>
            <Image
              style={styles.footerICon}
              source={{
                uri: post.likes_by_users.includes(
                  firebase.auth().currentUser.email
                )
                  ? PostFooterIcons[0].likedimageurl
                  : PostFooterIcons[0].imageUrl,
              }}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity>
            <Icon
              imgStyle={styles.footerICon}
              imageUrl={PostFooterIcons[1].imageUrl}
            />
          </TouchableOpacity> */}

          {/* <Icon
            imgStyle={styles.footerICon}
            imageUrl={PostFooterIcons[2].imageUrl}
          /> */}
        </View>
        <View>
          {/* <Icon
            imgStyle={styles.footerICon}
            imageUrl={PostFooterIcons[3].imageUrl}
          /> */}
        </View>
      </View>
    </>
  );
};

const CommentInput = ({ post }) => {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  useEffect(
    () =>
      db
        .collection("user")
        .doc(firebase.auth().currentUser.email)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          //console.log(data);
          setUser(data);
        })
        .catch((err) => {
          console.log("Error getting documents", err);
        }),
    []
  );

  const handleComment = (post) => {
    setComment("");
    db.collection("user")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          user_email: firebase.auth().currentUser.email,
          user_name: user.username,
          comment: comment,
        }),
      })
      .then(() => {
        console.log("document succesfully updated");
      })
      .catch((error) => {
        console.log("Error updating document " + error);
      });
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          margin: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: -99,
        }}
      >
        <View style={styles.inputfield}>
          <TextInput
            placeholderTextColor="#cfd8dc"
            placeholder="Comment"
            autoCapitalize="none"
            color="#fff"
            autoCorrect={false}
            autoFocus={false}
            defaultValue={comment}
            onChangeText={(value) => setComment(value)}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleComment(post)}
          style={{
            marginRight: 5,
            marginBottom: 10,
            width: "18%",
            backgroundColor: "#f7931d",
            height: 40,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#ffffff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Icon = ({ imgStyle, imageUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imageUrl }} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4, marginLeft: 12 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")}
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5, marginLeft: 15, marginBottom: 5, zIndex: -99 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600" }}>{post.caption} </Text>
    </Text>
  </View>
);

//post.comments.length => 0,1,2,3...
// 0 returns false
// 1 or more returns true

const CommentSection = ({ post }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ marginTop: 5 }}>
      {!!post.comments.length && (
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{ color: "gray" }}>
              View{post.comments.length > 1 ? " all" : ""}{" "}
              {post.comments.length}
              {post.comments.length > 1 ? " comments" : " comment"}
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTextHeading}>COMMENTS</Text>
                <Comments post={post} />

                <Pressable
                  style={[styles.modalButton, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>

    // 3 Scenarios
    // A. 0 Comments
    // B. 1 comment
    // C. multiple Comments
  );
};

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View
        key={index}
        style={{
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text
          style={{
            color: "white",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 15 }}>
            {comment.user_name}
          </Text>
          <Text style={{ color: "#cfd8dc", fontWeight: "200", fontSize: 15 }}>
            {"  "}
            {comment.comment}
          </Text>
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
    // borderWidth: 1.6,
    // borderColor: "#216aff",
  },
  pinchable: {
    flex: 1,
    margin: 5,
  },
  leftFootedContainer: {
    flexDirection: "row",
    //justifyContent: "space-between",
    width: "32%",
  },

  footerICon: {
    width: 33,
    height: 33,
    margin: 5,
  },

  inputfield: {
    borderRadius: 15,
    borderColor: "#2c2b62",
    padding: 12,
    backgroundColor: "#2c2b62",
    marginBottom: 10,
    borderWidth: 1,
    width: "75%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "98%",
    backgroundColor: "#212121",
    borderRadius: 20,
    padding: 35,
    borderColor: "#f7931d",
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextHeading: {
    marginBottom: 15,
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#f7931d",
  },
  textStyle: {
    color: "white",
    width: 100,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Posts;
