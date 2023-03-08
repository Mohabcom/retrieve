import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isProfileFilled: false,
  isSurveyDone: false,
  loading: false,
  user: null,
  posts: [],
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.user = action.payload.user;
      if (state.user) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
      if (state.user.fullName) {
        state.isProfileFilled = true;
      } else {
        state.isProfileFilled = false;
      }
      if (state.user.isSurveyDone) {
        state.isSurveyDone = true;
      } else {
        state.isSurveyDone = false;
      }
    },
    setSignOut: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isProfileFilled = false;
      state.isSurveyDone = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setSignIn, setSignOut, setLoading, setPosts, setPost } =
  authSlice.actions;

export const selectIsLoggedIn = (state) => state.isLoggedIn;
// export const SelectisProfileFilled = (state) => state.isProfileFilled;
export const selectUser = (state) => state.user;

export default authSlice.reducer;
