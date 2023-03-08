import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Progress from "react-native-progress";
import { setSignOut } from "../redux/state";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(setSignOut());
  };
  const userData = useSelector((state) => state.user);

  return (
    <SafeAreaView className="bg-white flex-1">
      {/* STATUS BAR FIX */}
      <View className={`${Platform.OS === "android" ? "h-5" : ""}`}></View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
      >
        <View className="w-screen mt-4 flex-row items-center px-8 py-5">
          <Image
            className="w-28 h-28 rounded-full"
            source={
              userData.profilePicturePath
                ? {
                    uri: userData.profilePictureURL
                      ? userData.profilePictureURL
                      : null,
                  }
                : require("../assets/images//other/profile-pic.png")
            }
          />
          <View className="ml-8">
            <Text className="text-2xl font-bold">
              {userData.fullName ? userData.fullName : "User Name"}
            </Text>
            <Text className="text-gray-500 text-base">
              @{userData.userName}
            </Text>
            <Pressable
              className="p-2"
              onPress={() => {
                navigation.navigate("Edit Profile", {
                  action: "edit",
                });
              }}
            >
              <Text className="text-blue-600 text-base">Edit Profile</Text>
            </Pressable>
          </View>
        </View>
        <View className="w-screen flex-row items-center p-5">
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Posts</Text>
            <Text style={styles.statValue}>1,234</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Liked</Text>
            <Text style={styles.statValue}>123</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>..</Text>
            <Text style={styles.statValue}>25%</Text>
          </View>
        </View>
        <Text style={styles.bio}>{userData.about}</Text>

        <View style={styles.stat}>
          <Text style={styles.statLabel}>Carbon Emission Rate</Text>
          <Text style={styles.statValue}>22%</Text>
          <Pressable
            onPress={() =>
              navigation.navigate("Survey", {
                action: "not-first-time",
              })
            }
          >
            <Progress.Pie
              className="mt-5"
              progress={0.22}
              size={100}
              color={`#7203FF`}
              unfilledColor={`rgba(229, 231, 235, 1)`}
            />
          </Pressable>
        </View>

        <View className="w-full flex justify-center items-center pt">
          <Pressable onPress={handleSignOut} style={styles.button} className="">
            <Text style={styles.buttonText}>Sign out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    color: "#999",
    fontSize: 14,
  },
  statValue: {
    fontSize: 18,
  },
  bio: {
    padding: 20,
    fontSize: 16,
    color: "#333",
  },

  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ProfileScreen;
