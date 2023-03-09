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
import { useSelector } from "react-redux";

const WalkthroughScreen = () => {
  const walkthroughScreenSlides = useSelector(
    (state) => state.appData.walkthroughScreenSlides
  );
  const { width, height } = Dimensions.get("screen");
  const navigation = useNavigation();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const walkthroughScreenSlidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  });
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleButton = () => {
    if (currentIndex < walkthroughScreenSlides.length - 1) {
      walkthroughScreenSlidesRef.current.scrollToIndex({
        index: currentIndex + 1,
      });
      setCurrentIndex(currentIndex < 3 ? currentIndex + 1 : currentIndex);
    } else {
      navigation.navigate("Options");
    }
  };
  return (
    <SafeAreaView className="relative h-screen w-screen flex items-center justify-center bg-white">
      <View className="flex items-center justify-end h-full w-full">
        <FlatList
          data={walkthroughScreenSlides}
          renderItem={({ item }) => (
            <View className="w-screen p-5 flex justify-between items-center">
              <View className="h-2/3 flex justify-center items-center">
                {item.image ? (
                  <Image source={item.image} className="w-52 h-52" />
                ) : (
                  <Image source={logo} className="w-32 h-32" />
                )}
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
          ref={walkthroughScreenSlidesRef}
        />
        <Paginator data={walkthroughScreenSlides} scrollX={scrollX} />
        <View className="w-full p-5">
          <Pressable
            onPress={handleButton}
            className="w-full p-4 bg-[#7203FF] rounded-xl"
          >
            <Text className="text-white text-[20px] text-center font-bold">
              {currentIndex < walkthroughScreenSlides.length - 1
                ? "Next"
                : "Get Started"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalkthroughScreen;
