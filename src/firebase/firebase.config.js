// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOuHhkTBTc-Xq2RyibgMppySuxeXbjv90",
  authDomain: "abrar-restaurent.firebaseapp.com",
  projectId: "abrar-restaurent",
  storageBucket: "abrar-restaurent.appspot.com",
  messagingSenderId: "814327936526",
  appId: "1:814327936526:web:b17d488ee6d53703122e5f"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);