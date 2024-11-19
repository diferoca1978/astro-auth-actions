// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeYm-YA9wDoRJuv0dInRpMmi9p21coIp0",
  authDomain: "astro-auth-b06d8.firebaseapp.com",
  projectId: "astro-auth-b06d8",
  storageBucket: "astro-auth-b06d8.firebasestorage.app",
  messagingSenderId: "804614532941",
  appId: "1:804614532941:web:114bdb1f09cf976c075104"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebase = {
  app,
  auth
}