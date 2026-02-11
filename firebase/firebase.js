import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1x7WKCxoRP_XiTYupeliOA_t4is1nkbE",
  authDomain: "connectyou-cb2a9.firebaseapp.com",
  databaseURL: "https://connectyou-cb2a9-default-rtdb.firebaseio.com",
  projectId: "connectyou-cb2a9",
  storageBucket: "connectyou-cb2a9.firebasestorage.app",
  messagingSenderId: "177493067003",
  appId: "1:177493067003:web:c9604c4c96f081ebf15c5e"
};


export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
