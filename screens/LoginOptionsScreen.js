import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";

const LoginOptionsScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex justify-center items-center w-screen h-screen mt-4 bg-white">
      <Image
        className="w-20 h-20 mb-3"
        source={require("../assets/images/logo.png")}
      />
      <Text className="text-4xl tracking-wider text-center font-extrabold text-black">
        Get Started
      </Text>

      <View className="flex justify-center items-center w-full p-5">
        <Pressable className="p-4 bg-white border-[1px] border-gray-300 rounded-xl w-full flex flex-row items-center justify-center mb-4">
          <Image
            className="w-6 h-6 mr-1"
            source={require("../assets/images/facebook-logo.png")}
          />
          <Text className="text-black text-[15px] text-center">
            Continue with Facebook
          </Text>
        </Pressable>
        <Pressable className="p-4 bg-white border-[1px] border-gray-300 rounded-xl w-full flex flex-row items-center justify-center mb-4">
          <Image
            className="w-6 h-6 mr-1"
            source={require("../assets/images/google-logo.png")}
          />
          <Text className="text-black text-[15px] text-center">
            Continue with Google
          </Text>
        </Pressable>
        <Pressable className="p-4 bg-white border-[1px] border-gray-300 rounded-xl w-full flex flex-row items-center justify-center">
          <Image
            className="w-6 h-6 mr-1"
            source={require("../assets/images/apple-logo.png")}
          />
          <Text className="text-black text-[15px] text-center">
            Continue with Apple
          </Text>
        </Pressable>
      </View>
      <View className="w-full flex-row justify-between items-center p-5">
        <View className=" bg-gray-300 h-[1px] w-[40%]"></View>
        <View>
          <Text className="text-xl text-gray-600 font-semibold">or</Text>
        </View>
        <View className=" bg-gray-300 h-[1px] w-[40%]"></View>
      </View>
      <View className="flex items-center justify-center w-full p-5">
        <Pressable
          onPress={() => navigation.navigate("Login")}
          className="w-full p-4 bg-[#7203FF] rounded-xl tracking-widest"
        >
          <Text className="text-white text-[20px] text-center font-bold">
            Sign In with Password
          </Text>
        </Pressable>
        <Text className="text-lg text-gray-600 mt-5">
          Don't have an account?{" "}
          <Text
            className="text-[#7203FF]"
            onPress={() => navigation.navigate("Register")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginOptionsScreen;
