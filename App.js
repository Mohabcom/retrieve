import MainNavigator from "./navigators/MainNavigator";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "./components/Loader";
import { Text } from "react-native";
import { useState } from "react";
import { getServerState } from "./utils/requests/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // const importData = async () => {
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     await AsyncStorage.multiRemove(keys);
  //     const result = await AsyncStorage.multiGet(keys);
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // importData();
  useState(() => {
    getServerState();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <Loader />
          <MainNavigator />
          <StatusBar style="auto" />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
