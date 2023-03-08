import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import CategoriesScreen from "../screens/CategoriesScreen";
import ChatScreen from "../screens/ChatScreen";
import CreatePost from "../screens/CreatePost";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const homeName = "Feed";
const loginName = "Login";
const settingsName = "Settings";
const categoriesName = "Categories";

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === settingsName) {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (rn === categoriesName) {
            // iconName = focused ? 'settings' : 'settings-outline';
            iconName = focused ? "apps" : "apps-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7203FF",
        tabBarInactiveTintColor: "#9586A8",
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: { padding: 5, height: 90 },
        headerShown: false,
      })}
    >
      <Tab.Screen
        options={{ tabBarShowLabel: false }}
        name={homeName}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ tabBarShowLabel: false }}
        name={categoriesName}
        component={CategoriesScreen}
      />
      <Tab.Screen
        options={{ tabBarShowLabel: false }}
        name={settingsName}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
