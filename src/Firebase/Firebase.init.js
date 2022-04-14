// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATJTglRllV_gtINZw8VopvewtA7j_aav8",
  authDomain: "tech-geeks-firebase-fe922.firebaseapp.com",
  projectId: "tech-geeks-firebase-fe922",
  storageBucket: "tech-geeks-firebase-fe922.appspot.com",
  messagingSenderId: "877050129118",
  appId: "1:877050129118:web:ac9a6a420300c9d4b0f04f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default auth;