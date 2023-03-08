import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";

const SettingsScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView className="bg-white flex-1">
      {/* STATUS BAR FIX */}
      <View className={`${Platform.OS === "android" ? "h-5" : ""}`}></View>

      {/* HEADER */}
      <View className="w-full flex-row justify-start items-center my-2">
        <Pressable
          className="px-5 py-2 z-10"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={26} />
        </Pressable>
        <View className="flex-row justify-center items-center absolute w-full h-full">
          <Text className="text-lg text-center font-bold">Settings</Text>
        </View>
      </View>

      {/* SEARCH */}
      <KeyboardAvoidingView
        className="flex justify-between items-center p-5 pt-0"
        behavior="padding"
      >
        <View className="w-full mt-2">
          <View className="relative mb-3">
            <TextInput
              placeholder="Search Settings"
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
      </KeyboardAvoidingView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className="flex w-full p-5 pt-0"
      >
        {/* EDIT PROFILE */}
        <Pressable
          onPress={() => {
            navigation.navigate("Edit Profile", {
              action: "edit",
            });
          }}
          className="min-h-[75px] text-black flex-row justify-between items-center"
        >
          <View className="flex-row items-center justify-start">
            <View className="w-12 flex justify-center items-center">
              <Ionicons name="person-circle-outline" size={24} color={"#000"} />
            </View>
            <View>
              <Text className="text-[18px] leading-none">Edit Profile</Text>
              <Text className="text-sm">Update your Profile Settings.</Text>
            </View>
          </View>
          <View className="w-10">
            <Ionicons name="chevron-forward-outline" size={24} />
          </View>
        </Pressable>

        {/* RESET PASSWORD */}
        <Pressable
          // onPress={() => {
          //   navigation.navigate("Edit Profile", {
          //     action: "edit",
          //   });
          // }}
          className="min-h-[75px] text-black flex-row justify-between items-center"
        >
          <View className="flex-row items-center justify-start">
            <View className="w-12 flex justify-center items-center">
              <Ionicons name="lock-closed" size={21} color={"#000"} />
            </View>
            <View>
              <Text className="text-[18px] leading-none">Reset Password</Text>
              <Text className="text-sm">Change your Password.</Text>
            </View>
          </View>
          <View className="w-10">
            <Ionicons name="chevron-forward-outline" size={24} />
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
