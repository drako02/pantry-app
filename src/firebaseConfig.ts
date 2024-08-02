import { initializeApp } from 'firebase/app';
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    authDomain: "pantry-app-59b9e.firebaseapp.com",
    projectId: "pantry-app-59b9e",
    storageBucket: "pantry-app-59b9e.appspot.com",
    messagingSenderId: "360186326949",
    appId: "1:360186326949:web:8075c8a13db430f286024c",
    measurementId: "G-HG9E67M8FZ"

}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};