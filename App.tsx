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
  BarChart,
} from "react-native-chart-kit";

import { Picker } from '@react-native-picker/picker';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { auth, db } from "./firebaseConfig";
import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { Row, Rows, Table } from 'react-native-table-component';
import { globalStyles } from './styles/global';
import StudentForm from './screens/AddForm';
import { Dimensions } from 'react-native';

interface Student {
  fName: string;
  lName: string;
  DOB: string;
  classID: string;
  className: string;
  grade: string;
  score: string;
  timestamp: string;
}

const App = () => {
  const [documents, setDocuments] = useState<Student[]>([]);
  const [classIDs, setClassIDs] = useState<string[]>([]);

  useEffect(() => {
    const colRef = collection(db, "students");
    const q = query(colRef);

    onSnapshot(colRef, (docSnap) => {
      const newDocuments: Student[] = [];
      const newClassIDs: string[] = [];

      docSnap.forEach((doc) => {
        const data = doc.data() as Student;
        newDocuments.push(data);
        newClassIDs.push(data.classID);
      });

      setDocuments(newDocuments);
      setClassIDs(Array.from(new Set(newClassIDs)));
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

  const studentData = (setValues: any) => {
    return documents.map((document) => {
      const { fName, lName, DOB, classID, className, grade, score, timestamp } = document;
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
            "score": score,
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


  const [selectedValue, setSelectedValue] = useState('');

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  };

  const chartData = {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Select a class ID:</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            {classIDs.map((id, index) => (
              <Picker.Item key={index} label={id} value={id} />
            ))}
          </Picker>
          <Text>Selected class ID: {selectedValue}</Text>
        </View>
        <View>
          <BarChart
            data={chartData}
            width={Dimensions.get("window").width - 16}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="$"
            chartConfig={chartConfig}
            verticalLabelRotation={0}
          />
        </View>
        <View>
          <StudentForm tableData={studentData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;