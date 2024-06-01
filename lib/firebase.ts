import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
  authDomain: "movieapi-22f5c.firebaseapp.com",
  projectId: "movieapi-22f5c",
  storageBucket: "movieapi-22f5c.appspot.com",
  messagingSenderId: "911423870631",
  appId: "1:911423870631:web:25dd4ac4eeef2e36862d82",
  measurementId: "G-VLE4XETTPW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
