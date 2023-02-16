/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import SADForm from '/home/nikolai/WebstormProjects/StudentAssessmentDashboard/screens/AddForm';
import { globalStyles } from '/home/nikolai/WebstormProjects/StudentAssessmentDashboard/styles/global';

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
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc, updateDoc, collection, onSnapshot } from "firebase/firestore";
import { Row, Rows, Table } from 'react-native-table-component';

// Create new students
const setData = async () => {
  await setDoc(doc(db, "students", "documentID"), {
    fName: "Ole",
    lName: "Normann",
    classID: "ikt205",
    className:"Applikasjonsutvikling",
    grade: "A",
    score: "100"
  });
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
}

// Update student data
const updateData = async () => {
  await updateDoc(doc(db, "students", "documentID"), {
    fName: "Ole",
    lName: "Normann",
    classID: "ikt205",
    className:"Applikasjonsutvikling",
    grade: "F",
    score: "1"
  });
}

// Delete student data
const deleteData = async () => {
  await deleteDoc(doc(db, "students", "documentID"));
}

// Do stuff on button press
const buttonPressed = () => {
  deleteData();
}

 

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={globalStyles.sectionContainer}>
      <Text
        style={[
          globalStyles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          globalStyles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

interface Student {
  fName: string;
  lName: string;
  classID: string;
  className: string;
  grade: string;
  score: string;
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

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

  const tableHead = ['First Name', 'Last Name', 'Class ID', 'Class Name', 'Grade', 'Score', 'Actions'];
  const tableData = documents.map((document) => {
    const { fName, lName, classID, className, grade, score } = document;
    return [fName, lName, classID, className, grade, score, 
      <View style={globalStyles.buttonContainer}>
      <TouchableOpacity onPress={() => handleEditScore(document)}>
        <Text style={globalStyles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
    ];
  });

  const handleEditScore = (document: Student) => {
    // You can open a modal or navigate to another screen here to edit the score
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
      <Text>
        The title and onPress handler are required. It is recommended to set
        accessibilityLabel to help make your app usable by everyone.
      </Text>
      <Button
        title="Press me"
        onPress={buttonPressed}
      />
       <ScrollView>
         <SADForm/>
        </ScrollView>
     
    </View>
    <View style={globalStyles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={tableHead} style={globalStyles.head} textStyle={{ fontWeight: 'bold', fontSize: 16 }} />
        <Rows data={tableData} textStyle={globalStyles.text} />
      </Table>
    </View>
    </SafeAreaView>
  );
}
export default App;