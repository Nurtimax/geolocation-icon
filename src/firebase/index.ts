// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPNtZK9nZVa2-3p-cCdZDMfU6QeE78TlY",
  authDomain: "nearant-me.firebaseapp.com",
  databaseURL:
    "https://nearant-me-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nearant-me",
  storageBucket: "nearant-me.firebasestorage.app",
  messagingSenderId: "948867996688",
  appId: "1:948867996688:web:4a69e6213e58310e123e95",
  measurementId: "G-ZE6SG3TH7T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);
