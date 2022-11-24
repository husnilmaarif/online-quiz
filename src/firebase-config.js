// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOQvDN2BeVLRO_lwNHKEL4JJIQXTON-tA",
  authDomain: "online-quiz-ace21.firebaseapp.com",
  projectId: "online-quiz-ace21",
  storageBucket: "online-quiz-ace21.appspot.com",
  messagingSenderId: "122309887279",
  appId: "1:122309887279:web:720c07b20853cd7f91cdda",
  measurementId: "G-93YTZQXJP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app