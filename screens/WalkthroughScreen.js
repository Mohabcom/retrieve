import { useNavigation } from "@react-navigation/native";
import { useState, useRef } from "react";
import logo from "../assets/images/logo.png";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
  Animated,
  Dimensions,
} from "react-native";
import Paginator from "../components/Paginator";
import { Image } from "react-native";

const slides = [
  {
    id: "1",
    title: "Text One",
    image: logo,
  },
  {
    id: "2",
    title: "Text Two",
    image: logo,
  },
  {
    id: "3",
    title: "Text Three",
    image: logo,
  },
];

const WalkthroughScreen = () => {
  const { width, height } = Dimensions.get("screen");
  const navigation = useNavigation();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  });
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleButton = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex < 3 ? currentIndex + 1 : currentIndex);
    } else {
      navigation.navigate("Options");
    }
  };
  return (
    <SafeAreaView className="relative h-screen w-screen flex items-center justify-center bg-white">
      <View className="flex items-center justify-end h-full w-full">
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <View className="w-screen p-5 flex justify-between items-center">
              <View className="h-2/3 flex justify-center items-center">
                <Image source={logo} className="w-32 h-32" />
              </View>
              <Text className="text-4xl tracking-wider text-center font-extrabold text-black">
                {item.title}
              </Text>
            </View>
          )}
          horizontal
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={width}
          snapToAlignment="center"
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig.current}
          onViewableItemsChanged={viewableItemsChanged.current}
          ref={slidesRef}
        />
        <Paginator data={slides} scrollX={scrollX} />
        <View className="w-full p-5">
          <Pressable
            onPress={handleButton}
            className="w-full p-4 bg-[#7203FF] rounded-xl"
          >
            <Text className="text-white text-[20px] text-center font-bold">
              {currentIndex < slides.length - 1 ? "Next" : "Get Started"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalkthroughScreen;
