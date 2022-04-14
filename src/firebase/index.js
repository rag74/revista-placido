import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBeKLH_CuK7fLAgJA7gsJExIZBF_A46y6U",
    authDomain: "bookstore-guarch-coderhouse.firebaseapp.com",
    projectId: "bookstore-guarch-coderhouse",
    storageBucket: "bookstore-guarch-coderhouse.appspot.com",
    messagingSenderId: "278611016230",
    appId: "1:278611016230:web:a9f332e9757f105503c4e7"
};


initializeApp(firebaseConfig);
const db = getFirestore();


export default db