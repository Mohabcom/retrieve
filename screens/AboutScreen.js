import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

const AboutScreen = ({ route, navigation }) => {
  const aboutData = useSelector((state) => state.appData.aboutData);

  return (
    <SafeAreaView className="flex-1 justify-between bg-white">
      {/* STATUS BAR FIX */}
      <View className={`${Platform.OS === "android" ? "h-5" : ""}`}></View>

      {/* HEADER */}
      <View className="w-full flex-row justify-start items-center my-2">
        <Pressable
          className="px-5 py-2 z-10 h-12"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={26} />
        </Pressable>
        <View className="flex-row justify-center items-center w-full h-10 absolute">
          <Text className="text-lg text-center font-bold pt-2">About</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex items-center justify-between w-full">
          <View className="w-screen px-7 flex justify-start pb-24">
            {aboutData.map((item) => {
              if (item.type === "h1") {
                return (
                  <Text
                    key={item.id}
                    className="text-2xl mt-8 mb-4 tracking-wider font-extrabold text-[#6025ad]"
                  >
                    {item.text}
                  </Text>
                );
              } else if (item.type === "h2") {
                return (
                  <Text
                    key={item.id}
                    className="text-3xl mt-2 mb-5 tracking-wider font-extrabold text-[#7203FF]"
                  >
                    {item.text}
                  </Text>
                );
              } else if (item.type === "p") {
                return (
                  <Text
                    key={item.id}
                    className="text-base tracking-wider text-gray-700"
                  >
                    {item.text}
                  </Text>
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
