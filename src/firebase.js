// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMPWXVzZr0Xky_5ZxVxuuteuyD_omB9GA",
  authDomain: "sifk002.firebaseapp.com",
  projectId: "sifk002",
  storageBucket: "sifk002.firebasestorage.app",
  messagingSenderId: "892745786279",
  appId: "1:892745786279:web:de99cbb54c4cd7ba638c82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
