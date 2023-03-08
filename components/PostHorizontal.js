import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { likePost } from "../utils/requests/requests";
import { setPost } from "../redux/state";

const PostHorizontal = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const post = props.item;
  const userId = useSelector((state) => state.user._id);
  const isLiked = Boolean(post.likes[userId]);
  const numOfLikes = Object.keys(post.likes).length;
  const imageAspectRatio = (
    post.image.imageWidth / post.image.imageHeight
  ).toFixed(2);

  const handleLikePost = async (postId, userId) => {
    const updatedPost = await likePost(postId, userId);
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <View>
      <Pressable
        className="flex-row items-center justify-start overflow-hidden h-[200px] mx-0 my-2 border-2 border-gray-300 rounded-lg"
        onPress={() => navigation.navigate("Post", { post })}
      >
        <View className="h-full w-[40%] bg-gray-300 flex justify-center items-center">
          {post.image.imageURL ? (
            <Image
              className="w-full h-auto"
              style={{ aspectRatio: imageAspectRatio }}
              source={{ uri: post.image.imageURL }}
            />
          ) : (
            <Image
              className="w-full h-full"
              source={require("../assets/images//other/default_image.png")}
            />
          )}
        </View>

        <Pressable
          onPress={() => handleLikePost(post._id, userId)}
          className="absolute top-0 left-0 m-2 h-10 w-10"
        >
          <View className="w-full h-full flex-row justify-center items-center">
            <View className="absolute bg-gray-200 opacity-60 w-full h-full rounded-full"></View>
            <Ionicons
              className=" text-gray-500"
              name={isLiked ? `heart` : `heart-outline`}
              color={isLiked ? `#ed0000` : `#000`}
              size={22}
            />
            {/* <View className="absolute h-9 flex justify-center items-center -right-1 -top-0">
              <Text className="text-base">{numOfLikes}</Text>
            </View> */}
          </View>
        </Pressable>
        <View className="w-[60%] h-full justify-center p-2">
          <Text
            className="text-[18px] font-bold text-[#2D0C57]"
            numberOfLines={1}
          >
            {post.title}
          </Text>
          <Text className="text-[#9586A8]">
            <Text className="text-[#2D0C57] font-bold ">Duration: </Text>{" "}
            {post.duration} minutes
          </Text>
          <Text className="text-[#9586A8] mt-1">
            <Text className="text-[#2D0C57] font-bold ">Likes: </Text>{" "}
            {numOfLikes}
          </Text>
          <Text className="text-gray-800" numberOfLines={3}>
            {post?.description}
          </Text>

          {userId === post?.author.userId && (
            <View className="flex-row gap-2 absolute top-0 right-0 p-2">
              <Pressable
                onPress={() =>
                  navigation.navigate("Create Post", {
                    post,
                    action: "delete",
                  })
                }
              >
                <Ionicons
                  className=" text-gray-500"
                  name="trash-outline"
                  size={22}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  navigation.navigate("Create Post", {
                    post,
                    action: "edit",
                  })
                }
              >
                <Ionicons
                  className=" text-gray-500"
                  name="create-outline"
                  size={22}
                />
              </Pressable>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default PostHorizontal;
