import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { likePost } from "../utils/requests/requests";
import { setPost } from "../redux/state";

const PostVertical = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const item = props.item;
  const userId = useSelector((state) => state.user._id);
  const isLiked = Boolean(item.likes[userId]);
  const numOfLikes = Object.keys(item.likes).length;

  const handleLikePost = async (postId, userId) => {
    const updatedPost = await likePost(postId, userId);
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <View>
      <Pressable
        className="flex items-center justify-start overflow-hidden h-[285px] mx-4 my-1 border-2 border-gray-300 rounded-xl"
        onPress={() => navigation.navigate("Post", { item })}
      >
        <Image
          className="w-[100%] h-[180px]"
          source={
            item.imagePath
              ? { uri: item.imageURL ? item.imageURL : null }
              : require("../assets/images//other/default_image.png")
          }
        />

        <Pressable
          onPress={() => handleLikePost(item._id, userId)}
          className="absolute top-0 left-0 m-3 h-12 w-12"
        >
          <View className="w-full h-full flex-row justify-center items-center">
            <View className="absolute bg-gray-200 opacity-60 w-full h-full rounded-full"></View>
            <Ionicons
              className=" text-gray-500"
              name={isLiked ? `heart` : `heart-outline`}
              color={isLiked ? `#ed0000` : `#000`}
              size={24}
            />
            {/* <View className="absolute h-11 flex justify-center items-center -right-1 -top-0">
              <Text className="text-base">{numOfLikes}</Text>
            </View> */}
          </View>
        </Pressable>

        <View className="w-[100%] p-2">
          <Text
            className="text-2xl font-bold text-[#2D0C57] mr-14"
            numberOfLines={1}
          >
            {item?.title}
          </Text>
          <Text className="text-1xl font-bold uppercase text-gray-400">
            Duration: {item?.duration} minutes
          </Text>
          <Text className="text-1xl font-bold uppercase text-gray-400 mt-1">
            Likes: {numOfLikes}
          </Text>
          {/* <Text className="text-gray-800" numberOfLines={2}>
            {item?.description}
          </Text> */}
          {userId === item?.author.userId && (
            <View className="flex-row gap-2 absolute top-0 right-0 p-2">
              <Pressable
                onPress={() =>
                  navigation.navigate("Create Post", {
                    item,
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
                    item,
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

export default PostVertical;
