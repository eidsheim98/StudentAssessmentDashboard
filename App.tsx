/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import SADForm from './screens/ADDForm';
import { globalStyles } from 'C:/Users/Mhwan/CodeMaster/ikt205/StudentAssessmentDashboard/styles/global';

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
  TextInput
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

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

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
    </SafeAreaView>
  );
}



export default App;
