// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIYxzAx1shJnzERlOjl92pEl4HlYHx2dc",
  authDomain: "abrars-automobile.firebaseapp.com",
  projectId: "abrars-automobile",
  storageBucket: "abrars-automobile.appspot.com",
  messagingSenderId: "567937125274",
  appId: "1:567937125274:web:5b1a5fe4db22a4b8f24823"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);