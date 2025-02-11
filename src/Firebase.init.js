// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnrNzlMxU9Z10A22ArEOA2DiwarOZtILo",
  authDomain: "my-email-auth-3de5e.firebaseapp.com",
  projectId: "my-email-auth-3de5e",
  storageBucket: "my-email-auth-3de5e.firebasestorage.app",
  messagingSenderId: "797142726873",
  appId: "1:797142726873:web:6ec34071fb36f5904066c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)