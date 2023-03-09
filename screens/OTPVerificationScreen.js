import { useNavigation } from "@react-navigation/core";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useDispatch } from "react-redux";
import { setLoading, setSignIn } from "../redux/state/auth";
import { verifyOTP, sendNewOTPEmail } from "../utils/requests/requests";

const OTPVerificationScreen = ({ route }) => {
  const { data } = route.params;
  const [code, setCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumLength = 6;
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef();

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);

  const boxDigit = (_, index) => {
    const emptyInput = "";
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const StyledSplitBoxes =
      isInputBoxFocused && isValueFocused
        ? "border-2 border-gray-200 rounded p-3 min-w-[13%] min-h-[60px] mx-1"
        : "border-2 border-gray-500 rounded p-3 min-w-[13%] min-h-[60px] mx-1";
    return (
      <View className={`${StyledSplitBoxes}`} key={index}>
        <Text className="text-xl text-center text-black">{digit}</Text>
      </View>
    );
  };

  const dispatch = useDispatch();

  const handleSendNewOTP = async (_id, email) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
    try {
      setCode("");
      await sendNewOTPEmail(_id, email);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  const handleVerify = async (_id, otp) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
    try {
      const data = await verifyOTP(_id, otp);
      const user = data
        ? {
            user: data.user,
          }
        : {};
      dispatch(setSignIn(user));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" scrollEnabled={false}>
      <SafeAreaView className="flex justify-center items-center h-screen w-screen bg-white">
        <KeyboardAvoidingView
          className="flex justify-between items-center w-full h-full"
          behavior="padding"
        >
          <View className="flex justify-center items-center mt-8">
            <Text className="text-3xl tracking-wider text-center font-extrabold text-black mb-1">
              Verify Your Account
            </Text>
            <Text className="text-lg text-center text-gray-500 mb-3 px-5">
              An Email Containing your Verification Code has been sent to:{" "}
              {data.user.email}
            </Text>
            <View className="flex items-center justify-center w-[calc(100%-1.25rem)] m-5">
              <Pressable className="w-full flex-row justify-evenly">
                {boxArray.map(boxDigit)}
              </Pressable>
              <TextInput
                className="text-black bg-gray-200 p-4 rounded-lg mb-3 w-full h-24 absolute opacity-0 text-3xl"
                value={code}
                onChangeText={setCode}
                maxLength={maximumLength}
                ref={inputRef}
                onBlur={handleOnBlur}
                keyboardType={"number-pad"}
              />
            </View>
          </View>

          <View className="w-full p-5 mt-2">
            <Pressable
              className="p-5 mb-2"
              onPress={() => handleSendNewOTP(data.user._id, data.user.email)}
            >
              <Text className="text-[#7203FF] text-[18px] text-center font-bold">
                Send Another Code
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleVerify(data.user._id, code)}
              className="w-full p-4 bg-[#7203FF] rounded-xl"
            >
              <Text className="text-white text-[20px] text-center font-bold">
                Verify
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default OTPVerificationScreen;
