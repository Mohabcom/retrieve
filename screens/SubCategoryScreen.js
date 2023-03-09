import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import PostHorizontal from "../components/PostHorizontal";

const SubCategoryScreen = ({ route }) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const allPosts = useSelector((state) => state.auth.posts);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const selectedCategory =
    route.params.category.charAt(0).toUpperCase() +
    route.params.category.slice(1);

  useEffect(() => {
    const categorizeAllPosts = () => {
      const result = allPosts.filter(
        (obj) => obj.category === route.params.category
      );
      setCategoryPosts(result);
    };
    categorizeAllPosts();
  }, [allPosts]);

  return (
    <SafeAreaView className="h-screen w-screen">
      {/* STATUS BAR FIX */}
      <View className={`${Platform.OS === "android" ? "h-5" : ""}`}></View>

      {/* HEADER */}
      {/* <Text className="text-3xl mt-8 mb-2 ml-2 capitalize">
        {selectedCategory}
      </Text>
      <Pressable onPress={() => navigation.navigate("Categories")}>
        <Ionicons
          className=" text-gray-500 p-1"
          name="chevron-back-outline"
          size={26}
        />
      </Pressable> */}
      <View className="w-full flex-row justify-start items-center my-2">
        <Pressable
          className="px-5 py-2 z-10"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={26} />
        </Pressable>
        <View className="flex-row justify-center items-center absolute w-full h-full">
          <Text className="text-lg text-center font-bold">
            {selectedCategory}
          </Text>
        </View>
      </View>

      {/* SEARCH */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className="h-screen w-screen p-5 pt-0"
      >
        <KeyboardAvoidingView
          className="flex justify-between items-center w-full h-full"
          behavior="padding"
        >
          <View className="w-full mt-2">
            <View className="relative mb-3">
              <TextInput
                placeholder="Search"
                value={search}
                onChangeText={(input) => {
                  setSearch(input);
                }}
                className="text-black bg-gray-200 p-4 rounded-full pl-12 pr-4 z-10"
              />
              <View className="absolute top-0 left-1 h-full w-12 flex justify-center items-center z-20">
                <Ionicons
                  className=" text-gray-500"
                  name="search-outline"
                  size={18}
                  color={"#000"}
                />
              </View>
            </View>
          </View>

          <View className="mb-10">
            {/* <FlatList
          keyExtractor={(item) => item.id}
          data={posts}
          extraData={posts}
          renderItem={({ item }) => ( */}
            {categoryPosts
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.title.toLowerCase().includes(search);
              })
              .map((item, index) => {
                return <PostHorizontal item={item} key={index} />;
              })}
            {/* )}
        /> */}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubCategoryScreen;
