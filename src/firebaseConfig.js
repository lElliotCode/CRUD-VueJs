// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apyKey: process.env.APY_KEY,
    authDomain: "vue-crud-32bdb.firebaseapp.com",
    projectId: "vue-crud-32bdb",
    storageBucket: "vue-crud-32bdb.firebasestorage.app",
    messagingSenderId: "375621105256",
    appId: "1:375621105256:web:cd41403ada06f52d97eddd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }
