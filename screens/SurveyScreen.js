import { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import RadioGroup from "react-native-radio-buttons-group";
import { updateProfile } from "../utils/requests/requests";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSignIn } from "../redux/state/auth";

const SurveyScreen = ({ route, navigation }) => {
  const surveyData = useSelector((state) => state.appData.surveyData);
  const dispatch = useDispatch();
  const [action, setAction] = useState(route.params?.action);
  useState(() => {
    setAction(route.params?.action);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [radioButtons, setRadioButtons] = useState(
    surveyData[0].answers.values
  );
  const [selectedRadio, setSelectedRadio] = useState("");
  const [textValue, setTextValue] = useState("");

  const userId = useSelector((state) => state.auth.user._id);
  const fullName = useSelector((state) => state.auth.user.fullName);
  const about = useSelector((state) => state.auth.user.about);
  const address = useSelector((state) => state.auth.user.address);
  const dateOfBirth = useSelector((state) => state.auth.user.dateOfBirth);
  const gender = useSelector((state) => state.auth.user.gender);
  let isSurveyDone = false;

  const updateIsSurveyDone = async (isSurveyDone) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
    try {
      const updatedProfile = await updateProfile(
        userId,
        fullName,
        about,
        address,
        dateOfBirth,
        gender,
        isSurveyDone
      );
      if (updatedProfile) {
        dispatch(setSignIn({ user: updatedProfile }));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  const handleButton = () => {
    if (selectedRadio || textValue) {
      if (currentIndex !== surveyData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedRadio("");
        setTextValue("");
        if (surveyData[currentIndex + 1].answers.type === "radio") {
          setRadioButtons(surveyData[currentIndex + 1].answers.values);
        }
      } else {
        isSurveyDone = true;
        updateIsSurveyDone(isSurveyDone);
        navigation.navigate("Home Screen");
      }
    }
  };

  function onPressRadioButton() {
    const selected = radioButtons.filter((item) => item.selected === true);
    setSelectedRadio(selected);
  }
  return (
    <SafeAreaView className="flex-1 justify-between bg-white">
      <KeyboardAvoidingView
        className="flex-1 justify-between bg-white"
        behavior="padding"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          {/* STATUS BAR FIX */}
          <View className={`${Platform.OS === "android" ? "h-5" : ""}`}></View>

          {/* HEADER */}
          <View className="w-full flex-row justify-start items-center my-2">
            {action === "not-first-time" && (
              <Pressable
                className="px-5 py-2 z-10 h-12"
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back-outline" size={26} />
              </Pressable>
            )}
            <View
              className={`flex-row justify-center items-center w-full h-10 ${
                action === "not-first-time" && "absolute"
              }`}
            >
              <Text className="text-lg text-center font-bold pt-2">Survey</Text>
            </View>
          </View>

          <View className="flex items-center justify-between w-full">
            <View className="w-screen p-5 flex justify-start">
              <Text className="text-2xl tracking-wider text-center font-extrabold text-black">
                {surveyData[currentIndex].question}
              </Text>
            </View>
            <View className="px-4 w-full">
              {surveyData[currentIndex].answers.type === "radio" ? (
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={onPressRadioButton}
                />
              ) : (
                <View className="flex-row justify-center items-center">
                  <TextInput
                    keyboardType={"number-pad"}
                    className="text-black text-center bg-gray-200 p-4 rounded-lg text-base z-10 max-w-[50px]"
                    value={textValue}
                    onChangeText={(text) => {
                      setTextValue(text);
                    }}
                    placeholder="0"
                    maxLength={2}
                  />
                  <Text className="ml-1">kw/h</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <View className="w-full p-5">
          {currentIndex !== 0 && (
            <Pressable
              onPress={() => {
                setCurrentIndex(currentIndex - 1);
              }}
              className="w-full p-4 border-2 border-[#7203FF] rounded-xl mb-2"
            >
              <Text className="text-[#7203FF] text-[20px] text-center font-bold">
                Previous Question
              </Text>
            </Pressable>
          )}
          <Pressable
            onPress={handleButton}
            className={`w-full p-4 rounded-xl ${
              surveyData[currentIndex].answers.type === "radio"
                ? selectedRadio
                  ? "bg-[#7203FF]"
                  : "bg-gray-500"
                : textValue
                ? "bg-[#7203FF]"
                : "bg-gray-500"
            }`}
          >
            <Text className="text-white text-[20px] text-center font-bold">
              {currentIndex !== surveyData.length - 1
                ? "Next Question"
                : "Finish Survey"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SurveyScreen;
