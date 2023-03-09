import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import WalkthroughScreen from "../screens/WalkthroughScreen";
import LoginOptions from "../screens/LoginOptionsScreen";
import OTPVerificationScreen from "../screens/OTPVerificationScreen";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/state/auth";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Walkthrough"
        component={WalkthroughScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Options"
        component={LoginOptions}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OTPVerification"
        component={OTPVerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
