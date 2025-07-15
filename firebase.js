
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1pB6uffzvleyeiFh-y00maz0eUuwG-Dc",
  authDomain: "happytravel-8fc70.firebaseapp.com",
  projectId: "happytravel-8fc70",
  storageBucket: "happytravel-8fc70.appspot.com",
  messagingSenderId: "926052685314",
  appId: "1:926052685314:android:e0a59c98bc54ca9354791b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
