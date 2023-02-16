import firebase from "firebase";



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
  

// init app
firebase.initializeApp(config);

// export default firestore
export default firebase.firestore();
