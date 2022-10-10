// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0HZBKRQavzl0N6FLpbzraWL4Wnn7Kyp8",
  authDomain: "rock-paper-scissors-fe735.firebaseapp.com",
  projectId: "rock-paper-scissors-fe735",
  storageBucket: "rock-paper-scissors-fe735.appspot.com",
  messagingSenderId: "962903512693",
  appId: "1:962903512693:web:a10e7071c7dc09306c8a3c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
