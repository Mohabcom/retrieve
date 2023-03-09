import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../utils/requests/requests";
import * as Progress from "react-native-progress";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Picker } from "@react-native-picker/picker";
import {
  getDownloadURL,
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { setLoading, setSignIn } from "../redux/state";
import Ionicons from "@expo/vector-icons/Ionicons";
import { storage } from "../utils/firebase-config";

const EditProfile = ({ route, navigation }) => {
  const dispatch = useDispatch();
  // const [cancelCurrent, setCancelCurrent] = useState(false);
  // const richText = useRef();

  const userId = useSelector((state) => state.user._id);
  const userData = useSelector((state) => state.user);
  const isSurveyDone = useSelector((state) => state.isSurveyDone);

  const [action, setAction] = useState("edit");

  const [fullName, setFullName] = useState("");
  const [about, setAbout] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const [oldImagePath, setOldImagePath] = useState("");
  const [deleteOldImage, setDeleteOldImage] = useState(false);
  const [willUploadNewImage, setWillUploadNewImage] = useState(false);

  // Setting states if Editing or Deleting A Post
  useEffect(() => {
    if (route.params.action) {
      setAction(route.params?.action);
    } else {
      setAction("edit");
    }
    if (userData) {
      setFullName(userData.fullName);
      setAbout(userData.about);
      setAddress(userData.address);
      setDateOfBirth(userData.dateOfBirth);
      setGender(userData.gender);
      setOldImagePath(userData.profilePicturePath);
      setImage(userData.profilePictureURL);
    }
  }, []);

  ///////////////////////
  const [uploading, setUploading] = useState(false);

  const handleEditProfile = async (
    userId,
    fullName,
    about,
    address,
    dateOfBirth,
    gender,
    isSurveyDone,
    deleteOldImage,
    oldImagePath,
    willUploadNewImage,
    image
  ) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
    // Delete Old Image
    if (oldImagePath && deleteOldImage) {
      await deleteImage(oldImagePath);
    }
    try {
      // Upload Image
      const { profilePicturePath, profilePictureURL } = willUploadNewImage
        ? await uploadImage(image)
        : { profilePicturePath: "", profilePictureURL: "" };

      // if (cancelCurrent === true) {
      //   dispatch(setLoading(false));
      //   return;
      // }

      if (willUploadNewImage || deleteOldImage) {
        const updatedProfile = await updateProfile(
          userId,
          fullName,
          about,
          address,
          dateOfBirth,
          gender,
          isSurveyDone,
          profilePicturePath,
          profilePictureURL
        );
        if (updatedProfile) {
          dispatch(setSignIn({ user: updatedProfile }));
        }
      } else {
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
      }
      dispatch(setLoading(false));
      navigation.navigate(isSurveyDone ? "Home Screen" : "Survey");
    } catch (error) {
      dispatch(setLoading(false));
      // Alert.alert(error.message);
    }
  };

  // Image Picker and Upload to firebase
  const [image, setImage] = useState("");

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // allowsMultipleSelection: true,
        // selectionLimit: 6,
        aspect: [1, 1],
        quality: 0.3,
      });

      if (result.canceled) return;
      const { uri, type } = result.assets[0];
      const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
      const fileSizeInMB = fileInfo?.size / 1024 / 1024;

      if (!fileInfo?.size) {
        return Alert.alert("Can't select this file as the size is unknown.");
      }

      if (type === "image") {
        if (fileSizeInMB > 1) {
          return Alert.alert(
            `File size too big. Image size must be smaller than 3MB.`
          );
        }
      }

      if (action === "edit") {
        setDeleteOldImage(true); // if clicked then the old image will be deleted on Applying the Edit
      }
      setWillUploadNewImage(true);
      setImage(result.assets[0].uri);
    } catch (e) {
      Alert.alert(e);
    }
  };

  const [progress, setProgress] = useState(0);

  const uploadImage = async (image) => {
    setUploading(true);
    dispatch(setLoading(false));
    const uri = image;
    // const storage = getStorage();
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const reference = ref(storage, `userImages/${userId}/${filename}`);

    // Create Blob
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    // Uploading Image and Assigning New Path to variable
    const uploadFile = uploadBytesResumable(reference, blob);

    uploadFile.on("state_changed", (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress / 100);
    });

    // if (cancelCurrent === true) {
    //   uploadTask.cancel();
    //   setUploading(false);
    //   return;
    // }
    const newImagePath = (await uploadFile).metadata.fullPath;

    const urlreference = ref(storage, newImagePath);

    // Creating URL
    const imageURL = await getDownloadURL(urlreference).then((x) => {
      return x;
    });
    console.log("created download url!!");

    blob.close();
    setUploading(false);
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
    setImage(null);

    // function returns imagePath and the imageUrl variables as an object that can be destructured
    return { profilePicturePath: newImagePath, profilePictureURL: imageURL };
  };
  // Delete Image
  const deleteImage = async (imagePath) => {
    // const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    try {
      await deleteObject(imageRef);
    } catch (error) {
      return Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaView className="bg-white flex-1">
      {/* STATUS BAR FIX */}
      <View className={`${Platform.OS === "android" ? "h-5" : ""}`}></View>

      {/* UPLOADING OVERLAY */}
      {uploading && (
        <View className="z-50">
          <View className="absolute bg-gray-200 opacity-95 w-screen h-screen z-50"></View>
          <View className="absolute w-screen h-screen z-50 flex justify-center items-center">
            <Text className="text-2xl font-bold text-center text-[#7203FF] my-5">
              Uploading Image...
            </Text>
            <Progress.Bar
              className="mt-5"
              progress={progress}
              width={Dimensions.get("window").width * 0.8}
              color={`rgba(114, 3, 255, 1)`}
              unfilledColor={`rgba(229, 231, 235, 1)`}
            />
            <Image
              source={{ uri: image }}
              style={{ width: 120, height: 120 }}
              className="mt-10"
            />
            {/* <Pressable
              onPress={() => {
                setCancelCurrent(true);
                console.log(cancelCurrent);
              }}
              className="my-2 p-3 border-2 border-transparent rounded z-50"
            >
              <Text className="text-[#7203FF] text-[20px] text-center">
                Cancel
              </Text>
            </Pressable> */}
          </View>
        </View>
      )}

      {/* HEADER */}
      <View className="w-full flex-row justify-start items-center my-2">
        {action === "edit" && (
          <Pressable
            className="px-5 py-2 z-10 h-12"
            onPress={() => navigation.navigate("Home Screen")}
          >
            <Ionicons name="chevron-back-outline" size={26} />
          </Pressable>
        )}
        <View
          className={`flex-row justify-center items-center w-full h-10 ${
            action === "edit" && "absolute"
          }`}
        >
          <Text className="text-lg text-center font-bold pt-2">
            {action === "edit" ? "Edit Profile" : "Fill Your Profile"}
          </Text>
        </View>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* PROFILE PICTURE */}
        <View className="w-screen mt-4 flex-row items-center justify-center mb-2">
          <Pressable
            onPress={() => {
              pickImage();
            }}
            className="p-1 border-2 border-transparent rounded"
          >
            <Image
              className="w-32 h-32 rounded-full"
              source={
                image
                  ? {
                      uri: image,
                    }
                  : require("../assets/images//other/profile-pic.png")
              }
            />
            <View className="absolute bottom-0 right-0 flex bg-[#7203FF] justify-end items-center p-2 rounded">
              <Ionicons name="pencil" size={22} color="#fff" />
            </View>
          </Pressable>
        </View>

        <KeyboardAvoidingView className="flex w-full" behavior="padding">
          {/* INPUTS */}
          <View className="w-full p-5">
            <View className="w-full mb-4">
              <TextInput
                className="text-black bg-gray-200 p-4 rounded-lg text-base z-10"
                value={fullName}
                onChangeText={(text) => setFullName(text)}
                placeholder="Full Name (required)"
              />
            </View>
            <View className="w-full mb-4">
              <TextInput
                className="text-black bg-gray-200 p-4 rounded-lg text-base z-10 min-h-[100]"
                multiline={true}
                style={{ textAlignVertical: "top" }}
                placeholder="About (optional)"
                value={about}
                onChangeText={(text) => setAbout(text)}
              />
            </View>
            <View className="w-full mb-4">
              <TextInput
                className="text-black bg-gray-200 p-4 rounded-lg text-base z-10"
                placeholder="Address (optional)"
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
            <View className="text-black bg-gray-200 p-2 rounded-lg">
              <Picker
                style={{
                  backgroundColor: "rgb(229, 231, 235)",
                  padding: 10,
                }}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item
                  label="Prefer Not to Say"
                  value="prefer not to say"
                />
              </Picker>
            </View>
          </View>
          {/* <View className="w-full p-5">
            <View className="relative mb-3">
              <TextInput
                placeholder="Full Name"
                value={fullName}
                onChangeText={(text) => setFullName(text)}
                className="text-black bg-gray-200 p-4 rounded-lg pl-12 z-10"
              />
              <View className="absolute top-0 left-0 h-full w-12 flex justify-center items-center z-20">
                <Ionicons
                  className=" text-gray-500"
                  name="mail"
                  size={18}
                  color={"#000"}
                />
              </View>
            </View>
            <View className="relative mb-3">
              <TextInput
                placeholder="About (optional)"
                value={about}
                onChangeText={(text) => setAbout(text)}
                className="text-black bg-gray-200 p-4 rounded-lg pl-12 z-10"
              />
              <View className="absolute top-0 left-0 h-full w-12 flex justify-center items-center z-20">
                <Ionicons
                  className=" text-gray-500"
                  name="person-circle"
                  size={21}
                  color={"#000"}
                />
              </View>
            </View>
            <View className="relative mb-3">
              <TextInput
                placeholder="Address"
                value={address}
                onChangeText={(text) => setAddress(text)}
                className="text-black bg-gray-200 p-4 rounded-lg pl-12 z-10"
              />
              <View className="absolute top-0 left-0 h-full w-12 flex justify-center items-center z-20">
                <Ionicons
                  className=" text-gray-500"
                  name="lock-closed"
                  size={18}
                  color={"#000"}
                />
              </View>
            </View>
          </View> */}

          <View className="w-full px-5 mt-2 mb-5">
            <Pressable
              onPress={() =>
                handleEditProfile(
                  userId,
                  fullName,
                  about,
                  address,
                  dateOfBirth,
                  gender,
                  isSurveyDone,
                  deleteOldImage,
                  oldImagePath,
                  willUploadNewImage,
                  image
                )
              }
              className="w-full p-4 bg-[#7203FF] rounded-xl"
            >
              <Text className="text-white text-[20px] text-center font-bold">
                Apply
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
