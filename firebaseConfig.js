// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG-jXXn5K6q6Qe4N5ouBzsHMGInUe1D-8",
  authDomain: "applismart-fe26c.firebaseapp.com",
  projectId: "applismart-fe26c",
  storageBucket: "applismart-fe26c.firebasestorage.app",
  messagingSenderId: "435059535380",
  appId: "1:435059535380:web:99f3ee19aea438b53fc101"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
