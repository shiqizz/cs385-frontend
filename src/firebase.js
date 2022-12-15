import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "vocal-inquiry-366518.firebaseapp.com",
  projectId: "vocal-inquiry-366518",
  storageBucket: "vocal-inquiry-366518.appspot.com",
  messagingSenderId: "500815233615",
  appId: "1:500815233615:web:7e460c3a702a7e1db7203a",
  measurementId: "G-J88L6H2GD3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
