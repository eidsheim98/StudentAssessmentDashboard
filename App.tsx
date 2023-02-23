import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { auth, db } from "./firebaseConfig";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { globalStyles } from './styles/global';
import StudentForm from './screens/FormDatabase';
import Navigator from './screenNavigator/navigator'



const App = () => {
  return (
        <Navigator/>
  );
};




export default App;