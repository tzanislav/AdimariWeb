// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq-NMOTmeWahE1_0DbK2eEhQlJGu6f7lo",
  authDomain: "adimari.firebaseapp.com",
  databaseURL: "https://adimari-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "adimari",
  storageBucket: "adimari.appspot.com",
  messagingSenderId: "536430483996",
  appId: "1:536430483996:web:b65db189ec7f3426f0ddd9",
  measurementId: "G-KW13KN8TFZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };