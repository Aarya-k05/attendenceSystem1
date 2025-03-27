// Firebase SDK imports
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEeWpZ-U5Ul-2crVl-p63mtXdCHl1EmJY",
  authDomain: "attendance-c1a20.firebaseapp.com",
  projectId: "attendance-c1a20",
  storageBucket: "attendance-c1a20.appstop.app",
  messagingSenderId: "1038346861821",
  appId: "1:1038346861821:web:ea7e787bd351cd4ed55294"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Debugging log
console.log("✅ Firestore Initialized:", db);

// Function to sign up a new user (Teachers, Students, Parents)
async function signUpUser(role, email, password, extraData) {
  try {
    // ✅ Step 1: Input validation
    if (!role || !email || !password) {
      console.error("❌ Missing required fields:", { role, email, password });
      alert("Error: Missing required fields.");
      return;
    }

    console.log(`🔄 Signing up user in role: ${role} with email: ${email}`);

    // ✅ Step 2: Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log("✅ User created:", user.uid);

    // ✅ Step 3: Send email verification
    await sendEmailVerification(user);
    console.log("📩 Verification email sent to:", email);

    // ✅ Step 4: Save user details in Firestore
    const userDocRef = doc(db, role, user.uid);
    console.log("📄 Saving user data to Firestore at:", userDocRef.path);

    await setDoc(userDocRef, {
      email: email,
      ...extraData // Additional data like name, subject, student roll number, etc.
    });

    console.log("✅ User data saved to Firestore successfully.");
    alert(`✅ Signup successful! Please verify your email before logging in.`);
  } catch (error) {
    console.error("❌ Signup failed:", error);
    alert("Signup failed: " + error.message);
  }
}

// Function to log in a user
async function loginUser(role, email, password, redirectPage) {
  try {
    if (!role || !email || !password) {
      console.error("❌ Missing login credentials:", { role, email, password });
      alert("Error: Missing login credentials.");
      return;
    }

    console.log(`🔄 Logging in user in role: ${role} with email: ${email}`);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("✅ User logged in:", user.uid);

    if (!user.emailVerified) {
      console.warn("⚠️ Email not verified for:", email);
      alert("⚠️ Please verify your email before logging in.");
      return;
    }

    // Check if the user exists in Firestore
    const userDoc = await getDoc(doc(db, role, user.uid));
    if (!userDoc.exists()) {
      console.error("❌ User data not found in Firestore.");
      alert("User data not found. Please contact admin.");
      return;
    }

    console.log("✅ User data found in Firestore. Redirecting...");
    alert("✅ Login successful!");
    window.location.href = redirectPage; // Redirect to respective dashboard
  } catch (error) {
    console.error("❌ Login failed:", error);
    alert("Login failed: " + error.message);
  }
}

// Function to log out a user
async function logoutUser() {
  try {
    await signOut(auth);
    console.log("✅ User logged out.");
    alert("✅ Logged out successfully!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("❌ Logout failed:", error);
    alert("Logout failed: " + error.message);
  }
}

// Auth state listener to check if a user is logged in
function authStateListener(callback) {
  onAuthStateChanged(auth, (user) => {
    console.log("👤 Auth state changed:", user ? user.uid : "No user logged in");
    callback(user);
  });
}

// Export all functions and Firebase instances
export { 
  auth, 
  db, 
  signUpUser, 
  loginUser, 
  logoutUser, 
  authStateListener 
}; 
