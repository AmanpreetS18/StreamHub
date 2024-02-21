// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZYzthl7BnBJ0Z49xv5Skbd0qA2EeouOE",
  authDomain: "streamhub-8a119.firebaseapp.com",
  projectId: "streamhub-8a119",
  storageBucket: "streamhub-8a119.appspot.com",
  messagingSenderId: "433446605700",
  appId: "1:433446605700:web:571130ee5718514e3143d1",
  measurementId: "G-J6FVPH70LR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
export {app,auth}
