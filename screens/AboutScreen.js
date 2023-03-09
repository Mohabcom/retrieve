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

const AboutScreen = ({ route, navigation }) => {
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
            <Text className="text-2xl mb-4 tracking-wider font-extrabold text-[#6025ad]">
              About Us
            </Text>
            <Text className="text-base tracking-wider text-gray-700">
              Retrieve is a group of students who are passionate about making a
              difference in our environment. We are dedicated to raising
              awareness and advocating for a cleaner and healthier environment
              through our campaigns. Our mission is to promote sustainable
              living, educate the public on environmental issues, and empower
              individuals to take part in the fight against climate change. Join
              us today and help make the world a better place.
            </Text>
            <Text className="text-2xl mt-8 mb-4 tracking-wider font-extrabold text-[#6025ad]">
              Who We Are
            </Text>
            <Text className="text-base tracking-wider text-gray-700">
              Retrieve is a student-led campaign aimed at raising awareness of
              the importance of preserving and protecting the environment. We
              are striving to make a positive impact on the world by encouraging
              people to use green and sustainable practices. Our mission is to
              motivate people of all ages to take action and make a difference.
              We provide educational resources, interactive activities and
              online resources to help people better understand the importance
              of environmental conservation. Join us today and help us reach our
              goal of a cleaner and greener world.
            </Text>
            <Text className="text-2xl mt-8 mb-4 tracking-wider font-extrabold text-[#6025ad]">
              What We Do
            </Text>
            <Text className="text-3xl mt-2 mb-5 tracking-wider font-extrabold text-[#7203FF]">
              It starts with you.
            </Text>
            <Text className="text-base tracking-wider text-gray-700">
              Under the motto "It stars with you", our team is spreading
              awareness about the issues threatening our environment like
              climate change and how we can make a difference. Not many people
              are cognizant of the power of recycling and how it contributes
              greatly to the solution. Accordingly, we decided to take action.
              An app was created to guide people through the infinite ways in
              which they can recycle items made of plastic, wood, glass, etc..
              As they recycle, they can end up receiving gifts! Learn more about
              the app here. To spread our movement, we hold events and
              workshops. We could discuss and educate people about a certain
              problem or make fun workshops in which we teach them how to
              recycle.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
