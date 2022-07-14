import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAI53rS35vkZlbRWLBtvZTaCcRgXFglNeQ",
    authDomain: "clone-salcrom.firebaseapp.com",
    projectId: "clone-salcrom",
    storageBucket: "clone-salcrom.appspot.com",
    messagingSenderId: "617597792630",
    appId: "1:617597792630:web:7190bc5ded6bdbcd614a57",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
