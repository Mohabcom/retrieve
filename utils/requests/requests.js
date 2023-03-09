import axios from "axios";
import * as Haptics from "expo-haptics";
import { Alert } from "react-native";

const serverUrl = "https://retrieve-api.onrender.com";
// const serverUrl = "http://192.168.1.10:3000";

export const getServerState = async () => {
  try {
    const { data } = await axios.get(
      `${serverUrl}/api/status`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(data);
    if (!data.server === "live") {
      Alert.alert(
        "Servers Offline",
        "Retrieve Servers are Currently offline or on a maintenance break.",
        [],
        { cancelable: false }
      );
    }

    // return data;
  } catch (error) {
    // console.log(error.response.data);
    Alert.alert(
      "Servers Offline",
      "Retrieve servers are Currently offline or on a maintenance break.",
      [],
      { cancelable: false }
    );
  }
};

export const getAppData = async () => {
  try {
    const { data } = await axios.get(
      `${serverUrl}/api/app/appdata`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const login = async (email, password) => {
  try {
    if (email && password) {
      let userName = "";
      if (!email.includes("@")) {
        userName = email;
        const { data } = await axios.post(
          `${serverUrl}/auth/login`,
          { userName, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        return data;
      } else {
        const { data } = await axios.post(
          `${serverUrl}/auth/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        return data.user;
      }
    } else {
      Alert.alert("Email or password cannot be empty");
    }
  } catch (error) {
    console.log(error.response.data);
    Alert.alert(error.response.data.msg);
  }
};

export const register = async (email, password, userName) => {
  try {
    if (email && userName && password) {
      const { data } = await axios.post(
        `${serverUrl}/auth/register`,
        {
          email,
          password,
          userName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      return data;
    } else {
      Alert.alert("Email, User Name and password cannot be empty to register.");
    }
  } catch (error) {
    console.log(error.response.data.msg);
    Alert.alert("Error", error.response.data.msg);
  }
};

export const sendNewOTPEmail = async (_id, email) => {
  try {
    if (email && _id) {
      const { data } = await axios.post(
        `${serverUrl}/auth/sendNewOTP`,
        {
          data: {
            _id,
            email,
          },
          action: "Another Verification Code",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert(data.msg);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return data.data;
    } else {
      Alert.alert("Email and Id cannot be empty to send a new OTP.");
    }
  } catch (error) {
    console.log(error.response.data);
    Alert.alert(error.response.data.msg);
  }
};

export const verifyOTP = async (_id, otp) => {
  try {
    if (otp && _id) {
      const { data } = await axios.post(
        `${serverUrl}/auth/verifyOTP`,
        { userId: _id, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return data;
    } else {
      Alert.alert("Id and OTP cannot be empty to send a new OTP.");
    }
  } catch (error) {
    console.log(error.response.data);
    Alert.alert(error.response.data.msg);
  }
};

// Posts
export const createPost = async (
  userId,
  title,
  description,
  duration,
  category,
  imagePath,
  imageURL,
  imageWidth,
  imageHeight
) => {
  try {
    if (userId && title && description && duration && category) {
      const { data } = await axios.post(
        `${serverUrl}/posts`,
        {
          userId,
          title,
          description,
          duration,
          category,
          imagePath,
          imageURL,
          imageWidth,
          imageHeight,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Success!", "Your post is now live!");
      return data;
    } else {
      Alert.alert("Please Fill all the required Data to Create A Post.");
    }
  } catch (error) {
    Alert.alert(error.response);
  }
};

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get(`${serverUrl}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    return data.data;
  } catch (error) {
    Alert.alert(error.response.data.msg);
  }
};

export const getPost = async (postId) => {
  try {
    if (postId) {
      const { data } = await axios.get(`${serverUrl}/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return data;
    } else {
      Alert.alert("Please Fill all the required Data to Create A Post.");
    }
  } catch (error) {
    Alert.alert(error.response.data.msg);
  }
};

export const editPost = async (
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
) => {
  try {
    if (postId && userId && title && description && duration && category) {
      const { data } = await axios.patch(
        `${serverUrl}/posts/${postId}`,
        {
          userId,
          title,
          description,
          duration,
          category,
          imagePath,
          imageURL,
          imageWidth,
          imageHeight,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Edit Applied");
      return data.data;
    } else {
      Alert.alert("Please Fill all the required Data to Edit the Post.");
    }
  } catch (error) {
    Alert.alert(error.response.data.msg);
  }
};

export const likePost = async (postId, userId) => {
  try {
    if (postId && userId) {
      const { data } = await axios.patch(
        `${serverUrl}/posts/${postId}/like`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return data;
    } else {
      Alert.alert("An Error has Occurred.");
    }
  } catch (error) {
    Alert.alert(error.response.data);
  }
};

export const deletePost = async (postId, userId) => {
  try {
    if (postId && userId) {
      const { data } = await axios.delete(
        `${serverUrl}/posts/${postId}`,
        { data: { userId } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Post Deleted");
      return data;
    } else {
      Alert.alert("An Error has Occurred.");
    }
  } catch (error) {
    Alert.alert(error.response.data);
  }
};

// Update Profile
export const updateProfile = async (
  userId,
  fullName,
  about,
  address,
  dateOfBirth,
  gender,
  isSurveyDone,
  profilePicturePath,
  profilePictureURL
) => {
  try {
    if (userId && fullName) {
      const { data } = await axios.patch(
        `${serverUrl}/users/updateProfile`,
        {
          userId,
          fullName,
          about,
          address,
          dateOfBirth,
          gender,
          isSurveyDone,
          profilePicturePath,
          profilePictureURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return data.user;
    } else {
      Alert.alert("Please Fill all the required Data to Edit your Profile.");
    }
  } catch (error) {
    Alert.alert(error.response.data.msg);
  }
};

// export const loadUser = () => async (dispatch) => {
//   try {
//     dispatch({ type: "loadUserRequest" });

//     const { data } = await axios.get(`${serverUrl}/me`);
//     dispatch({ type: "loadUserSuccess", payload: data });
//   } catch (error) {
//     dispatch({ type: "loadUserFailure", payload: error.response.data.message });
//   }
// };

// export const addTask = (title, description) => async (dispatch) => {
//   try {
//     dispatch({ type: "addTaskRequest" });

//     const { data } = await axios.post(
//       `${serverUrl}/newtask`,
//       {
//         title,
//         description,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     dispatch({ type: "addTaskSuccess", payload: data.message });
//   } catch (error) {
//     dispatch({ type: "addTaskFailure", payload: error.response.data.message });
//   }
// };

// export const updateTask = (taskId) => async (dispatch) => {
//   try {
//     dispatch({ type: "updateTaskRequest" });

//     const { data } = await axios.get(`${serverUrl}/task/${taskId}`);
//     dispatch({ type: "updateTaskSuccess", payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: "updateTaskFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const deleteTask = (taskId) => async (dispatch) => {
//   try {
//     dispatch({ type: "deleteTaskRequest" });

//     const { data } = await axios.delete(`${serverUrl}/task/${taskId}`);
//     dispatch({ type: "deleteTaskSuccess", payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: "deleteTaskFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const updateProfile = (formData) => async (dispatch) => {
//   try {
//     dispatch({ type: "updateProfileRequest" });

//     const { data } = await axios.put(`${serverUrl}/updateprofile`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     dispatch({ type: "updateProfileSuccess", payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: "updateProfileFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const logout = () => async (dispatch) => {
//   try {
//     dispatch({ type: "logoutRequest" });

//     await axios.get(`${serverUrl}/logout`);
//     dispatch({ type: "logoutSuccess" });
//   } catch (error) {
//     dispatch({
//       type: "logoutFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const updatePassword =
//   (oldPassword, newPassword) => async (dispatch) => {
//     try {
//       dispatch({ type: "updatePasswordRequest" });

//       const { data } = await axios.put(
//         `${serverUrl}/updatepassword`,
//         { oldPassword, newPassword },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       dispatch({ type: "updatePasswordSuccess", payload: data.message });
//     } catch (error) {
//       dispatch({
//         type: "updatePasswordFailure",
//         payload: error.response.data.message,
//       });
//     }
//   };

// export const verify = (otp) => async (dispatch) => {
//   try {
//     dispatch({ type: "verificationRequest" });

//     const { data } = await axios.post(
//       `${serverUrl}/verify`,
//       { otp },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     dispatch({ type: "verificationSuccess", payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: "verificationFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const forgetPassword = (email) => async (dispatch) => {
//   try {
//     dispatch({ type: "forgetPasswordRequest" });

//     const { data } = await axios.post(
//       `${serverUrl}/forgetpassword`,
//       { email },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     dispatch({ type: "forgetPasswordSuccess", payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: "forgetPasswordFailure",
//       payload: error.response.data.message,
//     });
//   }
// };

// export const resetPassword = (otp, newPassword) => async (dispatch) => {
//   try {
//     dispatch({ type: "resetPasswordRequest" });

//     const { data } = await axios.put(
//       `${serverUrl}/resetpassword`,
//       { otp, newPassword },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     dispatch({ type: "resetPasswordSuccess", payload: data.message });
//   } catch (error) {
//     dispatch({
//       type: "resetPasswordFailure",
//       payload: error.response.data.message,
//     });
//   }
// };
