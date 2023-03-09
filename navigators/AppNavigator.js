import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./TabsNavigator";
import CreatePost from "../screens/CreatePost";
import PostScreen from "../screens/PostScreen";
import SubCategoryScreen from "../screens/SubCategoryScreen";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/state/auth";
import EditProfile from "../screens/EditProfile";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsNavigator from "./SettingsNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SurveyScreen from "../screens/SurveyScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  // const isProfileFilled = useSelector((state) => state.auth.user.fullName);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
      initialRouteName={``}
    >
      <Drawer.Screen name="Home" component={AppStackNavigator} />

      <Drawer.Screen
        name="Settings"
        options={{
          swipeEnabled: false,
          gestureEnabled: false,
        }}
        component={SettingsNavigator}
      />
      <Drawer.Screen
        name="About"
        options={{
          swipeEnabled: false,
          gestureEnabled: false,
        }}
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
};

const AppStackNavigator = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const isProfileFilled = useSelector((state) => state.auth.isProfileFilled);
  const isSurveyDone = useSelector((state) => state.auth.isSurveyDone);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={
        isProfileFilled
          ? isSurveyDone
            ? "Home Screen"
            : "Survey"
          : "Edit Profile"
      }
    >
      <Stack.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="Home Screen"
        component={BottomTabs}
        initialParams={{ userId }}
      />
      <Stack.Screen
        name="Create Post"
        options={{ headerShown: false }}
        component={CreatePost}
        initialParams={{ userId }}
      />
      <Stack.Screen
        name="Edit Profile"
        options={{ headerShown: false }}
        component={EditProfile}
        initialParams={{ action: "fill" }}
      />
      <Stack.Screen
        name="Survey"
        options={{ headerShown: false }}
        component={SurveyScreen}
        initialParams={{ action: "fill" }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Post"
        component={PostScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Subcategory"
        component={SubCategoryScreen}
        initialParams={{ userId }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
