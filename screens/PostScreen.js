import {
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { getPost, likePost } from "../utils/requests/requests";
// import RenderHtml from "react-native-render-html";
import Ionicons from "@expo/vector-icons/Ionicons";
import { setPost } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";

const PostScreen = ({ route, navigation }) => {
  const currentPostId = route.params.item._id;
  const [currentPost, setCurrentPost] = useState({
    post: route.params.item,
    user: route.params.item.author,
  });
  useEffect(() => {
    const getPostOnLoaded = async (postId) => {
      const post = await getPost(postId);
      setCurrentPost(post);
    };
    getPostOnLoaded(currentPostId);
  }, []);

  const { width, height } = Dimensions.get("screen");
  const ITEM_WIDTH = width;
  const ITEM_HEIGHT = height * 0.41;
  const image = route.params.item.imageURL;

  const dispatch = useDispatch();
  const item = route.params.item;
  const userId = useSelector((state) => state.user._id);
  const isLiked = Boolean(currentPost?.post?.likes[userId]);
  const numOfLikes = Object.keys(currentPost?.post?.likes).length;

  const handleLikePost = async (postId, userId) => {
    // console.log(currentPost);
    const prevPost = currentPost;
    let updatedPost = {};
    updatedPost.post = await likePost(postId, userId);
    // console.log(updatedPost);
    updatedPost.user = prevPost.user;
    setCurrentPost(updatedPost);
    dispatch(setPost({ post: updatedPost.post }));
    // console.log(currentPost.post.likes);
  };

  return (
    <SafeAreaView className="flex-1 relative">
      {/* STATUS BAR FIX */}
      <View
        className={`${
          Platform.OS === "android"
            ? "bg-white h-7 w-full top-0 z-50 absolute"
            : ""
        }`}
      ></View>
      <View className="h-screen w-screen">
        {/* HEADER */}
        <View
          className={`bg-white w-full flex-row justify-start items-center py-2 pt-9 ${
            image ? "" : "z-50"
          }`}
        >
          <Pressable
            className="px-5 py-2 z-50"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-outline" size={26} />
          </Pressable>
          <View className="flex-row justify-center items-center absolute w-full h-full pt-5">
            <Text className="text-lg text-center font-bold">Post</Text>
          </View>
        </View>

        <View className="">
          <Image
            source={{ uri: image ? image : null }}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              resizeMode: "cover",
            }}
          />
        </View>

        <BottomSheet
          initialSnapIndex={0}
          snapPoints={
            image ? [height - ITEM_HEIGHT - 30, height] : [height - 50]
          }
        >
          <BottomSheetScrollView
            className="bg-[#F6F5F5]"
            contentContainerStyle={{ padding: 20 }}
          >
            <Pressable
              onPress={() => handleLikePost(currentPost.post._id, userId)}
              className="absolute top-0 right-0 m-8 mt-10 h-12 w-12"
            >
              <View className="w-full h-full flex-row justify-center items-center">
                <View className="absolute bg-gray-200 opacity-60 w-full h-full rounded-full"></View>
                <Ionicons
                  className=" text-gray-500"
                  name={isLiked ? `heart` : `heart-outline`}
                  color={isLiked ? `#ed0000` : `#000`}
                  size={26}
                />
                <View className="absolute h-9 flex justify-center items-center top-10">
                  <Text className="text-base">{numOfLikes}</Text>
                </View>
              </View>
            </Pressable>
            {/* AUTHOR */}
            <View className="w-full mt-4 flex-row items-center justify-center px-2 pb-5">
              <Image
                className="w-14 h-14 rounded-full"
                source={
                  currentPost.user?.profilePicturePath
                    ? {
                        uri: currentPost.user?.profilePictureURL
                          ? currentPost.user?.profilePictureURL
                          : null,
                      }
                    : require("../assets/images//other/profile-pic.png")
                }
              />
              <View className="ml-4">
                <Text className="text-sm">Author:{"  "}</Text>
                <Text className="text-[18px] font-bold">
                  {currentPost.user?.fullName ? currentPost.user?.fullName : ""}
                </Text>
                <Text className="text-base text-gray-500">
                  @{currentPost.user?.userName}
                </Text>
              </View>
            </View>

            {/* POST */}
            <View>
              <Text className="text-[18px] font-bold uppercase text-center">
                {currentPost.post?.title}
              </Text>
              {currentPost.post?.duration && (
                <Text className="font-bold uppercase text-gray-400 text-center">
                  Duration: {currentPost.post?.duration} minutes
                </Text>
              )}
              <Text className="my-[20px]">{currentPost.post?.description}</Text>
              {/* <View className="my-[20px]">
            <RenderHtml
              source={{ html: currentPost.post?.description }}
              contentWidth={width}
            />
          </View> */}
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

export default PostScreen;
