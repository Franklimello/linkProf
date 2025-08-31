
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyABQJhaCTT74Dc9K0ztJJhgnT1ii4YJiK0",
  authDomain: "reactlinks-5f4c5.firebaseapp.com",
  projectId: "reactlinks-5f4c5",
  storageBucket: "reactlinks-5f4c5.firebasestorage.app",
  messagingSenderId: "934223789413",
  appId: "1:934223789413:web:3beffdc653e331cc91358c",
  measurementId: "G-1CM96M9NNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}