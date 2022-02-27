import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCuYuZotLyGCeZI3i7N5rhOoUV-T14FOsA",
    authDomain: "datanew1-e61cc.firebaseapp.com",
    projectId: "datanew1-e61cc",
    storageBucket: "datanew1-e61cc.appspot.com",
    messagingSenderId: "158078205569",
    appId: "1:158078205569:web:5edc54327ce401c94b5780"
});

const db = getFirestore(firebaseApp);
export default db;