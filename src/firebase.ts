// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzkguOjTxO5DMWa4qIg4li-_Kxwm_h6lI",
  authDomain: "renoto-9be37.firebaseapp.com",
  projectId: "renoto-9be37",
  storageBucket: "renoto-9be37.firebasestorage.app",
  messagingSenderId: "76679463680",
  appId: "1:76679463680:web:c1b3796bd8b508010de9e5",
  measurementId: "G-00DMK97TY4"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);