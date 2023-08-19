// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAyCdfGxMzGMP2UOUR3jC9fpF0mN2DHAlk",
  authDomain: "odddelivery-d350c.firebaseapp.com",
  projectId: "odddelivery-d350c",
  storageBucket: "odddelivery-d350c.appspot.com",
  messagingSenderId: "650401842554",
  appId: "1:650401842554:web:c2f99cb8b27147ca4402c3",
  measurementId: "G-G5VQ2XLMSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);