// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  query,
  deleteDoc,
  where,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-storage.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAqEYegpEIYDmB1dHfQJULZB0FovVzepZ4",
  authDomain: "cuoi-khoa-jsi04.firebaseapp.com",
  projectId: "cuoi-khoa-jsi04",
  storageBucket: "cuoi-khoa-jsi04.appspot.com",
  messagingSenderId: "720300368403",
  appId: "1:720300368403:web:046b7ae8175d1ab62115e6",
  measurementId: "G-QBNCJQ9QX3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth(app)

// sign up sign in
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



export {
  db,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL,
  query,
  deleteDoc,
  where,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  auth,
  getDoc,
  updateDoc
};


