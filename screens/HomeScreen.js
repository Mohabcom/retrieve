import { useCallback, useEffect, useState } from "react";
import {
  Text,
  Pressable,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllPosts } from "../utils/requests/requests";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPosts } from "../redux/state/auth";
import PostVertical from "../components/PostVertical";

const HomeScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.auth.posts);

  const reloadPosts = async () => {
    const data = await getAllPosts();
    dispatch(setPosts({ posts: data }));
  };

  // Scroll refresh
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    reloadPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const reloadPostsWhenPageLoaded = async () => {
      dispatch(setLoading(true));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 15000);
      await reloadPosts();
      dispatch(setLoading(false));
    };
    reloadPostsWhenPageLoaded();
  }, []);

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="bg-[#F6F5F5] flex-1"
    >
      <View className="flex-row justify-between items-center my-1">
        <Pressable onPress={() => navigation.openDrawer()}>
          <Text className="text-3xl font-bold text-[#2D0C57] p-1 ml-3">
            Retrieve
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Create Post")}>
          <Text className="text-[#2D0C57] text-5xl p-1 mr-3">+</Text>
        </Pressable>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="mb-24">
          {/* <FlatList
            keyExtractor={(item) => item.id}
            data={posts}
            renderItem={({ item }) => ( */}
          {posts.map((item, index) => {
            return <PostVertical item={item} key={index} />;
          })}
          {/* )}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
