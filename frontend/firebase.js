// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuo5J4rBRZ7UwFy8pc3gVsMn3gun445sY",
  authDomain: "rn-instablog.firebaseapp.com",
  databaseURL: "https://rn-instablog-default-rtdb.firebaseio.com",
  projectId: "rn-instablog",
  storageBucket: "rn-instablog.appspot.com",
  messagingSenderId: "549816339518",
  appId: "1:549816339518:web:af53484c59b6aeda4f956f",
  measurementId: "G-DWD9HG0J8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);