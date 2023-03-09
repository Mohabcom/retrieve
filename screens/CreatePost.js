import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Text,
  Alert,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Picker } from "@react-native-picker/picker";
import * as Progress from "react-native-progress";
import {
  getDownloadURL,
  ref,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createPost, deletePost, editPost } from "../utils/requests/requests";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPost } from "../redux/state";
import { storage } from "../utils/firebase-config";

function CreatePost({ route, navigation }) {
  const dispatch = useDispatch();
  // const [cancelCurrent, setCancelCurrent] = useState(false);
  // const richText = useRef();

  const userId = useSelector((state) => state.user._id);
  const postId = route.params?.post?._id;

  const [action, setAction] = useState("create");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("metal");

  const [oldImagePath, setOldImagePath] = useState("");
  const [deleteOldImage, setDeleteOldImage] = useState(false);
  const [willUploadNewImage, setWillUploadNewImage] = useState(false);

  // Setting states if Editing or Deleting A Post
  useEffect(() => {
    if (route.params?.action) {
      setAction(route.params?.action);
    }
    if (route.params?.action === "delete") {
      setAction("edit");
      confirmDelete(postId, userId, oldImagePath);
    }
    if (route.params?.post) {
      // setPostId(route.params?.post._id);
      setTitle(route.params?.post.title);
      setDescription(route.params?.post.description);
      setDuration(route.params?.post.duration);
      setCategory(route.params?.post.category);
      setOldImagePath(route.params?.post.image.imagePath);
      setImage(route.params?.post.image.imageURL);
      setImageWidth(route.params?.post.image.imageWidth);
      setImageWidth(route.params?.post.image.imageHeight);
    }
  }, []);

  ///////////////////////
  const [uploading, setUploading] = useState(false);

  // Create Post
  const handleCreatePost = async (
    userId,
    title,
    description,
    duration,
    category,
    willUploadNewImage,
    image,
    imageWidth,
    imageHeight
  ) => {
    let newPost = {};
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
    try {
      // Upload Image
      const { imagePath, imageURL } = willUploadNewImage
        ? await uploadImage(image)
        : { imagePath: "", imageURL: "" };
      // if (cancelCurrent === true) {
      //   dispatch(setLoading(false));
      //   return;
      // }

      newPost = await createPost(
        userId,
        title,
        description,
        duration,
        category,
        imagePath,
        imageURL,
        imageWidth,
        imageHeight
      );
      dispatch(setLoading(false));
      if (newPost) {
        navigation.replace("Home Screen");
      }
    } catch (error) {
      dispatch(setLoading(false));
      // Alert.alert("Error", error.message);
    }
  };

  // Edit Post
  const handleEditPost = async (
    postId,
    userId,
    title,
    description,
    duration,
    category,
    deleteOldImage,
    oldImagePath,
    willUploadNewImage,
    image,
    imageWidth,
    imageHeight
  ) => {
    let updatedPost = {};
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
    try {
      // Upload Image
      const { imagePath, imageURL } = willUploadNewImage
        ? await uploadImage(image)
        : { imagePath: "", imageURL: "" };

      // if (cancelCurrent === true) {
      //   dispatch(setLoading(false));
      //   return;
      // }

      if (willUploadNewImage || deleteOldImage) {
        updatedPost = await editPost(
          postId,
          userId,
          title,
          description,
          duration,
          category,
          imagePath,
          imageURL,
          imageWidth,
          imageHeight
        );
        dispatch(setPost({ post: updatedPost }));
      } else {
        updatedPost = await editPost(
          postId,
          userId,
          title,
          description,
          duration,
          category
        );
        dispatch(setPost({ post: updatedPost }));
      }
      // Delete Old Image
      if (oldImagePath && deleteOldImage) {
        await deleteImage(oldImagePath);
      }
      dispatch(setLoading(false));
      if (newPost) {
        navigation.navigate("Home Screen");
      }
    } catch (error) {
      dispatch(setLoading(false));
      // Alert.alert(error.message);
    }
  };

  // Delete Post
  const handleDeletePost = async (postId, userId, oldImagePath) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
    try {
      if (oldImagePath) {
        deleteImage(oldImagePath);
      }
      await deletePost(postId, userId);
      dispatch(setLoading(false));
      navigation.replace("Home Screen");
    } catch (error) {
      dispatch(setLoading(false));
      // alert(error.message);
    }
  };

  const confirmDelete = (postId, userId, oldImagePath) =>
    Alert.alert(
      "Are you sure?",
      "Deleting a Post cannot be undone, are you sure you want to delete this post?",
      [
        {
          text: "No",
          style: "Cancel",
        },
        {
          text: "Yes",
          onPress: () => handleDeletePost(postId, userId, oldImagePath),
        },
      ]
    );

  // Image Picker and Upload to firebase
  const [image, setImage] = useState("");
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        // allowsMultipleSelection: true,
        // selectionLimit: 6,
        // aspect: [4, 3],
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
      setImageWidth(result.assets[0].width);
      setImageHeight(result.assets[0].height);
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
    const reference = ref(storage, `postImages/${title}-${userId}/${filename}`);

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

    blob.close();
    setUploading(false);
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
    setImage(null);
    setImageWidth(null);
    setImageHeight(null);

    // function returns imagePath and the imageUrl variables as an object that can be destructured
    return { imagePath: newImagePath, imageURL };
  };
  // Delete Image
  const deleteImage = async (imagePath) => {
    // const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    try {
      await deleteObject(imageRef);
    } catch (error) {
      return alert(error.message);
    }
  };

  return (
    <SafeAreaView className="relative h-screen w-screen">
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
        <Pressable
          className="px-5 py-2 z-10"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={26} />
        </Pressable>
        <View className="flex-row justify-center items-center absolute w-full h-full">
          <Text className="text-lg text-center font-bold">
            {action === "edit" ? "Edit Post" : "Create A Post"}
          </Text>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className="h-full w-screen pt-0"
      >
        <KeyboardAvoidingView className="w-screen  pt-0" behavior="padding">
          {/* INPUTS */}
          <View className="w-full p-5">
            <View className="w-full">
              <Text className="text-base mb-2"> Title:</Text>
              <TextInput
                className="text-black bg-gray-200 p-4 rounded-lg text-base z-10"
                value={title}
                onChangeText={(title) => {
                  setTitle(title);
                }}
                placeholder="Title..."
              />
            </View>
            <View className="mt-2">
              <Text className="text-base mb-2">Description:</Text>
              <TextInput
                className="text-black bg-gray-200 p-4 rounded-lg text-base z-10 min-h-[100]"
                multiline={true}
                style={{ textAlignVertical: "top" }}
                value={description}
                onChangeText={(input) => {
                  setDescription(input);
                }}
                placeholder="Description..."
              />
              {/* <RichToolbar
                selectedIconTint="#873c1e"
                editor={richText}
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.setUnderline,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertLink,
                  actions.setStrikethrough,
                  actions.checkboxList,
                ]}
              />
              <RichToolbar
                selectedIconTint="#873c1e"
                editor={richText}
                actions={[
                  actions.heading2,
                  actions.heading3,
                  actions.undo,
                  actions.redo,
                  actions.removeFormat,
                ]}
                iconMap={{
                  [actions.heading2]: ({ tintColor }) => (
                    <Text style={[{ color: tintColor }]}>H2</Text>
                  ),
                  [actions.heading3]: ({ tintColor }) => (
                    <Text style={[{ color: tintColor }]}>H3</Text>
                  ),
                }}
              />
              <RichEditor
                initialHeight={100}
                androidHardwareAccelerationDisabled={true}
                placeholder="Description..."
                editorStyle={{
                  backgroundColor: "rgb(229 231 235)",
                  color: "#000",
                }}
                className="text-black bg-gray-200 p-1 rounded-lg text-base z-10 min-h-[80px]"
                ref={richText}
                initialContentHTML={description}
                // value={description}
                onChange={(description) => {
                  setDescription(description);
                  // console.log("descriptionText:", description);
                }}
              /> */}
            </View>
            <View className="flex-row justify-between items-center mt-5 mb-3">
              <Text className="text-base mb-2">Duration:</Text>
              <View className="flex-row justify-center items-center">
                <TextInput
                  keyboardType={"number-pad"}
                  className="text-black text-center bg-gray-200 p-4 rounded-lg text-base z-10 max-w-[50px]"
                  value={duration}
                  onChangeText={(duration) => {
                    setDuration(String(duration));
                  }}
                  placeholder="0"
                  maxLength={2}
                />
                <Text className="ml-1">minutes</Text>
              </View>
            </View>

            <Text className="text-base mb-2">Category:</Text>
            <View className="text-black bg-gray-200 p-2 rounded-lg">
              <Picker
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              >
                <Picker.Item label="Metal" value="metal" />
                <Picker.Item label="Cloth" value="cloth" />
                <Picker.Item label="Wood" value="wood" />
                <Picker.Item label="Plastic" value="plastic" />
                <Picker.Item label="Glass" value="glass" />
                <Picker.Item label="Paper" value="paper" />
              </Picker>
            </View>
          </View>

          {/* IMAGE PICKER PREVIEW */}
          {image && (
            <View className="relative w-[150px] h-[150px] mx-5">
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 150, objectFit: "contain" }}
              />
              <Pressable
                className="absolute bottom-0 bg-gray-400 opacity-50 z-50"
                style={{ width: 150, height: 50 }}
                onPress={() => {
                  setImage(null);
                  if (action === "edit") {
                    setDeleteOldImage(true); // if clicked then the old image will be deleted on Applying the Edit
                  }
                  setWillUploadNewImage(false);
                  setImageWidth(null);
                  setImageHeight(null);
                }}
              >
                <View className="absolute flex justify-end items-center w-full h-full p-3">
                  <Ionicons name="trash-outline" size={22} color="#fff" />
                </View>
              </Pressable>
            </View>
          )}
          <Pressable
            onPress={pickImage}
            className="my-2 p-3 border-2 border-transparent rounded"
          >
            <Text className="text-[#7203FF] text-[20px] text-center">
              {!image ? "Pick an Image" : "Change Image"}
            </Text>
          </Pressable>

          <View className="mx-5">
            {/* PAGE: CREATE */}
            {action === "create" && (
              <View className="mb-10">
                <Pressable
                  onPress={() =>
                    handleCreatePost(
                      userId,
                      title,
                      description,
                      duration,
                      category,
                      willUploadNewImage, // question: True or False
                      image,
                      imageWidth,
                      imageHeight
                    )
                  }
                  className="p-3 bg-[#7203FF] rounded"
                >
                  <Text className="text-white text-[20px] text-center">
                    Submit Post
                  </Text>
                </Pressable>
              </View>
            )}

            {/* PAGE: EDIT */}
            {action === "edit" && (
              <View className="mb-10">
                <Pressable
                  onPress={() =>
                    handleEditPost(
                      postId,
                      userId,
                      title,
                      description,
                      duration,
                      category,
                      deleteOldImage, // question: True or False
                      oldImagePath, // Old Image Path for deletion
                      willUploadNewImage, // question: True or False
                      image,
                      imageWidth,
                      imageHeight
                    )
                  }
                  className="mb-2 p-3 bg-[#7203FF] rounded"
                >
                  <Text className="text-white text-[20px] text-center">
                    Apply Edit
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => confirmDelete(postId, userId, oldImagePath)}
                  className="p-3 bg-white border-2 border-red-500 rounded"
                >
                  <Text className="text-red-500 text-[20px] text-center">
                    Delete Post
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreatePost;
