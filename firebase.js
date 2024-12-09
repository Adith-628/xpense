// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCleRZWoMaGfz47bVyn5Mk0w2ddiKbl484",
  authDomain: "xpense-7fae2.firebaseapp.com",
  projectId: "xpense-7fae2",
  storageBucket: "xpense-7fae2.firebasestorage.app",
  messagingSenderId: "688086414639",
  appId: "1:688086414639:web:b0b217aca94b99e8ec5dda",
  measurementId: "G-Y48DV6LGHE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

const db = getFirestore(app);

const analytics = getAnalytics(app);

export { auth, provider, signInWithPopup, signOut };
