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

import { db } from "./firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Row, Rows, Table } from 'react-native-table-component';
import { globalStyles } from './styles/global';
import SADForm from './screens/AddForm';

interface Student {
  fName: string;
  lName: string;
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

  return (
    <SafeAreaView>
      <ScrollView>
      <View>
      <SADForm/>
    </View>
    <View style={globalStyles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={tableHead} style={globalStyles.head} textStyle={{ fontWeight: 'bold', fontSize: 16 }} />
        <Rows data={tableData} textStyle={globalStyles.text} />
      </Table>
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