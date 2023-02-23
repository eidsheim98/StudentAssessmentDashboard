import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  Alert,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { auth, db } from "./firebaseConfig";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Row, Rows, Table } from 'react-native-table-component';
import { globalStyles } from './styles/global';
import StudentForm from './screens/AddForm';

interface Student {
  classID: string;
  fName: string;
  lName: string;
  DOB: string;
  className: string;
  score: string;
  grade: string;
  timestamp: string;
}

const App = () => {
  const [documents, setDocuments] = useState<Student[]>([]);

  useEffect(() => {
    const colRef = collection(db, "students");

    onSnapshot(colRef, (docSnap) => {
      const newDocuments: Student[] = [];

      docSnap.forEach((doc) => {
        const data = doc.data() as Student;
        newDocuments.push(data);
      });

      setDocuments(newDocuments);
    });
  }, []);

  const tableHead = [
    'Class ID',
    'First Name',
    'Last Name',
    'DOB',
    'Class Name',
    'Score',
    'Grade',
    'Edit', 
    'Remove'
  ];

  const studentData = (setValues:any) => {
    return documents.map((document) => {
      const { classID, fName, lName, DOB, className, score, grade, timestamp } = document;
      return [
        classID,
        fName,
        lName,
        DOB,
        className,
        score,
        grade,
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity onPress={() => setValues({
            "ClassID": classID,
            "fName": fName,
            "lName": lName,
            "DOB": DOB,
            "className": className,
            "score": score,
            "Grade": grade,
            "timestamp": timestamp
            })}>
            <Text style={globalStyles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>,
        ,
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity onPress={() => removeDetails(document)}>
            <Text style={globalStyles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ];
    });
  }

  const removeDetails = (document: Student) => {
    const colRef = collection(db, "students");
    const docRef = doc(colRef, document.timestamp);

    deleteDoc(docRef)
      .then(() => {
      console.log("Document successfully deleted!");
      })
      .catch((error) => {
      console.error("Error removing document: ", error);
    });
  };

  const handleEditScore = (document: Student) => {
    // You can open a modal or navigate to another screen here to edit the score
  };

  return (
    <SafeAreaView>
      <ScrollView>
      <View>
      <StudentForm tableData={studentData} />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default App;