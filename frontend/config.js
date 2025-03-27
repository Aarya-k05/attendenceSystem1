// config.js (Ensure this is correctly set up)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Your Firebase config (Replace with your actual credentials)
const firebaseConfig = {
    apiKey: "AIzaSyCEeWpZ-U5Ul-2crVl-p63mtXdCHl1EmJY",
    authDomain: "attendance-c1a20.firebaseapp.com",
    projectId: "attendance-c1a20",
    storageBucket: "attendance-c1a20.appspot.com",
    messagingSenderId: "1038346861821",
    appId: "1:1038346861821:web:ea7e787bd351cd4ed55294"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export auth and Firestore functions
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setDoc, doc };
