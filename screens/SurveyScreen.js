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
import { setLoading, setSignIn } from "../redux/state";

const questions = [
  {
    id: "1",
    question: "How many meals containing meat do you eat per week ?",
    answers: {
      type: "radio",
      values: [
        { id: 1, label: "Daily", value: "daily" },
        { id: 2, label: "Every 2 days", value: "every-2-days" },
        { id: 3, label: "Twice a week", value: "twice-a-week" },
        { id: 4, label: "Vegan", value: "vegan" },
      ],
    },
  },
  {
    id: "2",
    question:
      "How many times do use a dishwasher or a washing machine or both?",
    answers: {
      type: "radio",
      values: [
        { id: 1, label: "Every 2 days", value: "every-2-days" },
        { id: 2, label: "Daily", value: "daily" },
        { id: 3, label: "Twice a week", value: "twice-a-week" },
        { id: 4, label: "Never", value: "never" },
      ],
    },
  },
  {
    id: "3",
    question: "How often do you recycle?",
    answers: {
      type: "radio",
      values: [
        { id: 1, label: "Sometimes", value: "sometimes" },
        { id: 2, label: "Often", value: "often" },
        { id: 3, label: "Rarely", value: "rarely" },
        { id: 4, label: "Never", value: "never" },
      ],
    },
  },
  {
    id: "4",
    question: "Do You travel using plane?",
    answers: {
      type: "radio",
      values: [
        { id: 1, label: "Often", value: "often" },
        { id: 2, label: "Sometimes", value: "sometimes" },
        { id: 3, label: "Rarely", value: "rarely" },
        { id: 4, label: "Never", value: "never" },
      ],
    },
  },
  {
    id: "5",
    question: "How many hours of transportation?",
    answers: {
      type: "radio",
      values: [
        {
          id: 1,
          label: "from 320 to 450 min daily",
          value: "from 320 to 450 min daily",
        },
        { id: 2, label: "220 to 320 min daily", value: "220 to 320 min daily" },
        { id: 3, label: "121 to 220 min daily", value: "121 to 220 min daily" },
        { id: 4, label: "45 to 120min daily", value: "45 to 120min daily" },
      ],
    },
  },
  {
    id: "6",
    question: "What is the amount of natural gas do you use per month?",
    answers: {
      type: "text",
    },
  },
  {
    id: "7",
    question: "What is the amount of Electricity do you use per month?",
    answers: {
      type: "text",
    },
  },
  {
    id: "8",
    question: "What is the amount of Fuel do you use per month?",
    answers: {
      type: "text",
    },
  },
];

const SurveyScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(route.params?.action);
  useState(() => {
    setAction(route.params?.action);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [radioButtons, setRadioButtons] = useState(questions[0].answers.values);
  const [selectedRadio, setSelectedRadio] = useState("");
  const [textValue, setTextValue] = useState("");

  const userId = useSelector((state) => state.user._id);
  const fullName = useSelector((state) => state.user.fullName);
  const about = useSelector((state) => state.user.about);
  const address = useSelector((state) => state.user.address);
  const dateOfBirth = useSelector((state) => state.user.dateOfBirth);
  const gender = useSelector((state) => state.user.gender);
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
      if (currentIndex !== questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedRadio("");
        setTextValue("");
        if (questions[currentIndex + 1].answers.type === "radio") {
          setRadioButtons(questions[currentIndex + 1].answers.values);
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
                {questions[currentIndex].question}
              </Text>
            </View>
            <View className="px-4 w-full">
              {questions[currentIndex].answers.type === "radio" ? (
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
              questions[currentIndex].answers.type === "radio"
                ? selectedRadio
                  ? "bg-[#7203FF]"
                  : "bg-gray-500"
                : textValue
                ? "bg-[#7203FF]"
                : "bg-gray-500"
            }`}
          >
            <Text className="text-white text-[20px] text-center font-bold">
              {currentIndex !== questions.length - 1
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
