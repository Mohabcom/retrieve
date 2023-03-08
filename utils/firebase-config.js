import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZLXPJL7Skr15reGNdFZMbdV89SgGKs8w",
  authDomain: "recycling-app-3396f.firebaseapp.com",
  projectId: "recycling-app-3396f",
  storageBucket: "recycling-app-3396f.appspot.com",
  messagingSenderId: "478847057525",
  appId: "1:478847057525:web:a72aa77350673581aa423c",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
  // persistence: getReactNativePersistence(AsyncStorage),
});

export const storage = getStorage(app);
export const db = getFirestore(app);
