import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDJzX2r4cRf5yt3ZXGTVs8gXSWMaEaB4zI",
  authDomain: "sad-markus.firebaseapp.com",
  projectId: "sad-markus",
  storageBucket: "sad-markus.appspot.com",
  messagingSenderId: "1022960277645",
  appId: "1:1022960277645:web:e93e8dfae4cf59a04aeac4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {auth, db};