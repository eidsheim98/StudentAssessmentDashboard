// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyABLfzkfo42XkMwccWpWwureU1rugE0FAs",
  
    authDomain: "agent-name-66cf8.firebaseapp.com",
  
    databaseURL: "https://agent-name-66cf8.firebaseio.com",
  
    projectId: "agent-name-66cf8",
  
    storageBucket: "agent-name-66cf8.appspot.com",
  
    messagingSenderId: "584218302359",
  
    appId: "1:584218302359:web:f776324930b14c3ce696d2"
  
  };
  
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export any objects needed elsewhere in your app
export { auth, db }
