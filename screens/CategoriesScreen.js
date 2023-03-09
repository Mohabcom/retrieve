import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { setLoading } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../utils/requests/requests";

const CategoriesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const [metal, setMetal] = useState([]);
  const [numberOfPostsInMetal, setNumberOfPostsInMetal] = useState("0");

  const [cloth, setCloth] = useState([]);
  const [numberOfPostsInCloth, setNumberOfPostsInCloth] = useState("0");

  const [wood, setWood] = useState([]);
  const [numberOfPostsInWood, setNumberOfPostsInWood] = useState("0");

  const [plastic, setPlastic] = useState([]);
  const [numberOfPostsInPlastic, setNumberOfPostsInPlastic] = useState("0");

  const [glass, setGlass] = useState([]);
  const [numberOfPostsInGlass, setNumberOfPostsInGlass] = useState("0");

  const [paper, setPaper] = useState([]);
  const [numberOfPostsInPaper, setNumberOfPostsInPaper] = useState("0");

  const categorizeAllPosts = async () => {
    const metalResult = posts.filter((obj) => obj.category === "metal");
    const clothResult = posts.filter((obj) => obj.category === "cloth");
    const woodResult = posts.filter((obj) => obj.category === "wood");
    const plasticResult = posts.filter((obj) => obj.category === "plastic");
    const glassResult = posts.filter((obj) => obj.category === "glass");
    const paperResult = posts.filter((obj) => obj.category === "paper");

    setMetal(metalResult);
    setNumberOfPostsInMetal(metalResult.length);

    setCloth(clothResult);
    setNumberOfPostsInCloth(clothResult.length);

    setWood(woodResult);
    setNumberOfPostsInWood(woodResult.length);

    setPlastic(plasticResult);
    setNumberOfPostsInPlastic(plasticResult.length);

    setGlass(glassResult);
    setNumberOfPostsInGlass(glassResult.length);

    setPaper(paperResult);
    setNumberOfPostsInPaper(paperResult.length);
  };

  const reloadPosts = async () => {
    const data = await getAllPosts();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    const categorizeWhenPageLoaded = async () => {
      await categorizeAllPosts();
    };
    categorizeWhenPageLoaded();
  }, []);

  // Scroll refresh
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
    setRefreshing(true);
    reloadPosts;
    categorizeAllPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    dispatch(setLoading(false));
  }, []);

  return (
    <SafeAreaView className="h-screen w-screen">
      {/* STATUS BAR FIX */}
      <View className={`${Platform.OS === "android" ? "h-5" : ""}`}></View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="bg-[#F6F5F5]"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-2">
          <Text className="text-3xl mb-12 ml-2">Categories</Text>

          <View className="flex-row flex-wrap mb-12 justify-around items-center gap-4">
            <View className="w-[44%] border-[#D9D0E3] border-2 rounded-xl overflow-hidden h-[185px]">
              <TouchableOpacity
                className="flex justify-between w-full h-full"
                onPress={() =>
                  navigation.navigate("Subcategory", {
                    posts: metal,
                    category: "metal",
                  })
                }
              >
                <Image
                  className="object-cover w-full h-[125px]"
                  source={
                    require("../assets/images//materials/metals.jpg")
                    // {uri: "https://firebasestorage.googleapis.com/v0/b/recycling-app-3396f.appspot.com/o/metals.jpg?alt=media&token=00d0d2bd-70a6-4024-ba8a-2d647038ad84",}
                  }
                />
                <View className="p-2">
                  <Text className="font-bold text-[#2D0C57]">Metals</Text>
                  <Text className="text-xs text-[#9586A8]">{`(${numberOfPostsInMetal})`}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="w-[44%] border-[#D9D0E3] border-2 rounded-xl overflow-hidden h-[185px]">
              <TouchableOpacity
                className="flex justify-between w-full h-full"
                onPress={() =>
                  navigation.navigate("Subcategory", {
                    posts: cloth,
                    category: "cloth",
                  })
                }
              >
                <Image
                  className="object-cover w-full h-[125px]"
                  source={
                    require("../assets/images/materials/cloth.jpg")
                    // { uri: "https://firebasestorage.googleapis.com/v0/b/recycling-app-3396f.appspot.com/o/cloth.jpg?alt=media&token=6040a858-ed8c-4fd8-822c-5a82f30b8508", }
                  }
                />
                <View className="p-2">
                  <Text className="font-bold text-[#2D0C57]">Cloth</Text>
                  <Text className="text-xs text-[#9586A8]">{`(${numberOfPostsInCloth})`}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="w-[44%] border-[#D9D0E3] border-2 rounded-xl overflow-hidden h-[185px]">
              <TouchableOpacity
                className="flex justify-between w-full h-full"
                onPress={() =>
                  navigation.navigate("Subcategory", {
                    posts: wood,
                    category: "wood",
                  })
                }
              >
                <Image
                  className="object-cover w-full h-[125px]"
                  source={
                    require("../assets/images/materials/wood.jpg")
                    // { uri: "https://firebasestorage.googleapis.com/v0/b/recycling-app-3396f.appspot.com/o/wood.jpg?alt=media&token=597adef2-5863-45b3-90c1-98d806c0a581", }
                  }
                />
                <View className="p-2">
                  <Text className="font-bold text-[#2D0C57]">Wood</Text>
                  <Text className="text-xs text-[#9586A8]">{`(${numberOfPostsInWood})`}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="w-[44%] border-[#D9D0E3] border-2 rounded-xl overflow-hidden h-[185px]">
              <TouchableOpacity
                className="flex justify-between w-full h-full"
                onPress={() =>
                  navigation.navigate("Subcategory", {
                    posts: plastic,
                    category: "plastic",
                  })
                }
              >
                <Image
                  className="object-cover w-full h-[125px]"
                  source={
                    require("../assets/images/materials/plastic.jpg")
                    // {uri: "https://firebasestorage.googleapis.com/v0/b/recycling-app-3396f.appspot.com/o/plastic.jpg?alt=media&token=d0a84364-69f1-4382-9986-8950134e3da2",}
                  }
                />
                <View className="p-2">
                  <Text className="font-bold text-[#2D0C57]">Plastic</Text>
                  <Text className="text-xs text-[#9586A8]">{`(${numberOfPostsInPlastic})`}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="w-[44%] border-[#D9D0E3] border-2 rounded-xl overflow-hidden h-[185px]">
              <TouchableOpacity
                className="flex justify-between w-full h-full"
                onPress={() =>
                  navigation.navigate("Subcategory", {
                    posts: glass,
                    category: "glass",
                  })
                }
              >
                <Image
                  className="object-cover w-full h-[125px]"
                  source={
                    require("../assets/images/materials/glass.png")
                    // {uri: "https://firebasestorage.googleapis.com/v0/b/recycling-app-3396f.appspot.com/o/glass.png?alt=media&token=1f8fea99-1a4c-40c4-9286-a62d9062aada",}
                  }
                />
                <View className="p-2">
                  <Text className="font-bold text-[#2D0C57]">Glass</Text>
                  <Text className="text-xs text-[#9586A8]">{`(${numberOfPostsInGlass})`}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="w-[44%] border-gray-300 border-2 rounded overflow-hidden h-[185px]">
              <TouchableOpacity
                className="flex justify-between w-full h-full"
                onPress={() =>
                  navigation.navigate("Subcategory", {
                    posts: paper,
                    category: "paper",
                  })
                }
              >
                <Image
                  className="object-cover w-full h-[125px]"
                  source={
                    require("../assets/images/materials/paper.jpg")
                    // { uri: "https://firebasestorage.googleapis.com/v0/b/recycling-app-3396f.appspot.com/o/paper.jpg?alt=media&token=3bec70ab-dea9-4786-b914-816af12fc0e6", }
                  }
                />
                <View className="p-2">
                  <Text className="font-bold text-[#2D0C57]">Paper</Text>
                  <Text className="text-xs text-[#9586A8]">{`(${numberOfPostsInPaper})`}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
