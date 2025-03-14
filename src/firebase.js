// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAji4zM6QnamhfniCeADdz39Z0HFI91Daw",
  authDomain: "movie-app1-5ad29.firebaseapp.com",
  projectId: "movie-app1-5ad29",
  storageBucket: "movie-app1-5ad29.firebasestorage.app",
  messagingSenderId: "546308935523",
  appId: "1:546308935523:web:f2788e4d41186179dacd56",
  measurementId: "G-GG62S7QMTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);