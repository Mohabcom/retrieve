import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const welcomeScreenTitle = useSelector(
    (state) => state.appData.welcomeScreenTitle
  );
  const welcomeScreenDesc = useSelector(
    (state) => state.appData.welcomeScreenDesc
  );
  return (
    <SafeAreaView className="relative h-screen w-screen border-2 flex items-center justify-center">
      <Image
        className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 h-screen w-screen object-cover object-bottom -z-10"
        source={require("../assets/images/welcome.png")}
      />

      <View className="flex items-center justify-end px-5 py-5 h-full w-full">
        <Text className="text-4xl tracking-wider text-center font-extrabold text-white">
          {welcomeScreenTitle}
        </Text>
        <Text className="text-white my-4">{welcomeScreenDesc}</Text>
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
