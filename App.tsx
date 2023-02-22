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
  fName: string;
  lName: string;
  DOB: string;
  classID: string;
  className: string;
  grade: string;
  score: string;
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
    'First Name',
    'Last Name',
    'DOB',
    'Class ID',
    'Class Name',
    'Grade',
    'Score',
    'Edit', 
    'Remove'
  ];

  const studentData = (setValues:any) => {
    return documents.map((document) => {
      const { fName, lName, DOB, classID, className, grade, score } = document;
      return [
        fName,
        lName,
        DOB,
        classID,
        className,
        grade,
        score,
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity onPress={() => setValues({
            "fName": fName,
            "lName": lName,
            "DOB": DOB,
            "ClassID": classID,
            "className": className,
            "Grade": grade,
            "score": score
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
    const docRef = doc(colRef, document.fName + " " + document.lName);
    console.log(document.lName); // add this line to check if student.id is being passed correctly
    console.log(auth.currentUser);

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



const stylgites = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: '#AADDFF',
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 12,
    color: 'black',
  },
  container: { 
    flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' 
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 32,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
  text: {
    margin: 6
  }
});

export default App;