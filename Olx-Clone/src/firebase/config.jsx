import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyC6uu1YD6g0gIxuG2Ac2Kc7hB6Rw-L406o",
    authDomain: "olx-clone-be410.firebaseapp.com",
    projectId: "olx-clone-be410",
    storageBucket: "olx-clone-be410.appspot.com",
    messagingSenderId: "343669554747",
    appId: "1:343669554747:web:3e30e0af4037996095661e"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);