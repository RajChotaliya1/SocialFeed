// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA014BnPhzpo-FBCXvo23DftdqmrgQiTQs",
  authDomain: "social-media-feed-59717.firebaseapp.com",
  projectId: "social-media-feed-59717",
  storageBucket: "social-media-feed-59717.firebasestorage.app",
  messagingSenderId: "1096446883478",
  appId: "1:1096446883478:web:db23b60b032fc0887b74b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
