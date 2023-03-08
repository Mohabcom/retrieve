import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="relative h-screen w-screen border-2 flex items-center justify-center">
      <Image
        className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 h-screen w-screen object-cover object-bottom -z-10"
        source={require("../assets/images/welcome.png")}
      />

      <View className="flex items-center justify-end px-5 py-5 h-full w-full">
        <Text className="text-4xl tracking-wider text-center font-extrabold text-white">
          Welcome to Retrieve! 👋
        </Text>
        <Text className="text-white my-4">
          Retrieve is a student-led campaign aimed at raising awareness of the
          importance of preserving and protecting the environment. We are
          striving to make a positive impact on the world by encouraging people
          to use green and sustainable practices.
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Walkthrough");
          }}
          className="w-full p-4 bg-[#7203FF] rounded-xl"
        >
          <Text className="text-white text-[20px] text-center font-bold">
            Let's Go!
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
