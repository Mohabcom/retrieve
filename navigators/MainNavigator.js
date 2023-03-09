import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/state/auth";
import { setAppData } from "../redux/state/appData";
import { useState } from "react";
import { getServerState, getAppData } from "../utils/requests/requests";
import NetInfo from "@react-native-community/netinfo";

const MainStackNavigator = () => {
  const dispatch = useDispatch();
  const onAppLoad = async () => {
    try {
      await getServerState();
      const data = await getAppData();
      dispatch(setAppData(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useState(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected === true) {
        Alert.alert(
          "No Internet Connection",
          "Please Check your Internet Connection.",
          [],
          { cancelable: false }
        );
      }
    });
    unsubscribe();

    onAppLoad();
  }, []);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <NavigationContainer>
      {/* Conditional stack navigator rendering based on login state */}

      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainStackNavigator;
