import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import EditProfile from "../screens/EditProfile";
import SettingsScreen from "../screens/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
      initialRouteName={``}
    >
      <Stack.Screen name="Settings Screen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
