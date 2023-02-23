import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Dimensions , ScrollView } from 'react-native';
import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import Student from '../interfaces'
import { globalStyles } from '../styles/global';
import { db, auth } from "../firebaseConfig";
import { Picker } from '@react-native-picker/picker';
import {
  BarChart,
} from "react-native-chart-kit";




export default function barChart({ navigation }: { navigation: any }) {

  const pressHandler = () => {
    navigation.navigate('FormDatabase')
  }

  const [documents, setDocuments] = useState<Student[]>([]);
  const [classIDs, setClassIDs] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedClassGrades, setSelectedClassGrades] = useState<string[]>([]);

  const chartData = {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        data: [
          selectedClassGrades.filter((grade) => grade === 'A').length,
          selectedClassGrades.filter((grade) => grade === 'B').length,
          selectedClassGrades.filter((grade) => grade === 'C').length,
          selectedClassGrades.filter((grade) => grade === 'D').length,
          selectedClassGrades.filter((grade) => grade === 'E').length,
          selectedClassGrades.filter((grade) => grade === 'F').length,
        ],
      },
    ],
  };

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

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  };

  return (
    <View style={globalStyles.container}>
      <View>
        <Text>Select a class ID:</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            const grades = documents
              .filter((doc) => doc.classID === itemValue)
              .map((doc) => doc.grade);
            setSelectedClassGrades(grades);
          }}
        >
          {classIDs.map((id, index) => (
            <Picker.Item key={index} label={id} value={id} />
          ))}
        </Picker>
        <Text>Selected class ID: {selectedValue}</Text>
      </View>
      <View>
        {selectedValue ? (
          <BarChart
            data={chartData}
            width={Dimensions.get("window").width - 16}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
          />
        ) : (
          <Text>Select a class ID to view grades</Text>
        )}
      </View>

      <Button title='Go to Database Screen' onPress={pressHandler} />
    </View>
  )
}