import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
    apiKey: "AIzaSyCQAjhVnzPk6xLL5FddXWZCl5GjZQ0pOaI",
    authDomain: "sandbox-react-6af5b.firebaseapp.com",
    databaseURL: "https://sandbox-react-6af5b-default-rtdb.firebaseio.com",
    projectId: "sandbox-react-6af5b",
    storageBucket: "sandbox-react-6af5b.appspot.com",
    messagingSenderId: "464429852378",
    appId: "1:464429852378:web:2632ccc0626ddebf16a7e3",
    measurementId: "G-X83QQHL9JT"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(firebaseApp)
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDb = getDatabase(firebaseApp)
export const firebaseGoogleProvider = new GoogleAuthProvider();