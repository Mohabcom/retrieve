import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useDispatch } from "react-redux";
import { setLoading, setSignIn } from "../redux/state";
import { register } from "../utils/requests/requests";
import Ionicons from "@expo/vector-icons/Ionicons";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleSignUp = async (email, password, userName) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
    const data = await register(email, password, userName);
    dispatch(setLoading(false));
    if (data) {
      navigation.navigate("OTPVerification", { data });
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={false}>
      <View className="flex-1 justify-center items-center h-screen w-screen bg-white mt-7">
        <View className="flex justify-center items-center ">
          <Image
            className="w-20 h-20 mb-3"
            source={require("../assets/images/logo.png")}
          />
          <Text className="text-3xl tracking-wider text-center font-extrabold text-black mb-3">
            Create a New Account
          </Text>
        </View>

        <KeyboardAvoidingView className="flex w-full" behavior="padding">
          <View className="w-full p-5">
            <View className="relative mb-3">
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                className="text-black bg-gray-200 p-4 rounded-lg pl-12 z-10"
              />
              <View className="absolute top-0 left-0 h-full w-12 flex justify-center items-center z-20">
                <Ionicons
                  className=" text-gray-500"
                  name="mail"
                  size={18}
                  color={"#000"}
                />
              </View>
            </View>
            <View className="relative mb-3">
              <TextInput
                placeholder="Username"
                value={userName}
                onChangeText={(text) => setUserName(text)}
                className="text-black bg-gray-200 p-4 rounded-lg pl-12 z-10"
              />
              <View className="absolute top-0 left-0 h-full w-12 flex justify-center items-center z-20">
                <Ionicons
                  className=" text-gray-500"
                  name="person-circle"
                  size={21}
                  color={"#000"}
                />
              </View>
            </View>
            <View className="relative mb-3">
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                className="text-black bg-gray-200 p-4 rounded-lg pl-12 z-10"
                secureTextEntry
              />
              <View className="absolute top-0 left-0 h-full w-12 flex justify-center items-center z-20">
                <Ionicons
                  className=" text-gray-500"
                  name="lock-closed"
                  size={18}
                  color={"#000"}
                />
              </View>
            </View>
          </View>

          <View className="w-full px-5 mt-2 mb-5">
            <Pressable
              onPress={() => handleSignUp(email, password, userName)}
              className="w-full p-4 bg-[#7203FF] rounded-xl"
            >
              <Text className="text-white text-[20px] text-center font-bold">
                Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        <View className="w-full flex-row justify-between items-center px-5 pb-2">
          <View className="bg-gray-300 h-[1px] w-[25%]"></View>
          <View>
            <Text className="text-xl text-gray-600">or continue with</Text>
          </View>
          <View className=" bg-gray-300 h-[1px] w-[25%]"></View>
        </View>

        <View className="flex-row justify-center items-center w-full px-5 py-2">
          <Pressable className="px-7 py-4 bg-white border-[1px] border-gray-300 rounded-3xl flex flex-row items-center justify-center">
            <Image
              className="w-7 h-7"
              source={require("../assets/images/facebook-logo.png")}
            />
          </Pressable>
          <Pressable className="px-7 py-4 bg-white border-[1px] border-gray-300 rounded-3xl flex flex-row items-center justify-center mx-5">
            <Image
              className="w-7 h-7"
              source={require("../assets/images/google-logo.png")}
            />
          </Pressable>
          <Pressable className="px-7 py-4 bg-white border-[1px] border-gray-300 rounded-3xl flex flex-row items-center justify-center">
            <Image
              className="w-7 h-7"
              source={require("../assets/images/apple-logo.png")}
            />
          </Pressable>
        </View>
        <Text className="text-lg text-gray-600 pt-2">
          Already have an account?{" "}
          <Text
            className="text-[#7203FF]"
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
