import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyABLfzkfo42XkMwccWpWwureU1rugE0FAs",

  authDomain: "agent-name-66cf8.firebaseapp.com",

  databaseURL: "https://agent-name-66cf8.firebaseio.com",

  projectId: "agent-name-66cf8",

  storageBucket: "agent-name-66cf8.appspot.com",

  messagingSenderId: "584218302359",

  appId: "1:584218302359:web:b1da9a173c6bb3ffe696d2"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {auth, db};