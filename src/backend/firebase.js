// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0-I2nK85ae41PTMEHsFjlAyWpOefkd5U",
  authDomain: "melodies-b09ad.firebaseapp.com",
  projectId: "melodies-b09ad",
  storageBucket: "melodies-b09ad.firebasestorage.app",
  messagingSenderId: "562505753476",
  appId: "1:562505753476:web:474a63ef954127b40bb3d1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const __AUTH = getAuth(firebaseApp);
export const __DB = getFirestore(firebaseApp);