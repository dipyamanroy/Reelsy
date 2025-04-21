// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "fifth-bridge.firebaseapp.com",
    projectId: "fifth-bridge",
    storageBucket: "fifth-bridge.firebasestorage.app",
    messagingSenderId: "699023166978",
    appId: "1:699023166978:web:d74d1bcd0a707c553d211b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)